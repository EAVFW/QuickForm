import { getCurrentSlide, isSlideAnswered } from "../../utils/quickformUtils";
import { QuickformState } from "../../state/QuickformState";
import { resolveQuickFormService } from "../../services";
import { QuestionModel } from "../../model";

export class NavigationActionHandler {
    private static handleSlideChange = (state: QuickformState, direction: 'next' | 'prev') => {
        const logger = resolveQuickFormService("logger");
        const currIdx = state.currIdx;
        const slides = state.slides;
        logger.log("handle slide change: {currentIdx}", currIdx);

        let newIdx = currIdx;
        while (newIdx < slides.length && newIdx >= 0 && (newIdx === currIdx || !state.slides[newIdx].questions.some(x => x.visible?.isVisible ?? true))) {
            logger.log("handle slide change: {currentIdx} -> {newIdx}: Visible Questions:{hasVisibleQuestions}", currIdx, newIdx,
                state.slides[newIdx].questions.some(x => x.visible?.isVisible ?? true), slides.length);

            if (direction === 'next' && newIdx < slides.length - 1) {
                newIdx = newIdx + 1;
            } else if (direction === 'prev' && newIdx > 0) {
                newIdx = newIdx - 1;
            } else {
                break;
            }
        }

        return {
            ...state,
            currIdx: newIdx,
            currStep: newIdx + 1,
            hasNextSlide: newIdx < slides.length - 1,
            hasPrevSlide: newIdx > 0
        };
    }

    static computeProgress = (state: QuickformState) => {
        const slidesAnsweredCount = state.slides.reduce((sum, slide) => sum + (isSlideAnswered(slide) ? 1 : 0), 0);
        const progress = (slidesAnsweredCount / state.totalSteps) * 100;
        return {
            ...state,
            progress,
            progressText: `${slidesAnsweredCount}/${state.totalSteps}`,
            isSubmitSlide: progress === 100,
        };
    }

    static handleNextSlideAction = (state: QuickformState) => {
        // Filter out questions that are explicitly not visible
        const visibleQuestions = state.slides[state.currIdx].questions.filter(question => question.visible?.isVisible !== false);

        if (visibleQuestions.length === 0) {
            return { ...state, errorMsg: "No visible questions to answer." };
        }

        // Check all visible questions for answered and validity
        const validationResult = this.validateQuestions(visibleQuestions);
        if (validationResult.isValid) {
            return this.computeProgress(NavigationActionHandler.handleSlideChange({ ...state, errorMsg: "" }, 'next'));
        } else {
            return { ...state, errorMsg: validationResult.errorMsg };
        }
    };

    static validateQuestions = (questions: QuestionModel[]) => {
        if (questions.some((q: { answered: boolean; }) => q.answered === false)) {
            return { isValid: false, errorMsg: "Not all questions have been answered." };
        }
        if (questions.some((q: { output: any; }) => q.output === '' || typeof q.output === "undefined")) {
            return { isValid: false, errorMsg: "Some questions are missing outputs." };
        }
        if (questions.some(q => !q.validationResult || q.validationResult?.isValid === false)) {
            return { isValid: false, errorMsg: "Some questions have failed validation." };
        }

        return { isValid: true, errorMsg: "" };
    };


    static handlePrevSlideAction = (state: QuickformState) => NavigationActionHandler.handleSlideChange(state, 'prev');


    static handleSetIndexAction = (state: QuickformState, newIndex: number): QuickformState => {
        if (newIndex >= 0 && newIndex < state.slides.length) {
            return {
                ...state,
                currIdx: newIndex,
                currStep: newIndex + 1,
            };
        }
        return state;
    };
}