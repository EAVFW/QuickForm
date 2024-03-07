import { QuestionModel } from "../model/QuestionModel";

export const findQuestionByLogicalName = (logicalName: string, questions: QuestionModel[]): QuestionModel | undefined => {
    return questions.find(q => q.logicalName === logicalName);
};


export const findQuestionByKey = (questionKey: string, questions: QuestionModel[]): QuestionModel | undefined => {
    return questions.find(q => q.questionKey === questionKey);
};