import { QuickFormModelTransformer, registerQuickFormService } from "./QuickFormServices";
import { Column, FormData, Layout, QuestionModel, Row, SlideModel, SubmitModel } from "../model";

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
    if (object && typeof object !== "undefined") {
        return true;
    }
    return false;
}
function handleLayout(layout: Layout, questions: { [logicalName: string]: QuestionModel }): SlideModel[] {
    const slides: SlideModel[] = [];

    // Recursive function to process columns and their nested structures
    function processColumns(columns: Column[], slide: SlideModel) {
        columns.forEach(column => {
            // Process each row in the column
            column.rows.forEach(row => {
                // Add question to slide if exists
                if (row.questionRefLogicalName) {
                    const question = questions[row.questionRefLogicalName];
                    if (question) {
                        slide.addQuestion(question);
                    }
                }
                // Process nested columns if they exist
                if (row.columns) {
                    processColumns(row.columns, slide);
                }
            });
        });
    }

    // Process each slide in the layout
    if (layout.slides) {
        Object.values(layout.slides).forEach(slideLayout => {
            // Convert slide columns to array to process them
            const columns = Object.values(slideLayout.columns);
            const slide = new SlideModel(columns); // Assuming Slide constructor can accept multiple columns
            processColumns(columns, slide);
            slides.push(slide);
        });
    }

    return slides;
}

// function handleLayout(layout: Layout, questions: { [logicalName: string]: Question }): Slide[] {
//     const slides: Slide[] = [];

//     // Recursive function to process columns and their nested structures
//     function processColumns(columns: Column[], slide: Slide) {
//         columns.forEach(column => {
//             // Process each row in the column
//             column.rows.forEach(row => {
//                 // Add question to slide if exists
//                 if (row.questionRefLogicalName) {
//                     const question = questions[row.questionRefLogicalName];
//                     if (question) {
//                         slide.addQuestion(question);
//                     }
//                 }
//                 // Process nested columns if they exist
//                 if (row.columns) {
//                     processColumns(row.columns, slide);
//                 }
//             });
//         });
//     }

//     if (layout.columns) {
//         // Convert layout columns to array to process them
//         const initialColumns = Object.values(layout.columns);
//         // Each top-level column represents a new slide
//         initialColumns.forEach(column => {
//             const slide = new Slide([column]);
//             processColumns([column], slide);
//             slides.push(slide);
//         });
//     }

//     return slides;
// }

function defaultLayout(questions: { [logicalName: string]: QuestionModel }): SlideModel[] {
    const slides: SlideModel[] = [];
    Object.keys(questions).map(logicalName => {
        slides.push(createSlide({ [logicalName]: questions[logicalName] }));
    });
    return slides;
}

function createSlide(questions: { [logicalName: string]: QuestionModel }): SlideModel {
    // Initialize an empty array for the rows
    const rows: Row[] = Object.entries(questions).map(([logicalName, question]) => {
        // For each question, create a Row with the question's logicalName
        return {
            style: {}, // Assuming some default or empty style
            columns: [], // This row does not contain nested columns
            questionRefLogicalName: logicalName // Set the logicalName as the questionRefLogicalName
        };
    });

    // Create a single Column that contains all these rows
    const column: Column = {
        style: {}, // Assuming some default or empty style
        rows: rows // Assign the rows to this column
    };

    // Create a Slide with this single column
    const slide = new SlideModel([column]); // The Slide constructor expects an array of Columns

    // Assuming the Slide class has been adjusted to include a constructor that accepts columns
    // If not, you might need to add columns to the slide manually or adjust the Slide class accordingly

    return slide;
}
// function createSlide(questions: { [logicalName: string]: Question }): Slide {
//     const columns:Column[] = [
//         {
//             rows:[]
//         }
//     ];
//     const newQuestions = Object.entries(questions).map(([logicalName, question]) => {
//         columns[0].rows.push()
//         return {
//             ...question,
//             logicalName: logicalName
//         }
//     });
//     const columns:Column[] = [
//         {
//             rows:[{
//                 questionRefLogicalName:lo
//             }]
//         }
//     ]

//     }
//     const slide = new Slide(newQuestions, columns);
//     return slide;
// }

function handleSlides(slides: SlideModel[], questions: { [logicalName: string]: QuestionModel }): SlideModel[] {
    // Object.keys(questions).forEach(questionKey => {
    //     const question = questions[questionKey];
    //     assignQuestionToSlide(slides, question, questionKey);
    // });

    // return Object.entries(combinedQuestions).map(([key, value], index) => {
    //     const inputType = value.inputType ?? 'none'; // Default to none if type isn't provided
    //     return {
    //         ...value,
    //         inputType: inputType,
    //         logicalName: key,
    //         // placeholder: value.placeholder,
    //         //text: value.text,
    //         //paragraph: value.paragraph,
    //         // lang: value.lang,
    //         questionNumber: index,
    //         answered: value.inputType === "intro" || key in payload && typeof payload[key] !== "undefined" && payload[key] !== "",
    //         // maxItems: value.maxItems,
    //         //  minItems: value.minItems,
    //         //  options: value.options,
    //         //  buttonText: value.buttonText,
    //         output: key in payload ? payload[key] : ""
    //     } as Slide;
    // });
    return [];
}




function handleSubmit(submit: SubmitModel): SubmitModel {

    // Create payload handling, return endpoint and so on
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