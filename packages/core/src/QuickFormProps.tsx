import { QuestionProps, SubmitProps } from "./model/QuestionModel";
import { QuestionsContainer } from "./model/QuestionsContainer";

export type QuickFormProps = {
    intro: QuestionProps,
    submit: SubmitProps,
    ending: QuestionProps,
    questions: QuestionsContainer
}