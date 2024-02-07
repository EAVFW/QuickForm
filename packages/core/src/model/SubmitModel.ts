import { QuestionModel } from "./QuestionModel";

export type SubmitModel = {
    text: string;
    paragraphs: string[];
    buttonText: string;
    submitFields: QuestionModel[];
    submitUrl: string;
    submitMethod: string;
};