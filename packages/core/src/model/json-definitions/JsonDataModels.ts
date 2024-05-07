import { EmailProperties, MultilineProperties, TextProperties } from "../InputType";

type QuickFormQuestionDefinition = {

    /** 
     * A logical name used when generating the payload.
     *  When not defined the key of the question bag is used as logicalname.
     */
    logicalName?: string;

    /**
     * A schema name is a more readable name typically used to generate a logical name from, and typically the displayname (text) without whitespace and special chars.
     */
    schemaName?: string;

    /**
     * The input type, when left out the implementation is deciding what to do. 
     * Default implementation will use Text Input Field rendering "text".
     */
    inputType?: string;

    /**
     * All questions should have text property - its the question asked.
     */
    text: string;

    /** All input components should support a placeholder value. 
     * If defined this is a help text to be rendered within the control to instruct the user what to do.
     */
    placeholder?: string;

    /**
     * The paragraph text is an explanation of why this question is asked, 
     * and possibly a deeper explanation of what the data is used for.
     */
    paragraph?: string;

    /**
     * The payload datatype wanted in the submit endpoint. 
     * Allowing a text input control to be used for a number field in a database ect.
     * 
     * TODO : Where does it make sense to have that transform, is it the input controls reponsibility to transform the data?
     * I think it has to be, because a dropdown with datatype boolean, we as library cant know how to transform it.
     * 
     * KBA - Agreed, and as we do allow devs to implement their own inputcontrols, 
     * we can never fully handle this if we dont assign the responsibility to the input control.
     */
    dataType?: "string" | "number" | "boolean";

    /**
     * Provides the option to set a default value for the inputcontrol question.
     * Be aware that providing a defaultValue automatically sets the question.answered and question.visited to true
     * Also provides a validationResult object with isValid property set to true.
     */
    defaultValue?: any;

    /**
     * All questions support conditional rendering, allowing one to specify a rule and a engine to execute it.
     * The rule is of type any, because its the engine (type) that knows its data type.
     */
    visible?: {
        engine: string;
        rule: any;
        isVisible?: boolean;
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
export type QuestionJsonModel = QuickFormQuestionDefinition
    | QuickFormQuestionDefinition & EmailProperties
    | QuickFormQuestionDefinition & MultilineProperties
    | QuickFormQuestionDefinition & TextProperties;