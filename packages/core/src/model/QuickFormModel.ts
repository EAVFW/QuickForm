import { EndingModel, IntroModel, QuickFormDefinition, SlideModel, SubmitModel } from "./index";

export type QuickFormModel = {
    validation?: {
        messages?: QuickFormDefinition["validation"]["messages"]
        //{
        //    "NOT_ALL_QUESTIONS_ANSWERED"?: string,
        //    "SOME_QUESTIONS_HAS_EMPTY_ANSWER"?: string,
        //    "SOME_QUESTIONS_HAVE_FAILED_VALIDATION"?: string;
        //    "TEXT_MUST_BE_AT_LEAST_CHARACTERS_LONG"?: string; // `Text must be at least ${minLength} characters long.`
        //}
    },
    intro?: IntroModel;
    slides: SlideModel[];
    submit: SubmitModel;
    ending: EndingModel;
}