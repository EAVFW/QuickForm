import { EndingModel, IntroModel, QuestionModel, SlideModel, SubmitModel } from "./index";

/* This class holds all the models required for QuickForm to function */
export class FormData {
    intro: IntroModel = undefined;
    slides: SlideModel[];
    questions: QuestionModel[];
    submit: SubmitModel;
    ending: EndingModel;
}