import React, { useContext } from "react";
import { QuickformState, defaultState } from "./QuickformState";
import { QuickformAction } from "./index";

interface IQuickFormContext {
    state: QuickformState;
    dispatch: React.Dispatch<QuickformAction>;
    goToSlide: (idx: number) => void;
    goToNextSlide: () => void;
    goToPrevSlide: () => void;
    answerQuestion: (logicalName: string, output: any) => void;
    onQuestionBtnClicked: () => void;
    toggleOverview: () => void;
}

export const QuickFormContext = React.createContext<IQuickFormContext>(
    {
        state: defaultState(),
        dispatch: () => { },
        goToSlide: () => { },
        goToNextSlide: () => { },
        goToPrevSlide: () => { },
        answerQuestion: () => { },
        onQuestionBtnClicked: () => { },
        toggleOverview: () => { }
    }
);

export const useQuickForm = () => {
    const context = useContext(QuickFormContext);
    if (!context) {
        throw new Error("useQuickForm must be used within a QuickFormProvider");
    }
    return context;
}
// export const useCurrentQuestion = () => useQuickForm().state.currentQuestion;
export const useQuickFormState = () => useQuickForm().state;