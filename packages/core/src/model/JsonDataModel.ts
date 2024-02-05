import { EndingModel } from "./EndingModel";
import { IntroModel } from "./IntroModel";
import { Layout } from "./Layout";
import { QuestionModel } from "./QuestionModel";

export type JsonDataModel = {
    intro?: IntroModel;
    questions: { [logicalName: string]: QuestionModel }
    submit: SubmitJsonModel;
    ending: EndingModel;
    layout?: Layout;
}

export type SubmitJsonModel = {
    text: string;
    paragraph: string;
    buttonText: string;
    submitFields: { [key: string]: QuestionModel };
    payload?: any;
    id?: string;
}