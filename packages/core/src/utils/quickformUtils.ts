import { QuestionModel } from "../model/QuestionModel";
import { SlideModel } from "../model";
import { QuickformState } from "../state/QuickformState";

export const findQuestionByLogicalName = (logicalName: string, questions: QuestionModel[]): QuestionModel | undefined => { return questions.find(q => q.logicalName === logicalName); };

export const findQuestionByKey = (questionKey: string, questions: QuestionModel[]): QuestionModel | undefined => { return questions.find(q => q.questionKey === questionKey); };

export const isSlideAnswered = (slide: SlideModel, acceptIntermediateAnswers = false): boolean =>
    (slide.questions.length > 0 && slide.questions.filter(q => !q.visible || q.visible?.isVisible).every(q => q.answered || (acceptIntermediateAnswers && q.output !== undefined && q.output !== '')));

export const isSlideVisited = (slide: SlideModel): boolean =>
    (slide.questions.length > 0 && slide.questions.filter(q => !q.visible || q.visible?.isVisible).every(q => q.visited));


export const getCurrentSlide = (state: QuickformState) => (state.slides[state.currIdx]);

export const getAllQuestions = (slides: SlideModel[]): QuestionModel[] => (slides.map(slide => slide.questions).flat());
export const updateAllQuestions = (slides: SlideModel[], update: (q: QuestionModel) => QuestionModel) => slides.forEach(slide => { slide.questions = slide.questions.map(update); });


type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

function hasVisibilityRule(question: QuestionModel): question is WithRequired<QuestionModel, 'visible'> {
    return question.visible && question.visible?.engine && question.visible?.rule;
}
export const getAllQuestionsWithVisibilityRule = (slides: SlideModel[]) => getAllQuestions(slides).filter(hasVisibilityRule);


export const allQuestionsMap = (slides: SlideModel[]): { [key: string]: QuestionModel } => slides
    .map(s => s.questions)
    .flat()
    .reduce((acc, question) => {
        acc[question.logicalName] = question;
        return acc;
    }, {} as { [key: string]: QuestionModel });