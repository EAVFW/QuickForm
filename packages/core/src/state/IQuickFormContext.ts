import { QuestionState } from "./state-actions-reducer/QuestionState";
import { QuestionAction } from "./state-actions-reducer";
import { QuestionModel } from "model/QuestionModel";

export interface IQuickFormContext {
  questionState: QuestionState;
  // submitStatus: SubmitStatus;
  dispatch: React.Dispatch<QuestionAction>;
  goToQuestion: (q: QuestionModel) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  markQuestionAsAnswered: (index: number) => void;
  onQuestionBtnClicked: () => void;
  //  onSubmitBtnClicked: () => void;
  toggleOverview: () => void;
}