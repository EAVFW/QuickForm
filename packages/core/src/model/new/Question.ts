import { InputType } from "./InputType";

export class Question {
    readonly logicalName?: string;
    inputType: InputType;
    text: string;
    placeholder: string;
    paragraph: string;
    answered: boolean = false;
    output: any;
}