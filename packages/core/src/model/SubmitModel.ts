import { QuestionModel } from "./QuestionModel";

export type SubmitModel = {
    text: string;
    paragraph: string;
    buttonText: string;
    submitFields: QuestionModel[];
    submitUrl: string;
    submitMethod: string;
};