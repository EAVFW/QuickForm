export type QuickformAction =
    | { type: 'SET_INDEX'; index: number }
    | { type: 'NEXT_SLIDE' }
    | { type: 'PREV_SLIDE' }
    | { type: 'SET_ANSWERED'; logicalName: string }
    | { type: 'SET_OUTPUT'; logicalName: string; output: string }
    | { type: 'COMPUTE_PROGRESS' }
    | { type: 'TOGGLE_OVERVIEW'; }
    | { type: 'SET_UNANSWERED'; logicalName: string }
    | { type: 'SET_SUBMIT_STATUS', status: Partial<{ isSubmitting: boolean, isSubmitError: boolean, isSubmitOK: boolean }> }
    | { type: 'SUBMIT', dispatch: React.Dispatch<QuickformAction>, id: string }
    | { type: 'PDF_PREVIEW'; url: string }
