import { InputPropertiesTypes, InputTypeMap } from "./InputType";

export type QuestionModel = {
    logicalName: string;
    inputType: keyof InputTypeMap | "text";
    text: string;
    placeholder: string;
    paragraph: string;
    dataType: "string" | "number" | "boolean";
    answered: boolean;
    output: any;
    inputProperties?: InputPropertiesTypes;
    visible?: {
        type: string;
        rule: string;
    }
}