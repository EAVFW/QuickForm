"use client";
import React, { useContext } from "react";
import { QuickformState, defaultState } from "./QuickformState";
import { QuickformAction } from "./index";
import { QuickFormDefinition, SlideModel } from "../model";
import { ServerActionSubmitHandler } from "./action-handlers/SubmitActionHandler";

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
    onSubmitAsync?: ServerActionSubmitHandler,
    addPayloadAugmenter: (augmenter: (payload: any) => any) => void;
    removePayloadAugmenter: (augmenter: (payload: any) => any) => void;
    cssVariables: { [key: string]: string };
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
        onSubmitAsync: async (formdata) => {
            return {} as Partial<QuickFormDefinition>
        },
        addPayloadAugmenter: () => { },
        removePayloadAugmenter: () => { },
        cssVariables: {}
    }
);

export const useQuickForm = () => {
    const context = useContext(QuickFormContext);
    if (!context) {
        throw new Error("useQuickForm must be used within a QuickFormProvider");
    }
    return context;
}