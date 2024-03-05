import { InputPropertiesTypes, InputTypeMap } from "./InputType";

export type QuestionModel<TProps = InputPropertiesTypes> = {
    logicalName: string;
    inputType: keyof InputTypeMap | "text" | string;
    text: string;
    placeholder: string;
    paragraph: string;
    dataType: "string" | "number" | "boolean";
    answered: boolean;
    output: any;
    inputProperties?: TProps;
    visible?: {
        type: string;
        rule: string;
    }
}