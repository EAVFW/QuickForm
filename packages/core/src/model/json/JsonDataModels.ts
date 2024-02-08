import { EndingModel } from "../EndingModel";
import { IntroModel } from "../IntroModel";
import { QuestionModel } from "../QuestionModel";
import { DropDownProperties, EmailProperties, MultilineProperties, RadioProperties, SliderProperties, TextProperties } from "../InputType";
import { Layout } from "./Layout";



type QuickFormQuestionDefinition = {
    logicalName?: string;
    inputType: string;
    text: string;
    placeholder?: string;
    paragraph: string;
    dataType?:"string"|"number"|"boolean"
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