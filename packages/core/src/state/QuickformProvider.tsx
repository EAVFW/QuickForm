"use client";
import "../services";
import React from "react";
import { useMemo, useReducer } from "react";
import { defaultState } from "./QuickformState";
import { quickformReducer } from "./QuickformReducer";
import { QuickFormContext } from "./QuickFormContext";
import { ErrorPopup, QuickFormContainer } from "../components";
import { QuickFormTokens, defineQuickFormTokens } from "../style/quickformtokens";
import { QuickFormDefinition } from "../model";
import { resolveQuickFormService } from "../services/QuickFormServices";

type QuickFormProviderProps = {
    children: React.ReactNode;
    definition: QuickFormDefinition;
    tokens?: Partial<QuickFormTokens>;
    payload: any;
    asContainer?: boolean,
    onSubmitAsync?: (formdata: any) => Promise<string>,
}

export const QuickFormProvider: React.FC<QuickFormProviderProps> = ({ children, definition, payload, tokens, asContainer, onSubmitAsync = async (data) => { return "" } }) => {

    const cssVariables = defineQuickFormTokens(tokens ?? {}, definition?.layout?.tokens ?? {});
    const transform = resolveQuickFormService("modeltransformer");
    const defaultStateObj = useMemo(() => { return defaultState(transform(definition, payload), definition.layout) }, []);
    const [state, dispatch] = useReducer(quickformReducer, defaultStateObj);

    const goToSlide = (index: number) => { dispatch({ type: 'SET_INDEX', index: index }); };
    const goToNextSlide = () => {
        dispatch({ type: 'PROCESS_INTERMEDIATE_QUESTIONS', dispatch });
        dispatch({ type: 'NEXT_SLIDE' });
    };
    const goToPrevSlide = () => { dispatch({ type: 'PREV_SLIDE' }); };
    const answerQuestion = (logicalName: string, output: any, intermediate = false) => {
        dispatch({ type: 'PROCESS_INTERMEDIATE_QUESTIONS', dispatch, logicalName });
        dispatch({ type: 'ANSWER_QUESTION', logicalName: logicalName, output: output, dispatch, intermediate });
    }
    const setIntroVisited = () => { dispatch({ type: 'SET_INTRO_VISITED' }) };
    const setErrorMsg = (msg: string) => { dispatch({ type: "SET_ERROR_MSG", msg: msg }) };
    const isFirstQuestionInCurrentSlide = (questionLogicalName: string) => {
        const currSlide = state.slides[state.currIdx];
        return currSlide.questions && currSlide.questions.length > 0 && currSlide.questions[0].logicalName === questionLogicalName;
    }
    const getCurrentSlide = () => (state.slides[state.currIdx]);

    return (
        <QuickFormContext.Provider value={{
            state,
            dispatch,
            goToSlide,
            goToNextSlide,
            goToPrevSlide,
            answerQuestion,
            setIntroVisited,
            setErrorMsg,
            isFirstQuestionInCurrentSlide,
            getCurrentSlide,
            onSubmitAsync,
        }}>
            {asContainer ? (
                <QuickFormContainer style={cssVariables}>
                    <ErrorPopup message={state.errorMsg} />
                    {children}
                </QuickFormContainer>
            ) : (
                <div style={cssVariables}>
                    <ErrorPopup message={state.errorMsg} />
                    {children}
                </div>
            )
            }
        </QuickFormContext.Provider>
    );
}