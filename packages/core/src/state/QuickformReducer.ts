import { QuickformAction } from "./QuickformAction";
import { QuickformState } from "./QuickformState";
import { NavigationActionHandler } from "./action-handlers/NavigationActionHandler";
import { QuestionActionHandler } from "./action-handlers/QuestionActionHandler";

export const quickformReducer = (state: QuickformState, action: QuickformAction): QuickformState => {

    switch (action.type) {
        /* Question manipulation */
        case 'ANSWER_QUESTION': {
            const newState = QuestionActionHandler.answerQuestion(state, action.logicalName, action.output);
            if (!newState.slides[newState.currIdx].isAnswered === true) {
                return newState
            }
            return NavigationActionHandler.handleNextSlideAction(newState)
        }

        /* Deals with steps and navigation */
        case 'SET_INDEX': return NavigationActionHandler.handleSetIndexAction(state, action.index);
        case 'NEXT_SLIDE':
            if (state.slides[state.currIdx].isAnswered === true) {
                return NavigationActionHandler.handleNextSlideAction(state);
            } else {
                return { ...state, errorMsg: "All questions must be answered." }
            }
        case 'PREV_SLIDE': return NavigationActionHandler.handlePrevSlideAction(state);

        /* Deals with progress, overview and submit */
        case 'COMPUTE_PROGRESS': return QuestionActionHandler.computeProgress(state);
        case 'SET_SUBMIT_STATUS': return { ...state, submitStatus: { ...state.submitStatus, ...action.status }, };
        // case "SUBMIT": return SubmitActionHandler.submit(state, action.dispatch);
        case "SET_ERROR_MSG": return { ...state, errorMsg: action.msg };
        case "SET_INTRO_VISITED": return { ...state, isIntroSlide: false };
        case "GO_TO_ENDING": return { ...state, isSubmitSlide: false, isEndingSlide: true }
        default: return state;
    }
};