import { SubmitStatus } from "../model/SubmitStatus";

export type QuickformAction =
    | { type: 'SET_INDEX'; index: number }
    | { type: 'NEXT_SLIDE' }
    | { type: 'PREV_SLIDE' }
    | { type: 'SET_ERROR_MSG'; msg: string }
    | { type: 'ANSWER_QUESTION'; logicalName: string; output: string }
    | { type: 'COMPUTE_PROGRESS' }
    | { type: 'SET_SUBMIT_STATUS', status: SubmitStatus }
    | { type: 'SUBMIT', dispatch: React.Dispatch<QuickformAction>, id: string }
    | { type: 'SET_INTRO_VISITED' }
    | { type: 'GO_TO_ENDING' };
