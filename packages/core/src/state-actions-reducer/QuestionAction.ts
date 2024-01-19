export type QuestionAction =
    | { type: 'PDF_PREVIEW'; url: string }
    | { type: 'SET_INDEX'; index: number }
    | { type: 'NEXT_QUESTION' }
    | { type: 'PREVIOUS_QUESTION' }
    | { type: 'SET_ANSWERED'; index: number }
    //   | { type: 'ADD_RESPONSE'; key: string; value: any }
    | { type: 'SET_OUTPUT'; payload: string }
    | { type: 'COMPUTE_PROGRESS' }
    | { type: 'TOGGLE_OVERVIEW'; }
    | { type: 'SET_UNANSWERED'; index: number }
    | { type: 'SET_SUBMIT_STATUS', status: Partial<{ isSubmitting: boolean, isSubmitError: boolean, isSubmitOK: boolean }> }
    | { type: 'SUBMIT', dispatch: React.Dispatch<QuestionAction>, id:string }