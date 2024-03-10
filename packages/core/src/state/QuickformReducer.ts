import { resolveQuickFormService } from "../services";
import { isSlideAnswered } from "../utils/quickformUtils";
import { QuickformAction } from "./QuickformAction";
import { QuickformState } from "./QuickformState";
import { NavigationActionHandler } from "./action-handlers/NavigationActionHandler";
import { QuestionActionHandler } from "./action-handlers/QuestionActionHandler";

export const quickformReducer = (state: QuickformState, action: QuickformAction): QuickformState => {
    const logger = resolveQuickFormService("logger");
    logger.log("QuickForm Reducer {action}", action.type);
    switch (action.type) {
        /* Question manipulation */
        case 'ANSWER_QUESTION': {
            state = QuestionActionHandler.answerQuestion(state, action);

            if (state.autoAdvanceSlides && isSlideAnswered(state.slides[state.currIdx]))
                state = NavigationActionHandler.handleNextSlideAction(state);

            return state;
        }
        //case 'ANSWER_QUESTION_AUTO_NAVIGATE': {
        //    let newState = QuestionActionHandler.answerQuestion(state, action.logicalName, action.output);
        //    if (isSlideAnswered(newState.slides[newState.currIdx])) {
        //        newState = NavigationActionHandler.handleNextSlideAction(newState);
        //    }
        //    return newState;
        //}

        /* Deals with steps and navigation */
        case 'SET_INDEX': return NavigationActionHandler.handleSetIndexAction(state, action.index);
        // case 'NEXT_SLIDE':
        //     if (isSlideAnswered(state.slides[state.currIdx])) {
        //         return NavigationActionHandler.handleNextSlideAction(state);
        //     } else {
        //         return { ...state, errorMsg: "All questions must be answered." }
        //     }
        case 'NEXT_SLIDE': return NavigationActionHandler.handleNextSlideAction(state);
        case 'PREV_SLIDE': return NavigationActionHandler.handlePrevSlideAction(state);

        /* Deals with progress, overview and submit */
        case 'COMPUTE_PROGRESS': return NavigationActionHandler.computeProgress(state);
        case 'SET_SUBMIT_STATUS': return { ...state, submitStatus: { ...state.submitStatus, ...action.status }, };
        // case "SUBMIT": return SubmitActionHandler.submit(state, action.dispatch);
        case "SET_ERROR_MSG": return { ...state, errorMsg: action.msg };
        case "SET_INTRO_VISITED": return { ...state, isIntroSlide: false };
        case "GO_TO_ENDING": return { ...state, isSubmitSlide: false, isEndingSlide: true }
        default: return state;
    }
};