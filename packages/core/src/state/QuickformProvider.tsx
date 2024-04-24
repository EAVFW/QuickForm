"use client";
import "../services";
import React, { useMemo, useReducer } from "react";
import { quickformReducer, QuickFormContext, defaultState } from "../state";
import { ErrorPopup, QuickFormContainer } from "../components";
import { QuickFormTokens, defineQuickFormTokens } from "../style/quickFormTokensDefinition";
import { QuickFormDefinition } from "../model";
import { resolveQuickFormService } from "../services/QuickFormServices";
import { kbaQuickFormTokens } from "../style/kbaQuickFormTokens";
import { isFirstQInCurrentSlide } from "../utils/isFirstQuestionInSlide";

type QuickFormProviderProps = {
    className?: string,
    children: React.ReactNode;
    definition: QuickFormDefinition;
    tokens?: Partial<QuickFormTokens>;
    payload: any;
    asContainer?: boolean,
    onSubmitAsync?: (formdata: any) => Promise<string>,
}

export const QuickFormProvider: React.FC<QuickFormProviderProps> = (
    {
        className,
        children,
        definition,
        payload,
        tokens = kbaQuickFormTokens,
        asContainer,
        onSubmitAsync = async (data) => { return "" }
    }
) => {

    const logger = resolveQuickFormService("logger");
    const cssVariables = defineQuickFormTokens(tokens ?? {}, definition?.layout?.tokens ?? {});
    logger.log("cssVariables", cssVariables);
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
    const isFirstQuestionInCurrentSlide = (questionLogicalName: string) => { return isFirstQInCurrentSlide(questionLogicalName, state); }
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
            cssVariables
        }}>

            {asContainer ? (
                <QuickFormContainer style={cssVariables}>
                    <ErrorPopup message={state.errorMsg} />
                    {children}
                </QuickFormContainer>
            ) : (
                children

            )
            }
        </QuickFormContext.Provider>
    );
}