import { QuestionModel } from "../../model/QuestionModel";
import { resolveQuickFormService } from "../../services/QuickFormServices";
import { QuickformState } from "../QuickformState";

export class QuestionActionHandler {
    static findSlideIdxAndQuestionIdx = (state: QuickformState, logicalName: string): { slideIndex: number; questionIndex: number } => {
        if (state.isSubmitSlide)
            return { slideIndex: -1, questionIndex: state.data.submit.submitFields.findIndex(x => x.logicalName === logicalName) };


        for (let slideIndex = 0; slideIndex < state.slides.length; slideIndex++) {
            const questionIndex: number = state.slides[slideIndex].questions.findIndex((q: QuestionModel) => q.logicalName === logicalName);
            if (questionIndex !== -1) {
                return { slideIndex, questionIndex };
            }
        }
        return { slideIndex: -1, questionIndex: -1 };
    };

    static updateQuestionProperty = (state: QuickformState, logicalName: string, propertyName: string, propertyValue: any): QuickformState => {
        const { slideIndex, questionIndex } = this.findSlideIdxAndQuestionIdx(state, logicalName);
        const logger = resolveQuickFormService("logger");

        logger.log("Updating Question Property:  {logicalName}, {propertyName}, {propertyValue}, {slideIndex}, {questionIndex}", logicalName, propertyName, propertyValue, slideIndex, questionIndex);

        if (state.isSubmitSlide) {
            const questions = state.data.submit.submitFields;

            const updatedQuestions = questions.map((question: QuestionModel, idx: number) =>
                idx === questionIndex ? { ...question, [propertyName]: propertyValue } : question
            );

            state.data.submit.submitFields = updatedQuestions;

            return { ...state };

        }

        if (slideIndex === -1 || questionIndex === -1) {
            return state;
        }

        const newState = { ...state, slides: [...state.slides] };
        const originalSlide = newState.slides[slideIndex];




        const updatedQuestions = originalSlide.questions.map((question: QuestionModel, idx: number) =>
            idx === questionIndex ? { ...question, [propertyName]: propertyValue } : question
        );

        const updatedSlide = {
            ...originalSlide,
            questions: updatedQuestions,
            isAnswered: updatedQuestions.length > 0 && updatedQuestions.every(q => q.answered),
            addQuestion: originalSlide.addQuestion,
        };

        newState.slides[slideIndex] = updatedSlide;

        return newState;
    };

    static answerQuestion = (state: QuickformState, logicalName: string, output: any) => {
        console.log(`answering question for ${logicalName} with output ${output}`);
        const progressUpdated = this.computeProgress(this.updateQuestionProperty(this.updateQuestionProperty(state, logicalName, 'answered', true), logicalName, 'output', output));
        console.log("progressUpdated", progressUpdated);
        return progressUpdated;
    };

    static computeProgress = (state: QuickformState) => {
        const slidesAnsweredCount = state.slides.reduce((sum, slide) => sum + (slide.isAnswered ? 1 : 0), 0);
        const progress = (slidesAnsweredCount / state.totalSteps) * 100;
        return {
            ...state,
            progress,
            progressText: `${slidesAnsweredCount}/${state.totalSteps}`,
            isSubmitSlide: progress === 100,
        };
    }
}