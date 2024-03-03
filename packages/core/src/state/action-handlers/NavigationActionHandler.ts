import { QuickformState } from "../../state/QuickformState";

export class NavigationActionHandler {
    private static handleSlideChange = (state: QuickformState, direction: 'next' | 'prev') => {
        const currIdx = state.currIdx;
        const slides = state.slides;

        let newIdx = currIdx;
        if (direction === 'next' && currIdx < slides.length - 1) {
            newIdx = currIdx + 1;
        } else if (direction === 'prev' && currIdx > 0) {
            newIdx = currIdx - 1;
        }

        return {
            ...state,
            currIdx: newIdx,
            currStep: newIdx + 1,
            hasNextSlide: newIdx < slides.length - 1,
            hasPrevSlide: newIdx > 0
        };
    }

    static handleNextSlideAction = (state: QuickformState) => {
        return NavigationActionHandler.handleSlideChange(state, 'next');
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