import { ValidationResult } from "../model/ValidationResult";
import { SubmitStatus } from "../model/SubmitStatus";

export type QuickformAnswerQuestionAction = { type: 'ANSWER_QUESTION'; logicalName: string; output: string; dispatch: React.Dispatch<QuickformAction>, intermediate?: boolean, validationResult?: ValidationResult };

export type QuickformAction =
    | { type: 'SET_INDEX'; index: number }
    | { type: 'NEXT_SLIDE' }
    | { type: 'PREV_SLIDE' }
    | { type: 'SET_ERROR_MSG'; msg: string }
    | { type: 'PROCESS_INTERMEDIATE_QUESTIONS'; dispatch: React.Dispatch<QuickformAction>; logicalName?: string }
    | QuickformAnswerQuestionAction
    | { type: 'SET_VALIDATION_RESULT'; logicalName: string; validationResult: ValidationResult; timestamp: number }
    | { type: 'COMPUTE_PROGRESS' }
    | { type: 'SET_SUBMIT_STATUS', status: SubmitStatus }
    | { type: 'SUBMIT', dispatch: React.Dispatch<QuickformAction>, id: string }
    | { type: 'SET_INTRO_VISITED' }
    | { type: 'GO_TO_ENDING' };
