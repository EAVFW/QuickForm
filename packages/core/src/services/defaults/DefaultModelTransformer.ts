import { Column, LayoutDefinition, QuestionModel, QuestionRef, Row, SlideElements, SlideModel, SubmitModel } from "../../model";
import { QuickFormModel } from "../../model/QuickFormModel";
import { QuickFormQuestionsDefinition } from "../../model/json-definitions/QuickFormQuestionsDefinition";
import { QuickFormModelTransformer, registerQuickFormService, resolveQuickFormService } from "../QuickFormServices";
import { QuestionJsonModel } from "../../model/json-definitions/JsonDataModels";
import { QuickFormSubmitDefinition } from "../../model/json-definitions/QuickFormSubmitDefinition";


function isDefined(object?: object) {
    return object && typeof object !== "undefined"
}

function processRows(rowLayouts: SlideElements, slide: SlideModel, questions: QuickFormQuestionsDefinition, payload: any): Row[] {
    const logger = resolveQuickFormService("logger");

    logger.log("Processing rows {@rowLayouts}", rowLayouts);

    const rows: Row[] = [];
    Object.values(rowLayouts).forEach(rowLayout => {

        switch (rowLayout.type) {
            case "question":

                const question = questions[rowLayout.ref];
                if (!question)
                    return;

                rows.push(slide.addQuestion(rowLayout, question, payload));
                break;

            case undefined:
            case "row":

                logger.log("Processing row with columns {@rowLayouts}", rowLayout.columns);
                const columns: Column[] = [];
                Object.values(rowLayout.columns).forEach(columnLayout => {

                    logger.log("Processing column {@column}", columnLayout);

                    if (columnLayout.type === "question") {

                        const question = questions[columnLayout.ref];
                        if (!question) {
                            logger.log("Question missing for column ref {@question}", columnLayout.ref);
                            return;
                        }

                        columns.push(slide.addQuestion(columnLayout, question, payload));

                    } else {
                        const columnRows = columnLayout.rows ? processRows(columnLayout.rows, slide, questions, payload) : [];
                        const newColumn: Column = {
                            style: columnLayout.style,
                            type: "column",
                            rows: columnRows
                        };
                        columns.push(newColumn);
                    }
                });

                logger.log("Processed columns {@columns}", columns);
                rows.push({
                    style: rowLayout.style,
                    type: "row",
                    columns: columns,

                });

                break;

            default:
                throw new Error("Unsupported layout type");
        }
    });

    return rows;
}

function handleLayout(layout: LayoutDefinition, questions: QuickFormQuestionsDefinition, payload: any): SlideModel[] {

    const logger = resolveQuickFormService("logger");

    logger.log("Handling {@slides} for {@questions}", layout.slides, questions);

    const slides: SlideModel[] = [];

    if (layout.slides) {
        Object.values(layout.slides).forEach(slide => {
            const slideModel = new SlideModel();
            slideModel.displayName = slide.title;
            if (slide.rows) {
                slideModel.rows = processRows(slide.rows, slideModel, questions, payload);
            }
            slides.push(slideModel);
        });
    }

    logger.log("Generated {@slides} from layout", slides);

    return slides;
}

function defaultLayout(questions: QuickFormQuestionsDefinition, payload: any): SlideModel[] {

    const logger = resolveQuickFormService("logger");

    const slides: SlideModel[] = [];

    Object.keys(questions).map((key, index) => [key, index] as [string, number])
        .sort(([q1, i1], [q2, i2]) => (questions[q1].order ?? i1) - (questions[q2].order ?? i2))
        .map(([questionKey]) => {
        let slide: SlideModel = createSlide({ [questionKey]: questions[questionKey] }, payload);
        slides.push(slide);
    });

    logger.log("Generated {@slides} from layout", slides);

    return slides;
}

function createSlide(questions: QuickFormQuestionsDefinition, payload: any): SlideModel {
    const logger = resolveQuickFormService("logger");

    logger.log("Creating Slides for {@questions}", questions);
    const slide = new SlideModel();
    // Create rows from questions, assuming each question corresponds to a separate row
    const rows: Row[] = Object.entries(questions).map(([questionKey, question]) => {
        const questionRef = {
            ref: questionKey,
            type: "question"
        } as QuestionRef;
        return slide.addQuestion(questionRef, question, payload);

    });

    slide.rows = rows;
    return slide;
}

function handleSubmit(submit: QuickFormSubmitDefinition, payload: any): SubmitModel {

    const logger = resolveQuickFormService("logger");
    const { submitFields: { schema, uiSchema } = {} } = submit;
    logger.log("Transforming submitfields: {@schema} {@uiSchema}", schema, uiSchema);

    const submitFields = Object.fromEntries(
        Object.entries((schema?.properties ?? {}) as { [key: string]: any })
            .map(([k, v]) => [k, {
                inputType: v.type === "string" ? "text" : "dropdown",
                options: v.type === "string" ? undefined : { "Y": "Yes", "N": "No" },
                placeholder: uiSchema?.[k]?.["ui:placeholder"],
                text: (uiSchema?.[k]?.["ui:label"] ?? true) ? v.title : undefined,
                paragraph: v.description,
                dataType: v.type
            } as QuestionJsonModel])
    );

    const questionTransformer = resolveQuickFormService("questionTransformer");

    const submitFieldsArray: QuestionModel[] = Object.entries(submitFields).map(([key, question]) => {
        let value = payload?.[key];
        return questionTransformer(key, question, value);
    });

    return {
        text: schema?.title ?? submit?.text ?? "Submit QuickForm",
        paragraph: schema?.description,
        buttonText: submit?.buttonText ?? "Submit",
        submitFields: submitFieldsArray,
        submitUrl: submit.submitUrl,
        submitMethod: submit.submitMethod,
    };
}

/*
* This function is responsible for taking the JSON format of the input (TODO add link to JSON Schema), and transforming it into the "Form" model that QuickForm supports.
* This is mainly to simplify the data and allow for the "Layout" configuration object to handle styling and column/row assignment of questions.
* With the "Layout" config, it is possible to creates "Slides"(or Pages/Sections) with multiple inputs at a time.
*/
const transformJSONInput: QuickFormModelTransformer = (definition, payload): QuickFormModel => {
    let slides: SlideModel[];

    const logger = resolveQuickFormService("logger");
    logger.log("Transforming Quickform Def to Model with\n\nlayout:\n{@layout}\nquestions:\n{@questions}\nsubmit:\n{@submit}\npayload:\n{@payload}", definition.layout, definition.questions, definition.submit, payload);

    // Transform questions into slides with rows and columns
    if (isDefined(definition.questions)) {
        if (definition.layout && definition.layout.slides && Object.keys(definition.layout.slides).length>0) {
            // If layout is defined, assign slides as per layout
            slides = handleLayout(definition.layout!, definition.questions, payload);
        } else {
            // If layout is not defined, assign one question to each slide with only 1 column pr. slide
            slides = defaultLayout(definition.questions, payload);
        }
    }
    else {
        throw console.error("Unable to read props.questions @ModelTransformer.ts");
    }

    return {
        intro: definition.intro,
        ending: definition.ending,
        submit: handleSubmit(definition.submit, payload?.submitFields),
        slides: slides
    };
};

registerQuickFormService("modeltransformer", transformJSONInput);