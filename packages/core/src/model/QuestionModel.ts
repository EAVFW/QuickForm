import { InputPropertiesTypes, InputTypeMap } from "./InputType";

export type QuestionModel<TProps = InputPropertiesTypes> = {
    /**
     * The question key is the key used in the json model, its the key that is used from layout to reference a given question. 
     */
    answered: boolean;
    dataType: "string" | "number" | "boolean";
    inputProperties?: TProps;
    inputType: keyof InputTypeMap | "text" | string;
    isActive: boolean; // Indicates if the question should be rendered and considered in calculations
    /**
     * The logical name is the name used in payloads and serialization
     */
    logicalName: string;
    output: any;
    paragraph: string;
    placeholder: string;
    questionKey: string,
    text: string;
    visible?: {
        rule: string;
        type: string;
    }
}
