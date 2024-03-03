import { QuestionModel } from "../model/QuestionModel";

export const findQuestionByLogicalName = (logicalName: string, questions: QuestionModel[]): QuestionModel | undefined => {
    return questions.find(q => q.logicalName === logicalName);
};