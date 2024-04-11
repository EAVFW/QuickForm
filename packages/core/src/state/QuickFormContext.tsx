"use client";
import React, { useContext } from "react";
import { QuickformState, defaultState } from "./QuickformState";
import { QuickformAction } from "./index";
import { SlideModel } from "../model";

interface IQuickFormContext {
    state: QuickformState;
    dispatch: React.Dispatch<QuickformAction>;
    goToSlide: (idx: number) => void;
    goToNextSlide: () => void;
    goToPrevSlide: () => void;
    answerQuestion: (logicalName: string, output: any, intermediate?: boolean) => void;
    setIntroVisited: () => void;
    setErrorMsg: (msg: string) => void;
    isFirstQuestionInCurrentSlide: (questionLogicalName: string) => boolean;
    getCurrentSlide: () => SlideModel;
    onSubmitAsync: (formdata: any) => Promise<string>;
}

export const QuickFormContext = React.createContext<IQuickFormContext>(
    {
        state: defaultState(),
        dispatch: () => { },
        goToSlide: () => { },
        goToNextSlide: () => { },
        goToPrevSlide: () => { },
        answerQuestion: () => { },
        setIntroVisited: () => { },
        setErrorMsg: () => { },
        isFirstQuestionInCurrentSlide: () => true,
        getCurrentSlide: () => (
            { questions: [], rows: [], isAnswered: false, addQuestion: () => ({ type: "question", ref: "" }) }
        ),
        onSubmitAsync: async (formdata) => { return "" },
    }
);

export const useQuickForm = () => {
    const context = useContext(QuickFormContext);
    if (!context) {
        throw new Error("useQuickForm must be used within a QuickFormProvider");
    }
    return context;
}