import { QuestionModel } from "./QuestionModel";

export type InputProps<TProps = InputPropertiesTypes> = {
    questionModel: QuestionModel<TProps>;
}

//const Dropdown = "dropdown";
const Email = "email";
const Multilinetext = "multilinetext";
const Radio = "radio";
const Slider = "slider";
const Text = "text";
const Buttons = "buttons";

export interface InputTypeMap {
    [Buttons]: ButtonsProperties;
    
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
    {};

export type ButtonsProperties = {
    inputType: typeof Buttons;
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
