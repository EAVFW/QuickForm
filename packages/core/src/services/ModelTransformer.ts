import { QuickFormModelTransformer, registerQuickFormService } from "./QuickFormServices";
import { Ending, Form, Intro, Question, Slide, Submit } from "../model";

/*
* This function is responsible for taking the JSON format of the input (TODO add link to JSON Schema), and transforming it into the "Form" model that QuickForm supports.
* This is mainly to simplify the data and allow for the "Layout" configuration object to handle styling and column/row assignment of questions.
* With the "Layout" config, it is possible to creates "Slides"(or Pages/Sections) with multiple inputs at a time.
*/
export const transformJSONInput: QuickFormModelTransformer = (props, payload): Form => {

    const form = new Form();

    // Step 1 - Handle Intro, Submit, Ending.
    form.intro = handleIntro();
    form.submit = handleSubmit();
    form.ending = handleEnding();

    // Step 1 - Transform styles from "Layout object" to styles that can be used in QuickForm.
    // Layout is nullable/optional, so QuickForm handles if no layout object is present.
    const layout = props.layout;
    if (isDefined(layout)) {
        handleLayout();
    }

    // Step 2 - Handle slides and assign questions to slides.
    if (isDefined(props.questions)) {
        if (isDefined(layout?.slides)) {
            form.slides = handleSlides(layout?.slides, props.questions);
        } else {
            // Handle the case where slides are not defined.
            // Create 1 slide for each question.
            // Assuming that each question should be its own slide
            form.slides = Object.keys(props.questions).map(logicalName => {
                return createSlide({ [logicalName]: props.questions[logicalName] });
            });
        }
    } else {
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

function handleLayout() {

}

function createSlide(questions: { [logicalName: string]: Question }): Slide {
    const newQuestions = Object.entries(questions).map(([logicalName, question]) => {
        return {
            ...question,
            logicalName: logicalName
        }
    });
    const slide = new Slide(newQuestions);
    return slide;
}

function handleSlides(slides: Slide[], questions: { [logicalName: string]: Question }): Slide[] {
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




function handleIntro(): Intro {
    return { text: "test" }
}
function handleSubmit(): Submit {
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

function handleEnding(): Ending {
    return {
        text: "Ending",
        paragraph: "Thanks for choosing QuickForm",
        placeholder: "Thank you!"
    }
}