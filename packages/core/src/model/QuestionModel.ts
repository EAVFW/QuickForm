import { type } from "os";
import { JSONSchema7 } from "json-schema";


export type BaseQuestionFields = {
    readonly logicalName?: string;
    readonly text: string,
    readonly paragraph?: string;
    readonly buttonText?: string
    readonly placeholder?: string;
    readonly lang?: string;
}

export type SubmitProps = {
    readonly inputType: "submit",

    // readonly submitFields?: SubmitFields
} & BaseQuestionFields

export type DropdownProps = {
    readonly inputType: "dropdown",
    readonly maxItems?: string;
    readonly minItems?: string;
    readonly options?: {
        [key: string]: string;
    }
} & BaseQuestionFields

type ModelTypeChecker<T extends QuestionModel<QuestionProps>> = (q: QuestionModel<QuestionProps>) => q is T;
type ModelTypeAsserter<T extends QuestionModel<QuestionProps>> = (q: QuestionModel<QuestionProps>) => T;


export function isSubmitModel(q: QuestionModel<QuestionProps>): q is QuestionModel<SubmitProps> {
    return q.inputType === "submit";
}
export function isDropDownModel(q: QuestionModel<QuestionProps>): q is QuestionModel<DropdownProps> {
    return q.inputType === "dropdown";
}



function assertModel<T extends QuestionModel<QuestionProps>>(q: QuestionModel<QuestionProps>, checker: ModelTypeChecker<T>) {
    if (checker(q))
        return q;
    throw new Error("Current Question Model is not submit type");

}
export const assertSubmitModel: ModelTypeAsserter<QuestionModel<SubmitProps>> = (q) => assertModel(q, isSubmitModel);
export const assertDropDownModel: ModelTypeAsserter<QuestionModel<DropdownProps>> = (q) => assertModel(q, isDropDownModel);


export const shouldValidateInputType = (inputType: InputType2) => !(inputType === "intro" || inputType === "ending");

export type QuestionPropsGeneric = {
    /* Represents what is expected from the JSON input to QuickForm */
    readonly inputType: "text" | "multilinetext" | "intro" | "ending";




    readonly buttonText?: string;
} & BaseQuestionFields

export type QuestionProps = QuestionPropsGeneric | SubmitProps | DropdownProps;
export type InputType2 = QuestionProps["inputType"]

//export type QuestionModel = QuestionProps & {

//    /* Represents the variables that we use internally to represent state in the application. */
//    output: any;
//    questionNumber: number;// = 0;
//    answered?: boolean;
//}

export type QuestionModel<T extends QuestionProps = QuestionProps> = {
    /* Represents the variables that we use internally to represent state in the application. */
    output: any;
    questionNumber: number;// = 0;
    answered?: boolean;
} & T


