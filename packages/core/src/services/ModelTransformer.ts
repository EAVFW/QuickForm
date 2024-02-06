import { QuickFormModelTransformer, registerQuickFormService } from "./QuickFormServices";
import { Column, DropDownProperties, FormData, Layout, QuestionModel, RadioProperties, Row, RowLayout, SlideModel, SliderProperties, SubmitModel } from "../model";
import { QuestionJsonModel, SubmitJsonModel } from "../model/json/JsonDataModels";

/*
* This function is responsible for taking the JSON format of the input (TODO add link to JSON Schema), and transforming it into the "Form" model that QuickForm supports.
* This is mainly to simplify the data and allow for the "Layout" configuration object to handle styling and column/row assignment of questions.
* With the "Layout" config, it is possible to creates "Slides"(or Pages/Sections) with multiple inputs at a time.
*/
export const transformJSONInput: QuickFormModelTransformer = (data): FormData => {
    let slides;

    // Transform questions into slides with rows and columns
    if (isDefined(data.questions)) {
        if (isDefined(data.layout)) {
            // If layout is defined, assign slides as per layout
            slides = handleLayout(data.layout!, data.questions);
        } else {
            // If layout is not defined, assign one question to each slide with only 1 column pr. slide
            slides = defaultLayout(data.questions);
        }
    }
    else {
        throw console.error("Unable to read props.questions @ModelTransformer.ts");
    }

    return {
        intro: data.intro,
        ending: data.ending,
        submit: handleSubmit(data.submit),
        slides: slides
    };
};

registerQuickFormService("modeltransformer", transformJSONInput);

function isDefined(object?: object) {
    return object && typeof object !== "undefined"
}

function handleLayout(layout: Layout, questions: { [logicalName: string]: QuestionJsonModel }): SlideModel[] {
    const slides: SlideModel[] = [];
    console.log("handleLayout");

    if (layout.slides) {
        Object.values(layout.slides).forEach(slide => {
            const slideModel = new SlideModel();
            slideModel.displayName = slide.displayName;
            if (slide.rows) {
                slideModel.rows = processRows(slide.rows, slideModel, questions);
            }
            slides.push(slideModel);
        });
    }

    return slides;
}

function processRows(rowLayouts: { [key: string]: RowLayout }, slide: SlideModel, questions: { [logicalName: string]: QuestionJsonModel }): Row[] {
    const rows: Row[] = [];
    Object.values(rowLayouts).forEach(rowLayout => {
        let newRow: Row | null = null;

        // Add question if questionRefLogicalName is present and a corresponding question exists
        if (rowLayout.questionRefLogicalName && questions.hasOwnProperty(rowLayout.questionRefLogicalName)) {
            const question = questions[rowLayout.questionRefLogicalName];
            slide.addQuestion(mapJsonQuestionToModelQuestion(rowLayout.questionRefLogicalName, question));
            newRow = {
                style: rowLayout.style,
                questionRefLogicalName: rowLayout.questionRefLogicalName,
                columns: []
            };
        }

        // Process nested rows within columns if they exist
        if (rowLayout.columns) {
            const columns: Column[] = [];
            Object.values(rowLayout.columns).forEach(columnLayout => {
                const columnRows = columnLayout.rows ? processRows(columnLayout.rows, slide, questions) : [];
                const newColumn: Column = {
                    style: columnLayout.style,
                    rows: columnRows
                };
                columns.push(newColumn);
            });

            // If newRow was not initialized because it doesn't directly contain a question,
            // initialize it here to encapsulate nested structure
            if (!newRow) {
                newRow = {
                    style: rowLayout.style,
                    columns: columns,
                    questionRefLogicalName: rowLayout.questionRefLogicalName // This might be undefined, which is fine
                };
            } else {
                // If newRow was already initialized, just add the columns to it
                newRow.columns = columns;
            }
        }

        // Only add the newRow to rows if it was initialized
        if (newRow) {
            rows.push(newRow);
        }
    });

    return rows;
}

function defaultLayout(questions: { [logicalName: string]: QuestionJsonModel }): SlideModel[] {
    const slides: SlideModel[] = [];
    Object.keys(questions).map(logicalName => {
        let slide: SlideModel = createSlide({ [logicalName]: questions[logicalName] });
        // if (slide.questions.length === 1) {
        //     slide.displayName = slide.questions[0].text
        // }
        slides.push(slide);
    });
    return slides;
}

function createSlide(questions: { [logicalName: string]: QuestionJsonModel }): SlideModel {
    const slide = new SlideModel();
    // Create rows from questions, assuming each question corresponds to a separate row
    const rows: Row[] = Object.entries(questions).map(([logicalName, question]) => {
        slide.addQuestion(mapJsonQuestionToModelQuestion(logicalName, question));

        return {
            style: {},
            questionRefLogicalName: logicalName
        };
    });

    slide.rows = rows;
    return slide;
}

function mapJsonQuestionToModelQuestion(key: string, value: QuestionJsonModel): QuestionModel {
    return {
        logicalName: key,
        inputType: value.inputType,
        text: value.text,
        placeholder: value.placeholder,
        paragraph: value.paragraph,
        answered: false,
        inputProperties: parseInputProperties(value),
        output: ""
    };
}

function parseInputProperties(questionJsonModel: QuestionJsonModel): DropDownProperties | RadioProperties | SliderProperties | undefined {
    let inputProperties: DropDownProperties | RadioProperties | SliderProperties | undefined;
    // switch (value.inputType) {
    //     case "dropdown":
    //         inputProperties = value as DropDownProperties;
    //         break;
    //     case "radio":
    //         inputProperties = value as RadioProperties;
    //         break;
    //     case "slider":
    //         inputProperties = value as SliderProperties;
    //         break;
    //     default:
    //         inputProperties = {};
    // }
    switch (questionJsonModel.inputType) {
        case "dropdown":
            inputProperties = {
                options: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).options,
                minItems: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).minItems,
                maxItems: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).maxItems,
            };
            console.log("dropdown", questionJsonModel)
            console.log("inputProperties", inputProperties)
            break;
        case "radio":
            inputProperties = {
                options: (questionJsonModel as (QuestionJsonModel & RadioProperties)).options,
            };
            break;
        case "slider":
            inputProperties = {
                min: (questionJsonModel as (QuestionJsonModel & SliderProperties)).min,
                max: (questionJsonModel as (QuestionJsonModel & SliderProperties)).max,
                step: (questionJsonModel as (QuestionJsonModel & SliderProperties)).step,
            };
            break;
        default:
            inputProperties = undefined;
    }

    return inputProperties
}

function handleSubmit(submit: SubmitJsonModel): SubmitModel {
    const submitFieldsArray: QuestionModel[] = Object.entries(submit.submitFields).map(([key, value]) => {
        return {
            logicalName: key,
            inputType: value.inputType,
            text: value.text,
            placeholder: value.placeholder,
            paragraph: value.paragraph,
            answered: value.answered,
            inputProperties: parseInputProperties(value),
            output: value.output ?? ""
        };
    });

    return {
        text: submit.text,
        paragraphs: submit.paragraphs,
        buttonText: submit.buttonText,
        submitFields: submitFieldsArray,
        submitUrl: submit.submitUrl,
        submitMethod: submit.submitMethod,
        // payload: submit.payload,
        // id: submit.id
    };
}