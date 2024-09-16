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
        const visibleQuestions = state.slides[state.currIdx]?.questions?.filter(question => question.visible?.isVisible !== false);

        if (visibleQuestions?.length === 0) {
            return { ...state, errorMsg: "No visible questions to answer." };
        }

        // Check all visible questions for answered and validity
        const validationResult = this.validateQuestions(visibleQuestions, state);
        console.log("reducer validationResult", validationResult)
        if (validationResult.isValid) {
            return this.computeProgress(NavigationActionHandler.handleSlideChange({ ...state, errorMsg: "" }, 'next'));
        } else {
            return { ...state, errorMsg: validationResult.errorMsg };
        }
    };

    static validateQuestions = (questions: QuestionModel[], state: QuickformState) => {
        const logger = resolveQuickFormService("logger");
        if (questions.some((q: { answered: boolean; }) => q.answered === false)) {
            return { isValid: false, errorMsg: state.data.validation?.messages?.NOT_ALL_QUESTIONS_ANSWERED ?? "Not all questions have been answered." };
        }
        if (questions.some((q: { output: any; }) => q.output === '' || typeof q.output === "undefined")) {
            return { isValid: false, errorMsg: state.data.validation?.messages?.SOME_QUESTIONS_HAS_EMPTY_ANSWER ?? "Some questions are missing outputs." };
        }
        if (questions.some(q => !q.validationResult || (!q.validationResult?.isValidating && q.validationResult?.isValid === false))) {
            //TODO, if its validating, should that block us from moving to next?
            //For now i decided to allow it to move to next - before submitting we can always go back and error hints can be shown in ui.
            //I dont think its critical that it allow to move on.  Right now this function is only called when validating if it can go to next slide
            //it has nothing to do with actually validation of the form.
            logger.log("Some questions have failed validation. {questions}", [questions, JSON.stringify(questions)]);
            return { isValid: false, errorMsg: state.data.validation?.messages?.SOME_QUESTIONS_HAVE_FAILED_VALIDATION ?? "Some questions have failed validation." };
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