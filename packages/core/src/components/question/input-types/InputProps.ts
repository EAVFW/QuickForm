import { InputType2 } from "../../../model/QuestionModel";

export type InputProps = {
    inputType: InputType2
    text: string,
    paragraph: string,
    placeholder?: string;
    lang: string;
    output: string;
    onOutputChange(output: string): void;
    onAnswered?: () => void;
}