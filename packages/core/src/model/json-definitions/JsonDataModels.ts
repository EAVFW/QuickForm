import { ButtonsProperties, EmailProperties, MultilineProperties, RadioProperties, SliderProperties, TextProperties } from "../InputType";

type QuickFormQuestionDefinition = {

    /** 
     * A logical name used when generating the payload.
     *  When not defined the key of the question bag is used as logicalname
     */
    logicalName?: string;

    /**
     * A schema name is a more readable name typical used to generate a logical name from, and typical the displayname (text) without whitespace and special chars
     */
    schemaName?: string;

    /**
     * The input type, when left out the implementation is deciding what to do. 
     * Default implementation will use Text Input Field rendering "text"
     */
    inputType?: string;

    /**
     * All questions should have text property - its the question asked.
     */
    text: string;

    /** All input components should support a placeholder value, 
     * if defined this is a help text to be rendered within the contorl to instruct the user what to do
     */
    placeholder?: string;

    /**
     * The paragraph text is a explanation of why this question is asked, 
     * and possible and deeper explanation of what the data is used for
     */
    paragraph?: string;

    /**
     * The payload datatype wanted in the submit endpoint. 
     * Allowing a text input control to be used for a number field in a database ect.
     * 
     * TODO : Where does it make sense to have that transform, is it the input controls reponsibility to transform the data?
     * I think it has to be, because a dropdown with datatype boolean, we as library cant know how to transform it.
     */
    dataType?: "string" | "number" | "boolean";

    /**
     * All questions support conditional rendering, allowing to specify a rule and a engine to execute it.
     * TODO: the rule should be of type any, because its the engine (type) that knows its data type.
     */
    visible?: {
        type: string;
        rule: string;
    }

    /**
     * The ordering of the question
     */
    order?: number
}

/**
 * All the supported input types of the core library. 
 * 
 * TODO - need to be able to extend this in a meaning full way.
 */
export type QuestionJsonModel =
    QuickFormQuestionDefinition |
    QuickFormQuestionDefinition & ButtonsProperties |
  //  QuickFormQuestionDefinition & DropDownProperties |
    QuickFormQuestionDefinition & EmailProperties |
    QuickFormQuestionDefinition & MultilineProperties |
    QuickFormQuestionDefinition & RadioProperties |
    QuickFormQuestionDefinition & SliderProperties |
    QuickFormQuestionDefinition & TextProperties;