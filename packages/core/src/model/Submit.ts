import { Question } from "./Question";

export type Submit = {
    text: string;
    paragraph: string;
    buttonText: string;
    submitFields: Question[];
};