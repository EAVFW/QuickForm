import { InputPropertiesTypes, InputTypeMap } from "./InputType";

export type QuestionModel<TProps = InputPropertiesTypes> = {
    answered: boolean;
    dataType: "string" | "number" | "boolean";
    inputProperties?: TProps;
    inputType: keyof InputTypeMap | "text" | string;
    /**
     * The logical name is the name used in payloads and serialization
    */
    logicalName: string;
    output: any;
    paragraph: string;
    placeholder: string;
    /**
     * The question key is the key used in the json model, its the key that is used from layout to reference a given question. 
     */
    questionKey: string,
    text: string;
    visible?: {
        rule: any;
        engine: string;
        isVisible: boolean;
    }
}