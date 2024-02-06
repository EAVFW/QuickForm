// "intro" | "submit" | "ending"| "text" ;
// | "phone" | "email" | "dropdown" | "cpr" | "bankaccount"
// |  "firstName" | "lastName" | "industry" | "role" | "goal" | "email";

import { QuestionModel } from "./QuestionModel";

export type InputTypes =
    "text" |
    "multilinetext" |
    "dropdown"
    // "radio" |
    // "slider" |
    // "select";
    ;

export type InputProps = {
    questionModel: QuestionModel;
    onOutputChange(output: string): void;
}

const Dropdown = "dropdown";
const Radio = "radio";
const Slider = "slider";

export interface InputTypeMap {
    [Dropdown]: DropDownProperties;
    [Radio]: RadioProperties;
    [Slider]: SliderProperties;
}

export type DropDownProperties = {
    maxItems?: number;
    minItems?: number;
    options?: {
        [key: string]: string;
    }
}

export type RadioProperties = {
    options: any;
}

export type SliderProperties = {
    min: number;
    max: number;
    step: number;
}