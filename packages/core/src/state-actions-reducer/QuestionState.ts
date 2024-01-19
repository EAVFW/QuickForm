import { QuickFormProps } from "../QuickFormProps";
import { QuickFormModelTransformer, registerQuickFormService, resolveQuickFormService } from "../context/QuickFormServices";

import { QuestionModel } from "../model/QuestionModel";
import { QuestionsContainer } from "../model/QuestionsContainer";

export type QuestionState = {
    pdfpreviewurl?: string;
    currentQuestionIndex: number;
    currentQuestion: QuestionModel;
    currentStep: number;
    totalSteps: number;
    progress: number;
    progressText: string;
    questions: QuestionModel[];
    showOverview: boolean;
    id?: string;
    submitStatus: { isSubmitting: boolean, isSubmitError: boolean, isSubmitOK: boolean }
}

export const transformQuickFormPropsToQuestionModelArray: QuickFormModelTransformer = (props,payload) => {
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
            ... value,
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
        } as QuestionModel;
    });
};
registerQuickFormService("modeltransformer", transformQuickFormPropsToQuestionModelArray);
export const questionInitialState = (quickform: QuickFormProps, id?: string, initalPayload: any = {}): QuestionState => {
    const transform = resolveQuickFormService("modeltransformer");
    const questions = transform(quickform, initalPayload);

 //   const ind = questions.indexOf(questions.find(x => !x.answered) ?? questions[]);

    return {
        id,
        submitStatus : { isSubmitting: false, isSubmitError: false, isSubmitOK: false },
        currentQuestion: questions[0],
        currentQuestionIndex: 0,
        currentStep: 1,
        totalSteps: questions.filter(
            q =>
                q.logicalName !== 'submit' &&
                q.logicalName !== 'intro' &&
                q.logicalName !== 'ending'
        ).length,
        progress: 0,
        progressText: `${questions.filter(
            q =>
                q.answered &&
                q.logicalName !== 'submit' &&
                q.logicalName !== 'intro' &&
                q.logicalName !== 'ending'
        ).length}/${questions.filter(
            q =>
                q.logicalName !== 'submit' &&
                q.logicalName !== 'intro' &&
                q.logicalName !== 'ending'
        ).length}`,
        questions: questions,
        showOverview: false,
    }
};

export const formResponsPayload = (state: QuestionState): Record<string, any> => {
    console.log("FormResponse", [state]);
    const payload: Record<string, any> = {};
    state.questions.forEach(q => {
        if (q.logicalName !== 'submit' && q.logicalName !== 'intro' && q.logicalName !== 'ending') {
            payload[q.logicalName!] = q.output;
        }

        if (q.logicalName === "submit") {
            payload["submitFields"] = q.output;
        }
    });
    return payload;
}