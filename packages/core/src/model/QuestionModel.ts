import { InputPropertiesTypes, InputTypeMap } from "./InputType";

export type QuestionModel<TProps = InputPropertiesTypes> = {
    /**
     * The question key is the key used in the json model, its the key that is used from layout to reference a given question. 
     */
    questionKey: string,
    /**
     * The logical name is the name used in payloads and serialization
     */
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