import { EndingModel } from "../EndingModel";
import { IntroModel } from "../IntroModel";
import { QuickFormQuestionsDefinition } from "./QuickFormQuestionsDefinition";
import { QuickFormSubmitDefinition } from "./QuickFormSubmitDefinition";
import { LayoutDefinition } from "./Layout";

export type QuickFormDefinition = {
    intro?: IntroModel;
    questions: QuickFormQuestionsDefinition,
    submit: QuickFormSubmitDefinition;
    ending: EndingModel;
    layout?: LayoutDefinition;
}