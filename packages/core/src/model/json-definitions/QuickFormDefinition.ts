import { EndingModel } from "../EndingModel";
import { IntroModel } from "../IntroModel";
import { QuickFormQuestionsDefinition } from "./QuickFormQuestionsDefinition";
import { QuickFormSubmitDefinition } from "./QuickFormSubmitDefinition";
import { LayoutDefinition } from "./Layout";

export interface QuickFormDefinition {
    validation?: {
        messages?: {
            "NOT_ALL_QUESTIONS_ANSWERED"?: string,
            "SOME_QUESTIONS_HAS_EMPTY_ANSWER"?: string,
            "SOME_QUESTIONS_HAVE_FAILED_VALIDATION"?: string;
            "TEXT_MUST_BE_AT_LEAST_CHARACTERS_LONG"?: string; // `Text must be at least ${minLength} characters long.`
            "TEXT_MUST_BE_BETWEEN_AND_CHARACTERS_LONG"?: string;
            "INVALID_EMAIL_FORMAT"?: string;
            "INVALID_PHONE_FORMAT"?: string;
        }
    },
    intro?: IntroModel;
    questions: QuickFormQuestionsDefinition,
    submit: QuickFormSubmitDefinition;
    ending: EndingModel;
    layout?: LayoutDefinition;
}