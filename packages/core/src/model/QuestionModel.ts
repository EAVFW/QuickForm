import { InputPropertiesTypes, InputTypeMap } from "./InputType";
import { ValidationResult } from "./ValidationResult";

export type QuestionModel<TProps = InputPropertiesTypes> = {
    /**
     * Indicates whether the question has been answered with a valid response. 
     * This flag becomes true only when the input satisfies all validation criteria.
     */
    answered: boolean;

    /**
     * Defines the type of data expected for the question's answer, such as 'string', 'number', or 'boolean'.
     */
    dataType: "string" | "number" | "boolean";

    /**
     * Optional properties related to the input, defined by the generic type TProps.
     */
    inputProperties?: TProps;

    /**
     * Specifies the input field's type. Can be a predefined type in InputTypeMap or a string for custom types not known to QuickForm but registered as custom question components.
     * TODO: Finalize naming for documentation purposes. Options include "Input Components", "Question Components", etc.
     */
    inputType: keyof InputTypeMap | string;

    /**
     * True when an input value is present but hasn't passed validation checks. 
     * Useful for real-time feedback mechanisms, like keystroke detection in text fields or multi-select inputs, where completion isn't clearly defined. 
     * Marks answers as intermediate until they are validated or until input for a subsequent question is initiated.
     */
    intermediate: boolean;

    /**
     * A unique identifier used in payloads and serialization to reference the question. Essential for data processing and analytics.
     */
    logicalName: string;

    /**
     * The current value of the question's response. Can hold any type of data based on the question's requirements.
     */
    output: any;

    /**
     * Supplementary text providing additional context to the main question. Optional and may be omitted if undefined.
     */
    paragraph?: string;

    /**
     * A brief hint that describes the expected value of the input field. It is displayed in the input field before the user enters a value.
     */
    placeholder: string;

    /**
     * Identifies the question within the JSON model and is used as a reference in the layout configuration. It is essential for dynamically rendering questions based on the model.
     */
    questionKey: string;

    /**
     * The primary text of the question, presented to the user.
     */
    text: string;

    /**
     * Denotes if the question's input field has been interacted with (focused). 
     * This state is activated even if the input is left empty, highlighting that the user has visited but not necessarily answered the question.
     */
    visited: boolean;

    /**
     * Optional visibility controls for the question, governed by a set of rules and an evaluation engine. Determines whether the question should be displayed.
     */
    visible?: {
        rule: any;
        engine: string;
        isVisible: boolean,
    };

    /**
     * The result of validating the question's output. It keeps track of whether the current output is valid, 
     * the validation message, and the validated output if applicable. This property is crucial for maintaining 
     * the state of validation and providing feedback to the user.
     */
    validationResult?: ValidationResult;

    /**
     * https://json-schema.org/draft/2019-09/json-schema-validation
     */
    validation?: {
       
    }
    /**
     * is true if the question is required. Input controls should mark the question as required
     */
    isRequired?: boolean


    /** is true if the question is active. Input controls should set focus if set to active*/
    isActive?: boolean
}