import { EndingModel, IntroModel, SlideModel, SubmitModel } from "./index";

export type QuickFormModel = {
    validation?: {
        messages?: {
            "NOT_ALL_QUESTIONS_ANSWERED"?: string,
            "SOME_QUESTIONS_HAS_EMPTY_ANSWER"?: string,
            "SOME_QUESTIONS_HAVE_FAILED_VALIDATION"?: string;
        }
    },
    intro?: IntroModel;
    slides: SlideModel[];
    submit: SubmitModel;
    ending: EndingModel;
}