import { QuickformAction } from "./QuickformAction";
import { QuickformState } from "./QuickformState";
import { onSubmitBtnClicked } from "../services/SubmitService";
import { NavigationActionHandler } from "./action-handlers/NavigationActionHandler";
import { QuestionModel } from "../model/QuestionModel";
import { SlideModel } from "../model/SlideModel";

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
        onSubmitBtnClicked(state, action);
        return {
            ...state,
            submitStatus: { ...state.submitStatus, ...{ isSubmitting: true } },
        };
    }
    return state;
}


const updateQuestionProperty = (state: QuickformState, logicalName: string, propertyName: string, propertyValue: any): QuickformState => {
    const { slideIndex, questionIndex } = findSlideIdxAndQuestionIdx(state, logicalName);

    if (slideIndex === -1 || questionIndex === -1) {
        return state;
    }

    const newState = { ...state, slides: [...state.slides] };
    const originalSlide = newState.slides[slideIndex];
    const updatedQuestions = originalSlide.questions.map((question: QuestionModel, idx: number) =>
        idx === questionIndex ? { ...question, [propertyName]: propertyValue } : question
    );

    const updatedSlide = {
        ...originalSlide,
        questions: updatedQuestions,
        isAnswered: updatedQuestions.length > 0 && updatedQuestions.every(q => q.answered),
        addQuestion: originalSlide.addQuestion,
    };

    newState.slides[slideIndex] = updatedSlide;

    return newState;
};

const updateQuestion = (state: QuickformState, logicalName: string, answered: true): QuickformState => {
    const { slideIndex, questionIndex } = findSlideIdxAndQuestionIdx(state, logicalName);

    if (slideIndex === -1 || questionIndex === -1) {
        return state;
    }


}

const answerQuestion = (state: QuickformState, logicalName: string, output: any) => {
    console.log(`answering question for ${logicalName} with output ${output}`);
    // const newState = updateQuestionProperty(state, logicalName, 'answered', true);
    // const newState2 = updateQuestionProperty(newState, logicalName, 'output', output);
    const progressUpdated = computeProgress(updateQuestionProperty(updateQuestionProperty(state, logicalName, 'answered', true), logicalName, 'output', output));
    console.log("progressUpdated", progressUpdated);
    if (!progressUpdated.slides[progressUpdated.currIdx].isAnswered === true) {
        return progressUpdated
    }
    return NavigationActionHandler.handleNextSlideAction(progressUpdated)
};