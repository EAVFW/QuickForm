import { QuestionModel } from "../model/QuestionModel";
import { SlideModel } from "../model";
import { QuickformState } from "../state/QuickformState";

export const findQuestionByLogicalName = (logicalName: string, questions: QuestionModel[]): QuestionModel | undefined => { return questions.find(q => q.logicalName === logicalName); };

export const findQuestionByKey = (questionKey: string, questions: QuestionModel[]): QuestionModel | undefined => { return questions.find(q => q.questionKey === questionKey); };

export const isSlideAnswered = (slide: SlideModel, acceptIntermediateAnswers = false): boolean => {
    return slide.questions.length > 0 && slide.questions.filter(q => !q.visible || q.visible?.isVisible).every(q => q.answered || (acceptIntermediateAnswers && q.output !== undefined && q.output !== '' && q.validationResult?.isValid))
};

export const isSlideVisited = (slide: SlideModel): boolean => (slide.questions.length > 0 && slide.questions.filter(q => !q.visible || q.visible?.isVisible).every(q => q.visited));

export const getCurrentSlide = (state: QuickformState) => (state.slides[state.currIdx]);

export const getAllQuestions = (state: QuickformState): QuestionModel[] => (state.slides.map(slide => slide.questions).flat().concat(state.data.submit.submitFields));

export const updateAllQuestions = (slides: SlideModel[], update: (q: QuestionModel) => QuestionModel) => slides.forEach(slide => { slide.questions = slide.questions.map(update); });

export const getAllIntermediateQuestions = (state: QuickformState): QuestionModel[] => getAllQuestions(state).filter(q => q.intermediate);

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

function hasVisibilityRule(question: QuestionModel): question is WithRequired<QuestionModel, 'visible'> {
    return question.visible && question.visible?.engine && question.visible?.rule;
}

export const getAllQuestionsWithVisibilityRule = (state: QuickformState) => getAllQuestions(state).filter(hasVisibilityRule);

export const allQuestionsMap = (slides: SlideModel[]): { [key: string]: QuestionModel } => slides
    .map(s => s.questions)
    .flat()
    .reduce((acc, question) => {
        acc[question.questionKey] = question;
        return acc;
    }, {} as { [key: string]: QuestionModel });

export const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
};

/**
 * Converts camelCase object keys to kebab-case.
 */
export function camelToKebabCase<T extends {}>(obj: T) {
    return Object.fromEntries(Object.entries(obj).map(([k, value]) =>
        [k, `var(--${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())})`])) as { [P in keyof T]: string }
};

export function defineVariables<T extends {}>(obj: T) {
    return Object.fromEntries(Object.entries(obj)
        .map(([k, value]) =>
            [`--${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}`, value]).filter(([k, v]) => v !== `var(${k})`)) as { [key: string]: string }
};