import { QuickformAction } from "./QuickformAction";
import { QuickformState } from "./QuickformState";
import { onSubmitBtnClicked } from "services/SubmitService";

export const quickformReducer = (state: QuickformState, action: QuickformAction): QuickformState => {

    switch (action.type) {
        /* Question manipulation */
        case 'SET_ANSWERED':
            return setQuestionAnswered(state, action.logicalName, true)
        case 'SET_UNANSWERED':
            return setQuestionAnswered(state, action.logicalName, false)
        case 'SET_OUTPUT':
            console.log("Setting output:", [state, action]);
            return setQuestionOutput(state, action.logicalName, action.output);

        /* Deals with steps and navigation */
        case 'SET_INDEX':
            return calculateUpdatedState(state, action.index);
        case 'NEXT_SLIDE':
            const ind = state.questions.indexOf(state.questions.find(x => !x.answered,) ?? state.questions[state.currentQuestionIndex]);
            return calculateUpdatedState(state, ind);
        case 'PREV_SLIDE':
            return calculateUpdatedState(state, state.currentQuestionIndex - 1);

        /* Deals with progress, overview and submit */
        case 'COMPUTE_PROGRESS':
            return computeProgress(state);
        case 'TOGGLE_OVERVIEW':
            return { ...state, showOverview: !state.showOverview };
        case 'SET_SUBMIT_STATUS':
            return { ...state, submitStatus: { ...state.submitStatus, ...action.status }, }
        case "SUBMIT":
            if (!state.submitStatus.isSubmitting) {
                onSubmitBtnClicked(action.id, state, action.dispatch);
                return {
                    ...state, submitStatus: { ...state.submitStatus, ...{ isSubmitting: true } },
                }
            }
            return state;
        case 'PDF_PREVIEW':
            return { ...state, pdfpreviewurl: action.url }
        default:
            return state;
    }
};

const computeProgress = (state: QuickformState) => {
    const slidesAnsweredCount = state.slides.reduce((sum, slide) => sum + (slide.isAnswered ? 1 : 0), 0);
    const progress = (slidesAnsweredCount / state.totalSteps) * 100;
    return { ...state, progress, progressText: `${slidesAnsweredCount}/${state.totalSteps}` };
}

const findSlideIdxAndQuestionIdx = (state: QuickformState, logicalName: string): { slideIndex: number; questionIndex: number } => {
    // Find the slide and question indices
    let slideIndex = -1, questionIndex = -1;

    for (let i = 0; i < state.slides.length; i++) {
        let qIndex = state.slides[i].questions.findIndex(q => q.logicalName === logicalName);
        if (qIndex !== -1) {
            slideIndex = i;
            questionIndex = qIndex;
            return { slideIndex, questionIndex };
        }
    }
    return { slideIndex, questionIndex };
};

const updateQuestionProperty = (state: QuickformState, logicalName: string, propertyName: string, propertyValue: any) => {
    const indexes = findSlideIdxAndQuestionIdx(state, logicalName);

    if (indexes.slideIndex !== -1 && indexes.questionIndex !== -1) {
        const newState = { ...state };
        newState.slides = [...newState.slides];

        const currentQuestion = newState.slides[indexes.slideIndex].questions[indexes.questionIndex];
        newState.slides[indexes.slideIndex].questions[indexes.questionIndex] = {
            ...currentQuestion,
            [propertyName]: propertyValue
        };

        return newState;
    }

    return state;
};

const setQuestionOutput = (state: QuickformState, logicalName: string, output: string) =>
    updateQuestionProperty(state, logicalName, 'output', output);

const setQuestionAnswered = (state: QuickformState, logicalName: string, answered: boolean) =>
    updateQuestionProperty(state, logicalName, 'answered', answered);

const calculateUpdatedState = (prevState: QuickformState, newIndex: number): QuickformState => {
    if (newIndex >= 0 && newIndex < state.questions.length) {
        return {
            ...prevState,
            currIdx: newIndex,
            currStep: newIndex + 1,
        };
    }
    return prevState;
};