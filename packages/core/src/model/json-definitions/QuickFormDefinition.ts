import { EndingModel } from "../EndingModel";
import { IntroModel } from "../IntroModel";
import { QuickFormQuestionsDefinition } from "./QuickFormQuestionsDefinition";
import { QuickFormSubmitDefinition } from "./QuickFormSubmitDefinition";
import { LayoutDefinition } from "./Layout";

export type QuickFormDefinition = {
    validation?: {
        messages?: {
            "NOT_ALL_QUESTIONS_ANSWERED"?: string,
            "SOME_QUESTIONS_HAS_EMPTY_ANSWER"?: string,
            "SOME_QUESTIONS_HAVE_FAILED_VALIDATION"?: string;
        }
    },
    intro?: IntroModel;
    questions: QuickFormQuestionsDefinition,
    submit: QuickFormSubmitDefinition;
    ending: EndingModel;
    layout?: LayoutDefinition;
}