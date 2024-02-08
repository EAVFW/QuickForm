// "intro" | "submit" | "ending"| "text" ;
// | "phone" | "email" | "dropdown" | "cpr" | "bankaccount"
// |  "firstName" | "lastName" | "industry" | "role" | "goal" | "email";

import { QuestionModel } from "./QuestionModel";

//export type InputTypes =
//    "text" |
//    "multilinetext" |
//    "dropdown"
//    // "radio" |
//    // "slider" |
//    // "select";
//    ;

export type InputProps = {
    questionModel: QuestionModel;
    onOutputChange(output: string): void;
}

const Dropdown = "dropdown";
const Radio = "radio";
const Slider = "slider";
const Multilinetext = "multilinetext"
const Text = "text"

export interface InputTypeMap {
    [Dropdown]: DropDownProperties;
    [Radio]: RadioProperties;
    [Slider]: SliderProperties;
}

export type DropDownProperties = {
    inputType: typeof Dropdown;
    maxItems?: number;
    minItems?: number;
    options?: {
        [key: string]: string;
    }
}

export type RadioProperties = {
    inputType: typeof Radio;
    options: any;
}

export type SliderProperties = {
    inputType: typeof Slider;
    min: number;
    max: number;
    step: number;
}

export type MultilineProperties = {
    inputType: typeof Multilinetext;
    rows?: any;
}

export type TextProperties = {
    inputType: typeof Text;
    rows?: any;
}