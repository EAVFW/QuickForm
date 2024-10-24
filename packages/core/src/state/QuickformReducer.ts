import { resolveQuickFormService } from "../services";
import { getAllIntermediateQuestions, getAllQuestions, isSlideVisited } from "../utils/quickformUtils";
import { QuickformAction } from "./QuickformAction";
import { QuickformState } from "./QuickformState";
import { NavigationActionHandler } from "./action-handlers/NavigationActionHandler";
import { QuestionActionHandler } from "./action-handlers/QuestionActionHandler";
import { VisibilityHandler } from "./action-handlers/VisibilityHandler";

export const quickformReducer = (state: QuickformState, action: QuickformAction): QuickformState => {
    const logger = resolveQuickFormService("logger");
    logger.log("QuickForm Reducer {action}", action.type, action);
    switch (action.type) {

        case 'ANSWER_QUESTION': {
            state = QuestionActionHandler.answerQuestion(state, action);

            // Validate the question input
            if (!action.intermediate) {
                const timestamp = new Date().getTime();
                QuestionActionHandler.validateInput(state, action.logicalName).then(result => {
                    action.dispatch({ type: 'SET_VALIDATION_RESULT', logicalName: action.logicalName, validationResult: result, timestamp: timestamp })
                });
                state = QuestionActionHandler.startQuestionValidation(state, action.logicalName, timestamp);
            }

            if (state.autoAdvanceSlides && isSlideVisited(state.slides[state.currIdx]) && !action.intermediate) {
                state = NavigationActionHandler.handleNextSlideAction(state);
            }

            return state;
        }

        case 'SET_VALIDATION_RESULT': {
            return QuestionActionHandler.updateQuestionValidation(state, action.logicalName, action.validationResult, action.timestamp)
        }

        case 'PROCESS_INTERMEDIATE_QUESTIONS': {
            /*  Processes all questions that are in an Intermediate-state by ensuring they are successfully transitioned to a fully answered state. 
            *   1. Iterating through all questions in the state.slides array, it checks each question to determine if it's not yet marked as answered and if it has a valid output. 
            *   If these conditions are met, the question is updated to be marked as answered. This step ensures that any question with an attempt at an answer is recognized as such, moving it out of the Intermediate state.
            *   2. After updating the questions, the state is passed to the VisibilityHandler.updateVisibleState method. This makes questions that are dependent on answers from other questions visible if their visibility-rule is fulfilled.
            *   The overall effect is to ensure no intermediate questions are left behind unanswered or unvalidated.
            */

            let allIntermediateQuestions = getAllIntermediateQuestions(state.slides);

            // Dont include the question currently being answered
            if (action.logicalName) {
                allIntermediateQuestions = allIntermediateQuestions.filter(q => q.logicalName !== action.logicalName);
            }

            if (typeof allIntermediateQuestions !== "undefined" && allIntermediateQuestions.length > 0) {
                const timestamp = new Date().getTime();
                for (var intermediateQuestion of allIntermediateQuestions) {
                    state = QuestionActionHandler.updateQuestionProperties(state, intermediateQuestion.logicalName,
                        {
                            answered: true,
                            intermediate: false,
                            validationResult: { ...intermediateQuestion.validationResult, timestamp: timestamp, isValidating: true, isValid: false }
                        }
                    );

                    QuestionActionHandler.validateInput(state, intermediateQuestion.logicalName).then(result => {
                        action.dispatch({ type: 'SET_VALIDATION_RESULT', logicalName: intermediateQuestion.logicalName, validationResult: result, timestamp: timestamp })
                    });
                }
            }

            return VisibilityHandler.updateVisibleState(state);;
        }

        /* Deals with steps and navigation */
        case 'SET_INDEX': return NavigationActionHandler.handleSetIndexAction(state, action.index);
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