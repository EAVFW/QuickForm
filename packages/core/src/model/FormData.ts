import { EndingModel, IntroModel, QuestionModel, SlideModel, SubmitModel } from "./index";

export type FormData = {
    intro?: IntroModel;
    slides: SlideModel[];
    submit: SubmitModel;
    ending: EndingModel;
}