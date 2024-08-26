"use client";
import "../services";
import React, { useMemo, useReducer } from "react";
import { quickformReducer, QuickFormContext, defaultState } from "../state";
import { ErrorPopup, QuickFormContainer } from "../components";
import { QuickFormTokens, defineQuickFormTokens } from "../style/quickFormTokensDefinition";
import { QuickFormDefinition } from "../model";
import { resolveQuickFormService } from "../services/QuickFormServices";
import { isFirstQInCurrentSlide } from "../utils/isFirstQuestionInSlide";
import { ServerActionSubmitHandler } from "./action-handlers/SubmitActionHandler";

type QuickFormProviderProps = {
    children: React.ReactNode;
    definition: QuickFormDefinition;
    tokens?: Partial<QuickFormTokens>;
    payload: any;
    asContainer?: boolean;
    onSubmitAsync?: ServerActionSubmitHandler;
}

export const QuickFormProvider: React.FC<QuickFormProviderProps> = (
    {
        children,
        definition,
        payload,
        tokens,
        asContainer,
        onSubmitAsync
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
        dispatch({ type: 'PROCESS_INTERMEDIATE_QUESTIONS', dispatch }); //Issue, this starts validation, nextslide should wait on validation if processing.
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

    const addPayloadAugmenter = (augmenter: (payload: any) => any) => {
        dispatch({ type: 'ADD_PAYLOAD_AUGMENTER', augmenter })
    }
    const removePayloadAugmenter = (augmenter: (payload: any) => any) => {
        dispatch({ type: 'REMOVE_PAYLOAD_AUGMENTER', augmenter })
    }

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
            cssVariables,
            removePayloadAugmenter,
            addPayloadAugmenter
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