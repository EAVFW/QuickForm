import { QuestionModel } from "../model/QuestionModel";
import { SlideModel } from "../model";

export const findQuestionByLogicalName = (logicalName: string, questions: QuestionModel[]): QuestionModel | undefined => { return questions.find(q => q.logicalName === logicalName); };

export const findQuestionByKey = (questionKey: string, questions: QuestionModel[]): QuestionModel | undefined => { return questions.find(q => q.questionKey === questionKey); };

export const isSlideAnswered = (slide: SlideModel): boolean => (slide.questions.length > 0 && slide.questions.filter(q => !q.visible || q.visible?.isVisible).every(q => q.answered));

export const getAllQuestions = (slides: SlideModel[]): QuestionModel[][] => (slides.map(slide => slide.questions));

export const allQuestionsMap = (slides: SlideModel[]): { [key: string]: QuestionModel } => slides
    .map(s => s.questions)
    .flat()
    .reduce((acc, question) => {
        acc[question.logicalName] = question;
        return acc;
    }, {} as { [key: string]: QuestionModel });