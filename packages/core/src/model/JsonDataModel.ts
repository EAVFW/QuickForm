import { EndingModel } from "./EndingModel";
import { IntroModel } from "./IntroModel";
import { Layout } from "./Layout";
import { QuestionModel } from "./QuestionModel";
import { SubmitModel } from "./SubmitModel";

export type JsonDataModel = {
    intro: IntroModel;
    questions: { [logicalName: string]: QuestionModel }
    submit: SubmitModel;
    ending: EndingModel;
    layout?: Layout;
}