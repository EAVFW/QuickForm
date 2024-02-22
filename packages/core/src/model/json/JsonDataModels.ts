import { DropDownProperties, EmailProperties, MultilineProperties, RadioProperties, SliderProperties, TextProperties } from "../InputType";

type QuickFormQuestionDefinition = {
    logicalName?: string;
    inputType: string;
    text: string;
    placeholder?: string;
    paragraph: string;
    dataType?: "string" | "number" | "boolean";
}

export type QuestionJsonModel =
    QuickFormQuestionDefinition & DropDownProperties |
    QuickFormQuestionDefinition & RadioProperties |
    QuickFormQuestionDefinition & SliderProperties |
    QuickFormQuestionDefinition & MultilineProperties |
    QuickFormQuestionDefinition & TextProperties |
    QuickFormQuestionDefinition & EmailProperties
    ;

export type InputTypes = QuestionJsonModel["inputType"]