import { EndingModel } from "../EndingModel";
import { IntroModel } from "../IntroModel";
import { QuestionModel } from "../QuestionModel";
import { DropDownProperties, RadioProperties, SliderProperties } from "../InputType";
import { Layout } from "./Layout";

export type JsonDataModel = {
    intro?: IntroModel;
    questions: { [logicalName: string]: QuestionJsonModel }
    submit: SubmitJsonModel;
    ending: EndingModel;
    layout?: Layout;
}

export type SubmitJsonModel = {
    text: string;
    paragraphs: string[];
    buttonText: string;
    submitFields: { [key: string]: QuestionJsonModel };
    submitUrl: string;
    submitMethod: string;
    // payload?: any;
    // id?: string;
}

type QuestionBaseModel = {
    readonly logicalName?: string;
    inputType: string;
    text: string;
    placeholder: string;
    paragraph: string;
    answered?: boolean;
    output?: any;
}

export type QuestionJsonModel =
    QuestionBaseModel & DropDownProperties |
    QuestionBaseModel & RadioProperties |
    QuestionBaseModel & SliderProperties
    ;