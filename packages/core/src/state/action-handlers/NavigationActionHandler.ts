import { isSlideAnswered } from "../../utils/quickformUtils";
import { QuickformState } from "../../state/QuickformState";
import { resolveQuickFormService } from "../../services";

export class NavigationActionHandler {
    private static handleSlideChange = (state: QuickformState, direction: 'next' | 'prev') => {
        const logger = resolveQuickFormService("logger");

        const currIdx = state.currIdx;
        const slides = state.slides;

        logger.log("handle slide change: {currentIdx}", currIdx);

        let newIdx = currIdx;
        while (newIdx < slides.length && newIdx >= 0 && (newIdx === currIdx || !state.slides[newIdx].questions.some(x => x.visible?.isVisible ?? true))) {
            logger.log("handle slide change: {currentIdx} -> {newIdx}: Visible Questions:{hasVisibleQuestions}", currIdx, newIdx,
                state.slides[newIdx].questions.some(x => x.visible?.isVisible ?? true));

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
        return this.computeProgress(NavigationActionHandler.handleSlideChange(state, 'next'));
    }

    static handlePrevSlideAction = (state: QuickformState) => {
        return NavigationActionHandler.handleSlideChange(state, 'prev');
    }
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