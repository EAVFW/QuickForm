import { CSSProperties } from "react";
import { QuestionModel } from "./QuestionModel";

export type InputProps<TProps = InputPropertiesTypes> = {
    className?: string;
    style?: CSSProperties,
    questionModel: QuestionModel<TProps>;
}

const Email = "email";
const Multilinetext = "multilinetext";
const Radio = "radio";
const Slider = "slider";
const Text = "text";
const Buttons = "buttons";
const Phone = "phone";

export interface InputTypeMap {
    [Buttons]: ButtonsProperties;
    [Phone]: PhoneProperties;
    [Email]: EmailProperties;
    [Multilinetext]: MultilineProperties;
    [Radio]: RadioProperties;
    [Slider]: SliderProperties;
    [Text]: TextProperties;
}

export type InputPropertiesTypes =
    ButtonsProperties |
    EmailProperties |
    MultilineProperties |
    RadioProperties |
    SliderProperties |
    TextProperties |
    PhoneProperties |
    {};

export type ButtonsProperties = {
    inputType: typeof Buttons;
    options: {
        key: string | undefined;
        label: string;
    }
    defaultValue?: string;
}


export type PhoneProperties = {
    inputType: typeof Phone;
    defaultValue?: number;
}

export type EmailProperties = {
    inputType: typeof Email;
    defaultValue?: string;
}

export type MultilineProperties = {
    inputType: typeof Multilinetext;
    defaultValue?: string;
}

export type RadioProperties = {
    inputType: typeof Radio;
    options: {
        [key: string]: string;
    }
    defaultValue?: boolean;
    direction?: "horizontal" | "vertical";
}

export type SliderProperties = {
    inputType: typeof Slider;
    min: number;
    max: number;
    step: number;
    defaultValue?: number;
}

export type TextProperties = {
    inputType: typeof Text;
    defaultValue?: string;
}