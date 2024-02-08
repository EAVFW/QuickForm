import { EndingModel, IntroModel, QuestionModel, SlideModel, SubmitModel } from "./index";

export type QuickFormModel = {
    intro?: IntroModel;
    slides: SlideModel[];
    submit: SubmitModel;
    ending: EndingModel;
}