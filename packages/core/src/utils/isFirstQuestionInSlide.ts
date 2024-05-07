import { QuickformState } from "../state";

/**
 * Determines if the provided question is the first in the current slide and if it should receive autofocus.
 * The method checks if any question on the slide has been visited, and if so, it will not autofocus the first question.
 * @param questionLogicalName The logical name of the question to check.
 * @returns boolean indicating if the question is the first and should be autofocused.
 */
export const isFirstQInCurrentSlide = (questionLogicalName: string, state: QuickformState): boolean => {
    const currSlide = state.slides[state.currIdx];
    if (currSlide.questions && currSlide.questions.length > 0) {
        const isFirstQuestion = currSlide.questions[0].logicalName === questionLogicalName;
        const anyQuestionVisited = currSlide.questions.some(q => q.visited);
        return isFirstQuestion && !anyQuestionVisited;
    }
    return false;
}
