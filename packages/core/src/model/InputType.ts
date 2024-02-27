import { QuestionModel } from "./QuestionModel";

export type InputProps = {
    questionModel: QuestionModel;
    onOutputChange(output: string): void;
}

const Dropdown = "dropdown";
const Email = "email";
const Multilinetext = "multilinetext";
const Radio = "radio";
const Slider = "slider";
const Text = "text";

export interface InputTypeMap {
    [Dropdown]: DropDownProperties;
    [Email]: EmailProperties;
    [Multilinetext]: MultilineProperties;
    [Radio]: RadioProperties;
    [Slider]: SliderProperties;
    [Text]: TextProperties;
}

export type DropDownProperties = {
    inputType: typeof Dropdown;
    maxItems?: number;
    minItems?: number;
    options: {
        [key: string]: string;
    }
}

export type EmailProperties = {
    inputType: typeof Email;
}

export type MultilineProperties = {
    inputType: typeof Multilinetext;
}

export type RadioProperties = {
    inputType: typeof Radio;
    options: {
        [key: string]: string;
    }
    direction?: "horizontal" | "vertical";
}

export type SliderProperties = {
    inputType: typeof Slider;
    min: number;
    max: number;
    step: number;
}

export type TextProperties = {
    inputType: typeof Text;
}
