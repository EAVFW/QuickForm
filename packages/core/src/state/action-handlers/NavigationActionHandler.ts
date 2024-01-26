import { QuickformState } from "../../state/QuickformState";

export class NavigationActionHandler {
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

    static handleNextSlideAction = (state: QuickformState) => {
        const currIdx = state.currIdx;
        const slides = state.slides;

        // Check if there is a next slide
        if (currIdx < slides.length - 1) {
            const nextIdx = currIdx + 1;
            return {
                ...state,
                currIdx: nextIdx,
            };
        } else {
            return state;
        }
    }

    static handlePrevSlideAction = (state: QuickformState) => {
        const currIdx = state.currIdx;
        const slides = state.slides;

        // Check if there is a previous slide
        if (currIdx > 0 && slides.length > 0) {
            const prevIdx = currIdx - 1;
            return {
                ...state,
                currIdx: prevIdx,
            };
        } else {
            return state;
        }
    }
}