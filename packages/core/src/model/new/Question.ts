import { InputType } from "./InputType";

export type Question = {
    inputType: InputType;
    text: string;
    placeholder: string;
    paragraph: string;
}