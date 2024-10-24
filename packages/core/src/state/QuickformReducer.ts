import { stat } from "fs/promises";
import { resolveQuickFormService } from "../services";
import { getAllIntermediateQuestions, getAllQuestions, isSlideVisited } from "../utils/quickformUtils";
import { QuickformAction } from "./QuickformAction";
import { QuickformState } from "./QuickformState";
import { NavigationActionHandler } from "./action-handlers/NavigationActionHandler";
import { QuestionActionHandler } from "./action-handlers/QuestionActionHandler";
import { VisibilityHandler } from "./action-handlers/VisibilityHandler";

import { trace } from "@opentelemetry/api";
import { ValidationResult } from "../model/ValidationResult";

export const quickformReducer = (state: QuickformState, action: QuickformAction): QuickformState => {
    const logger = resolveQuickFormService("logger");
    logger.log("QuickForm Reducer {action}", action.type, action);

    const span = trace.getActiveSpan();
    if (span) {
        span.addEvent("QuickFormReducer:Triggered", { action: action.type });
    }

    switch (action.type) {
        case 'UPDATE_QUICKFORM_DEFINITION': {

            console.log("Reducer", [state, action.definition]);
            state = {
                ...state, data: {
                    ...state.data,
                    ending: {
                        ...state.data.ending,
                        ...(action.definition.ending ?? {})
                    },
                }
}

            return state;
        }
        case 'ADD_PAYLOAD_AUGMENTER': {
            state.payloadAugments = [...state.payloadAugments, action.augmenter];
            return state;
        }
        case 'REMOVE_PAYLOAD_AUGMENTER': {
            state.payloadAugments = state.payloadAugments.filter(augmenter => augmenter !== action.augmenter);
            return state;
        }

        case 'ANSWER_QUESTION': {

            if (span) {
                span.addEvent("QuickFormReducer:ANSWER_QUESTION", { value: action.output, logicalName: action.logicalName });
            }

            for (let slide of state.slides) {
                for (let question of slide.questions) {
                    question.isActive = question.logicalName === action.logicalName;

                }
            }

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

            //If a question is answered, we can set the next question to be active.

           

            if (!action.intermediate) {
               
                const currentQuestion = state.slides[state.currIdx].questions.find(q => q.logicalName === action.logicalName);
                if (currentQuestion) {
                    currentQuestion.isActive = false;
                    const currentQuestionIdx = state.slides[state.currIdx].questions.indexOf(currentQuestion);
                    const nextQuestion = state.slides[state.currIdx].questions[currentQuestionIdx + 1];
                    if (nextQuestion) {
                        nextQuestion.isActive = true;

                    }
                }
            }

            if (!action.intermediate)
                state= VisibilityHandler.updateVisibleState(state);;

            return state;
            
        }

        case 'SET_VALIDATION_RESULT': {

            let updatedState= QuestionActionHandler.updateQuestionValidation(state, action.logicalName, action.validationResult, action.timestamp)

            let isValidating = getAllQuestions(updatedState).some(q => q.validationResult?.isValidating ?? false);
            let isAllValid = getAllQuestions(updatedState).every(q => q.validationResult?.isValid ?? false);

            if (!isValidating && updatedState.onValidationCompleteCallback && isAllValid) {
                updatedState.onValidationCompleteCallback(updatedState);
                updatedState.onValidationCompleteCallback = undefined;
            }
            updatedState.submitStatus = { ...updatedState.submitStatus, isSubmitting: false };
            return updatedState;
        }
        case 'ON_VALIDATION_COMPLETED': {
            let allQuestions = getAllQuestions(state);
            let isValidating = allQuestions.some(q => q.validationResult?.isValidating ?? false);
            logger.log("QuickForm Reducer {action} - {isValidating}: {logicalNames}", action.type, isValidating,
                getAllQuestions(state).filter(q => q.validationResult?.isValidating ?? false).map(c => c.logicalName).join(','));
            if (isValidating) {
                return { ...state, onValidationCompleteCallback: action.callback }
            }

            let tasks: Array<PromiseLike<ValidationResult>> = [];
            const timestamp = new Date().getTime();
            for (let q of allQuestions) {
                logger.log("QuickForm Reducer {action} - {logicalName}: {validationResult} {output} {validatedOutput}",
                    action.type, q.logicalName, q.validationResult, q.output, q.validationResult?.validatedOutput);


                if (!q.validationResult || q.validationResult.timestamp === 0 || !q.validationResult.isValid) {

                    state = QuestionActionHandler.updateQuestionProperties(state, q.logicalName,
                        {   
                            validationResult: { ...q.validationResult, timestamp: timestamp, isValidating: true, isValid: false }
                        }
                    );

                    tasks.push(QuestionActionHandler.validateInput(state, q.logicalName).then(result => {
                        logger.log("QuickForm Reducer {action} - {logicalName}: {result}",
                            action.type, q.logicalName, result);

                        action.dispatch({
                            type: 'SET_VALIDATION_RESULT',
                            logicalName: q.logicalName,
                            validationResult: result, timestamp: timestamp
                        });
                        return result;
                    }));
                } 

            }

            if (tasks.length === 0) 
                action.callback(state);

            return state;
        }
        case 'PROCESS_INTERMEDIATE_QUESTIONS': {
            /*  Processes all questions that are in an Intermediate-state by ensuring they are successfully transitioned to a fully answered state. 
            *   1. Iterating through all questions in the state.slides array, it checks each question to determine if it's not yet marked as answered and if it has a valid output. 
            *   If these conditions are met, the question is updated to be marked as answered. This step ensures that any question with an attempt at an answer is recognized as such, moving it out of the Intermediate state.
            *   2. After updating the questions, the state is passed to the VisibilityHandler.updateVisibleState method. This makes questions that are dependent on answers from other questions visible if their visibility-rule is fulfilled.
            *   The overall effect is to ensure no intermediate questions are left behind unanswered or unvalidated.
            */

            let tasks: Array<PromiseLike<ValidationResult>> = [];
            let allIntermediateQuestions = getAllIntermediateQuestions(state);
            // Dont include the question currently being answered
            if (action.logicalName) {
                allIntermediateQuestions = allIntermediateQuestions.filter(q => q.logicalName !== action.logicalName);
            }

            if (typeof allIntermediateQuestions !== "undefined" && allIntermediateQuestions.length > 0) {
                const timestamp = new Date().getTime();
                for (let intermediateQuestion of allIntermediateQuestions) {
                    state = QuestionActionHandler.updateQuestionProperties(state, intermediateQuestion.logicalName,
                        {
                            answered: true,
                            visited:true,
                            intermediate: false,
                            validationResult: { ...intermediateQuestion.validationResult, timestamp: timestamp, isValidating: true, isValid: false }
                        }
                    );

                    tasks.push(QuestionActionHandler.validateInput(state, intermediateQuestion.logicalName).then(result => {
                        logger.log("QuickForm Reducer {action} - {logicalName}: {result}",
                            action.type, intermediateQuestion.logicalName, result);

                        action.dispatch({
                            type: 'SET_VALIDATION_RESULT',
                            logicalName: intermediateQuestion.logicalName,
                            validationResult: result, timestamp: timestamp
                        });
                        return result;
                    }));
                }
            }

             

            return state;
            //DISCUSS WITH KBA - should we not run this in answer insteaad?
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