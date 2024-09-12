import { findQuestionByKey, findQuestionByLogicalName, getAllQuestions } from "../../utils/quickformUtils";
import { QuestionModel } from "../../model/QuestionModel";
import { resolveQuickFormService } from "../../services/QuickFormServices";
import { QuickformAnswerQuestionAction } from "../QuickformAction";
import { QuickformState } from "../QuickformState";
import { ValidationResult } from "../../model/ValidationResult";

export class QuestionActionHandler {
    private static inputValidator = resolveQuickFormService("inputValidator");

    static findSlideIdxAndQuestionIdx = (state: QuickformState, logicalName: string): { slideIndex: number; questionIndex: number } => {
        if (state.isSubmitSlide)
            return { slideIndex: -1, questionIndex: state.data.submit.submitFields.findIndex(x => x.logicalName === logicalName) };

        for (let slideIndex = 0; slideIndex < state.slides.length; slideIndex++) {
            const questionIndex: number = state.slides[slideIndex].questions.findIndex((q: QuestionModel) => q.logicalName === logicalName);
            if (questionIndex !== -1) {
                return { slideIndex, questionIndex };
            }
        }
        return { slideIndex: -1, questionIndex: -1 };
    };

    static updateQuestionProperties = (state: QuickformState, logicalName: string, propertiesToUpdate: any): QuickformState => {
        const { slideIndex, questionIndex } = this.findSlideIdxAndQuestionIdx(state, logicalName);

        

        const newState = { ...state };
        const targetQuestion = state.isSubmitSlide ?
            newState.data.submit.submitFields[questionIndex] :
            newState.slides[slideIndex].questions[questionIndex];

        if (!targetQuestion)
            return state;

        Object.entries(propertiesToUpdate).forEach(([key, value]) => {
            if (targetQuestion.hasOwnProperty(key) && typeof value === 'object' && !Array.isArray(value) && value !== null) {

                (targetQuestion as any)[key] = { ...(targetQuestion as any)[key], ...value };
            } else {
                (targetQuestion as any)[key] = value;
            }
        });

        if (state.isSubmitSlide) {
            newState.data.submit.submitFields[questionIndex] = targetQuestion;
        } else {
            newState.slides[slideIndex].questions[questionIndex] = targetQuestion;
        }

        return newState;
    };

    static answerQuestion = (state: QuickformState, { logicalName, output, intermediate, validationResult }: QuickformAnswerQuestionAction) => {
        const propertiesToUpdate: Partial<QuestionModel> = {
            answered: output !== undefined && output !== '' && !intermediate,
            intermediate: intermediate,
            visited: true,
            output: output,
            validationResult: undefined
        };
 

        return this.updateQuestionProperties(state, logicalName, propertiesToUpdate);
    };

    static startQuestionValidation = (state: QuickformState, logicalName: string, timestamp: number) => {
        const currentValidationResult = findQuestionByLogicalName(logicalName, getAllQuestions(state.slides))?.validationResult;

        return this.updateQuestionProperties(state, logicalName, {
            validationResult: { ...currentValidationResult, timestamp: timestamp, isValidating: true, isValid: false }
        });
    };

    /**
     * Update the validation result of a question
     * The actually update is only done if the timestamp of the current validation result matches the timestamp of the action
     * @param state - the current state
     * @param logicalName - the logical name of the question
     * @param validationResult - the new validation result
     * @param timestamp - the timestamp of the action
     * @returns the updated state
     */
    static updateQuestionValidation = (state: QuickformState, logicalName: string, validationResult: ValidationResult, timestamp: number) => {
        const currentValidationResult = findQuestionByLogicalName(logicalName, getAllQuestions(state.slides))?.validationResult;
        if (currentValidationResult?.timestamp !== timestamp) {
            return state;
        }
        return this.updateQuestionProperties(state, logicalName, {
            validationResult: { ...currentValidationResult, ...validationResult, isValidating: false }
        });
    }

    static async validateInput(state: QuickformState, logicalName: string): Promise<ValidationResult> {
        const questionRef = findQuestionByLogicalName(logicalName, getAllQuestions(state.slides));
        if (!questionRef) {
            console.log("Question not valid", [logicalName, getAllQuestions(state.slides)])
            return {
                isValid: false,
                message: 'Question not valid',
                validatedOutput: ''
            }
        }
        return await QuestionActionHandler.inputValidator(questionRef, state);
    }
    
}