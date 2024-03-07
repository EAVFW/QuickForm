import { InputPropertiesTypes, InputTypeMap } from "./InputType";

export type QuestionModel<TProps = InputPropertiesTypes> = {
    answered: boolean;
    dataType: "string" | "number" | "boolean";
    inputProperties?: TProps;

    /**
     * The inputType can be any of the known input types, 
     * a string for types unkonwn to quickform but registered as custom question components. 
     * 
     * TODO - decide what we call the components. "Input Components", "Question Components" ect. What is a good name for documentation.
     */
    inputType: keyof InputTypeMap | string;
    /**
     * The logical name is the name used in payloads and serialization
    */
    logicalName: string;
    output: any;

    /**
    * The paragraph text that is used to render addition context to the question text <see>text</see> 
    * This can be optional and not rended when undefined.
    */
    paragraph?: string;
   
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