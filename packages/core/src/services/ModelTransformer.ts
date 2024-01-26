import { QuestionsContainer } from "model/QuestionsContainer";
import { QuickFormModelTransformer, registerQuickFormService } from "./QuickFormServices";
import { QuestionModel } from "model/QuestionModel";
import { Slide } from "model/new";

// TODO - rewrite logic to support the new slides..
export const transformQuickFormPropsToQuestionModelArray: QuickFormModelTransformer = (props, payload): Slide[] => {
    // Combine all sections into one object
    const combinedQuestions: QuestionsContainer = {
        intro: props.intro,
        ...props.questions,
        submit: props.submit,
        ending: props.ending
    };

    return Object.entries(combinedQuestions).map(([key, value], index) => {
        const inputType = value.inputType ?? 'none'; // Default to none if type isn't provided
        return {
            ...value,
            inputType: inputType,
            logicalName: key,
            // placeholder: value.placeholder,
            //text: value.text,
            //paragraph: value.paragraph,
            // lang: value.lang,
            questionNumber: index,
            answered: value.inputType === "intro" || key in payload && typeof payload[key] !== "undefined" && payload[key] !== "",
            // maxItems: value.maxItems,
            //  minItems: value.minItems,
            //  options: value.options,
            //  buttonText: value.buttonText,
            output: key in payload ? payload[key] : ""
        } as Slide;
    });
};
registerQuickFormService("modeltransformer", transformQuickFormPropsToQuestionModelArray);