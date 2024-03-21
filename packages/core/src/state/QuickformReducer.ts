import { resolveQuickFormService } from "../services";
import { getAllQuestions, getCurrentSlide, isSlideAnswered, isSlideVisited, updateAllQuestions } from "../utils/quickformUtils";
import { QuickformAction } from "./QuickformAction";
import { QuickformState } from "./QuickformState";
import { NavigationActionHandler } from "./action-handlers/NavigationActionHandler";
import { QuestionActionHandler } from "./action-handlers/QuestionActionHandler";
import { VisibilityHandler } from "./action-handlers/VisibilityHandler";

export const quickformReducer = (state: QuickformState, action: QuickformAction): QuickformState => {
    const logger = resolveQuickFormService("logger");
    logger.log("QuickForm Reducer {action}", action.type, action);
    switch (action.type) {
        /* Question manipulation */
        case 'ANSWER_QUESTION': {
            state = QuestionActionHandler.answerQuestion(state, action);

            if (state.autoAdvanceSlides && isSlideVisited(state.slides[state.currIdx]) && !action.intermediate)
                state = NavigationActionHandler.handleNextSlideAction(state);

            return state;
        }
        case 'ANSWER_INTERMEDIATE_QUESTION': {

            updateAllQuestions(state.slides, (question) => {
                if (!question.answered && !(question.output === '' || question.output === null || question.output === undefined))
                    return { ...question, answered: true };
                return question;
            });
            state = VisibilityHandler.updateVisibleState(state);
            console.log("Reducer\n" + JSON.stringify(state.slides, null, 4));
            return { ...state };

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
        case "SET_ERROR_MSG": return { ...state, errorMsg: action.msg };
        case "SET_INTRO_VISITED": return { ...state, isIntroSlide: false };
        case "GO_TO_ENDING": return { ...state, isSubmitSlide: false, isEndingSlide: true }
        default: return state;
    }
};