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

//export type PhoneProperties = {
//    inputType: typeof Phone;
//    defaultValue?: number;
//}

//export type EmailProperties = {
//    inputType: typeof Email;
//    defaultValue?: string;
//}

//export type MultilineProperties = {
//    inputType: typeof Multilinetext;
//    defaultValue?: string;
//}

//export type TextProperties = {
//    inputType: typeof Text;
//    defaultValue?: string;
//}

export type EmailProperties = {
    inputType: "email";
    defaultValue?: string;
    beforeIcon?: IconType;
    afterIcon?: IconType
}

export type PhoneProperties = {
    inputType: "phone";
    defaultValue?: string;
    beforeIcon?: IconType;
    afterIcon?: IconType
}

export type MultilineProperties = {
    inputType: "multiline";
    defaultValue?: string;
}

export type TextProperties = {
    inputType: "text";
    defaultValue?: string;
    beforeIcon?: IconType;
    afterIcon?: IconType
}

export enum IconEnum {
    None = "None",
    Email = "Email",
    Phone = "Phone",
    User = "User",
    Checkmark = "Checkmark",
    ChevronRight = "ChevronRight"
}

export type IconType = keyof typeof IconEnum;