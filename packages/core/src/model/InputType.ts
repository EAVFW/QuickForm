import { CSSProperties } from "react";
import { QuestionModel } from "./QuestionModel";

export type InputProps<TProps = InputPropertiesTypes> = {
    className?: string;
    style?: CSSProperties,
    questionModel: QuestionModel<TProps>;
}

const Email = "email";
const Multilinetext = "multilinetext";
const Text = "text";
const Phone = "phone";

export interface InputTypeMap {
    [Phone]: PhoneProperties;
    [Email]: EmailProperties;
    [Multilinetext]: MultilineProperties;
    [Text]: TextProperties;
}

export type InputPropertiesTypes =
    EmailProperties |
    MultilineProperties |
    TextProperties |
    PhoneProperties |
    {};

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

export type TextProperties = {
    inputType: typeof Text;
    defaultValue?: string;
}