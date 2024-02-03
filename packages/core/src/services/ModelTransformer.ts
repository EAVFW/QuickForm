import { QuickFormModelTransformer, registerQuickFormService } from "./QuickFormServices";
import { Column, FormData, Layout, QuestionModel, Row, RowLayout, SlideModel, SubmitModel } from "../model";

/*
* This function is responsible for taking the JSON format of the input (TODO add link to JSON Schema), and transforming it into the "Form" model that QuickForm supports.
* This is mainly to simplify the data and allow for the "Layout" configuration object to handle styling and column/row assignment of questions.
* With the "Layout" config, it is possible to creates "Slides"(or Pages/Sections) with multiple inputs at a time.
*/
export const transformJSONInput: QuickFormModelTransformer = (data): FormData => {

    const form = new FormData();

    // Step 1 - Handle Intro, Submit, Ending.
    form.intro = data.intro;
    form.ending = data.ending;
    form.submit = handleSubmit(data.submit);

    // Step 2 - Transform questions into slides with rows and columns
    if (isDefined(data.questions)) {
        const layout = data.layout;
        if (isDefined(layout)) {
            // If layout is defined, assign slides as per layout
            form.slides = handleLayout(layout, data.questions);
        } else {
            // If layout is not defined, assign one question to each slide with only 1 column pr. slide
            form.slides = defaultLayout(data.questions);
        }
    }
    else {
        throw console.error("Unable to read props.questions @ModelTransformer.ts");
    }

    return form;
};

registerQuickFormService("modeltransformer", transformJSONInput);

function isDefined(object: object) {
    return object && typeof object !== "undefined"
}

function handleLayout(layout: Layout, questions: { [logicalName: string]: QuestionModel }): SlideModel[] {
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

function processRows(rowLayouts: { [key: string]: RowLayout }, slide: SlideModel, questions: { [logicalName: string]: QuestionModel }): Row[] {
    const rows: Row[] = [];
    Object.values(rowLayouts).forEach(rowLayout => {
        let newRow: Row | null = null;

        // Add question if questionRefLogicalName is present and a corresponding question exists
        if (rowLayout.questionRefLogicalName && questions.hasOwnProperty(rowLayout.questionRefLogicalName)) {
            const question = questions[rowLayout.questionRefLogicalName];
            slide.addQuestion({
                logicalName: rowLayout.questionRefLogicalName, ...question
            });
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

    return rows; // Return the constructed rows for potential further nesting
}

// function processRows(rowLayouts: { [key: string]: RowLayout }, slide: SlideModel, questions: { [logicalName: string]: QuestionModel }) {
//     const rows: Row[] = [];
//     Object.values(rowLayouts).forEach(rowLayout => {
//         // Add question if questionRefLogicalName is present and a corresponding question exists
//         if (rowLayout.questionRefLogicalName && questions.hasOwnProperty(rowLayout.questionRefLogicalName)) {
//             const question = questions[rowLayout.questionRefLogicalName];
//             slide.addQuestion(question);
//             rows.push({
//                 style: rowLayout.style,
//                 questionRefLogicalName: rowLayout.questionRefLogicalName
//             })
//         }

//         // Process nested rows within columns if they exist
//         if (rowLayout.columns) {
//             Object.values(rowLayout.columns).forEach(column => {
//                 if (column.rows) {
//                     processRows(column.rows, slide, questions); // Recursive call for nested rows within columns
//                 }
//             });
//         }
//     });
// }



function defaultLayout(questions: { [logicalName: string]: QuestionModel }): SlideModel[] {
    const slides: SlideModel[] = [];
    Object.keys(questions).map(logicalName => {
        slides.push(createSlide({ [logicalName]: questions[logicalName] }));
    });
    return slides;
}

function createSlide(questions: { [logicalName: string]: QuestionModel }): SlideModel {
    const slide = new SlideModel();
    // Create rows from questions, assuming each question corresponds to a separate row
    const rows: Row[] = Object.entries(questions).map(([logicalName, question]) => {
        slide.addQuestion({
            ...question,
            logicalName: logicalName
        })

        return {
            style: {},
            questionRefLogicalName: logicalName
        };
    });

    slide.rows = rows;
    return slide;
}


function handleSubmit(submit: SubmitModel): SubmitModel {

    // TODO:  Create payload handling, return endpoint and so on
    return {
        text: "SubmitTest",
        paragraph: "SubmitParagraphTest",
        buttonText: "SubmitTest",
        submitFields: [
            {
                inputType: "text",
                paragraph: "Enter your full name. E.g.: Jens Jensen",
                placeholder: "full name",
                text: "Full Name",
                logicalName: "fullName"
            }
        ]
    }
}