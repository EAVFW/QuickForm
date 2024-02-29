import { ButtonsProperties, DropDownProperties, EmailProperties, MultilineProperties, RadioProperties, SliderProperties, TextProperties } from "../InputType";

type QuickFormQuestionDefinition = {
    logicalName?: string;
    inputType: string;
    text: string;
    placeholder?: string;
    paragraph: string;
    dataType?: "string" | "number" | "boolean";
}

export type QuestionJsonModel =
    QuickFormQuestionDefinition & ButtonsProperties |
    QuickFormQuestionDefinition & DropDownProperties |
    QuickFormQuestionDefinition & EmailProperties |
    QuickFormQuestionDefinition & MultilineProperties |
    QuickFormQuestionDefinition & RadioProperties |
    QuickFormQuestionDefinition & SliderProperties |
    QuickFormQuestionDefinition & TextProperties
    ;