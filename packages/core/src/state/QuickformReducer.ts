import { QuickformAction } from "./QuickformAction";
import { QuickformState } from "./QuickformState";
import { onSubmitBtnClicked } from "../services/SubmitService";
import { NavigationActionHandler } from "./action-handlers/NavigationActionHandler";
import { QuestionModel } from "../model/QuestionModel";

export const quickformReducer = (state: QuickformState, action: QuickformAction): QuickformState => {

    switch (action.type) {
        /* Question manipulation */
        case 'ANSWER_QUESTION': return answerQuestion(state, action.logicalName, action.output);

        /* Deals with steps and navigation */
        case 'SET_INDEX': return NavigationActionHandler.handleSetIndexAction(state, action.index);
        case 'NEXT_SLIDE': return NavigationActionHandler.handleNextSlideAction(state);
        case 'PREV_SLIDE': return NavigationActionHandler.handlePrevSlideAction(state);

        /* Deals with progress, overview and submit */
        case 'COMPUTE_PROGRESS': return computeProgress(state);
        case 'SET_SUBMIT_STATUS': return { ...state, submitStatus: { ...state.submitStatus, ...action.status }, };
        case "SUBMIT": return handleSubmit(state, action.dispatch)
        case "SET_ERROR_MSG": return { ...state, errorMsg: action.msg };
        case "SET_INTRO_VISITED": return { ...state, isIntroSlide: false }
        default: return state;
    }
};

const computeProgress = (state: QuickformState) => {
    const slidesAnsweredCount = state.slides.reduce((sum, slide) => sum + (slide.isAnswered ? 1 : 0), 0);
    const progress = (slidesAnsweredCount / state.totalSteps) * 100;
    return {
        ...state,
        progress,
        progressText: `${slidesAnsweredCount}/${state.totalSteps}`,
        isSubmitSlide: progress === 100,
    };
}

const findSlideIdxAndQuestionIdx = (state: QuickformState, logicalName: string): { slideIndex: number; questionIndex: number } => {
    for (let slideIndex = 0; slideIndex < state.slides.length; slideIndex++) {
        const questionIndex: number = state.slides[slideIndex].questions.findIndex((q: QuestionModel) => q.logicalName === logicalName);
        if (questionIndex !== -1) {
            return { slideIndex, questionIndex };
        }
    }
    return { slideIndex: -1, questionIndex: -1 };
};

const handleSubmit = (state: QuickformState, action: React.Dispatch<QuickformAction>) => {
    if (!state.submitStatus.isSubmitting) {
        onSubmitBtnClicked(state.id, state, action);
        return {
            ...state,
            submitStatus: { ...state.submitStatus, ...{ isSubmitting: true } },
        };
    }
    return state;
}


const updateQuestionProperty = (state: QuickformState, logicalName: string, propertyName: string, propertyValue: any): QuickformState => {
    // TODO - Fix this function
    const { slideIndex, questionIndex } = findSlideIdxAndQuestionIdx(state, logicalName);

    if (slideIndex === -1 || questionIndex === -1) {
        return state;
    }

    const newState = { ...state, slides: [...state.slides] };

    const originalSlide = state.slides[slideIndex];
    const clonedQuestions = originalSlide.questions.map((question: QuestionModel, idx: number) =>
        idx === questionIndex ? { ...question, [propertyName]: propertyValue } : question
    );

    // newState.slides[slideIndex] = new Slide(clonedQuestions);

    // if (originalSlide.columns) {
    //     newState.slides[slideIndex].columns = { ...originalSlide.columns };
    // }
    // if (originalSlide.rows) {
    //     newState.slides[slideIndex].rows = [...originalSlide.rows];
    // }

    return newState;
};

const answerQuestion = (state: QuickformState, logicalName: string, output: any) => {
    const newState = updateQuestionProperty(state, logicalName, 'answered', true);
    return computeProgress(updateQuestionProperty(newState, logicalName, 'output', output));
};