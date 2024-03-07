"use client";
import { useMemo, useReducer } from "react";
import { quickformReducer } from "./QuickformReducer";
import { defaultState } from "./QuickformState";
import { QuickFormContext } from "./QuickFormContext";
import { ErrorMessage, QuickFormContainer } from "../components";
import { QuickFormDefinition, defaultQuickFormTokens } from "../model";
import React from "react";
import "../services"
import { resolveQuickFormService } from "../services/QuickFormServices";
import { isSlideAnswered } from "../utils/slideUtils";

type QuickFormProviderProps = {
    children: React.ReactNode;
    definition: QuickFormDefinition;
    tokens?: Partial<typeof defaultQuickFormTokens>;
    payload: any;
    asContainer?: boolean
}

function defineVariables<T extends {}>(obj: T) {
    return Object.fromEntries(Object.entries(obj)
        .map(([k, value]) =>
            [`--${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())}`, value]).filter(([k, v]) => v !== `var(${k})`)) as { [key: string]: string }
};

export const defineQuickFormTokens = (...tokens: Array<Partial<typeof defaultQuickFormTokens>>) => {
    return defineVariables(tokens.reduceRight((n, o) => ({ ...o, ...n }), {}) as typeof defaultQuickFormTokens);
}

export const QuickFormProvider: React.FC<QuickFormProviderProps> = ({ children, definition, payload, tokens, asContainer }) => {

    const transform = resolveQuickFormService("modeltransformer");
    const defaultStateObj = useMemo(() => { return defaultState(transform(definition, payload), definition.layout) }, []);
    const [state, dispatch] = useReducer(quickformReducer, defaultStateObj);

    const goToSlide = (index: number) => { dispatch({ type: 'SET_INDEX', index: index }); };
    const goToNextSlide = () => {
        if (isSlideAnswered(getCurrentSlide())) {
            dispatch({ type: 'NEXT_SLIDE' });
        } else {
            dispatch({ type: "SET_ERROR_MSG", msg: "All questions must be answered" });
        }
    };
    const goToPrevSlide = () => { dispatch({ type: 'PREV_SLIDE' }); };
    const answerQuestion = (logicalName: string, output: any) => {
        if (state.autoAdvanceSlides) {
            dispatch({ type: 'ANSWER_QUESTION_AUTO_NAVIGATE', logicalName: logicalName, output: output });
        } else {
            dispatch({ type: 'ANSWER_QUESTION', logicalName: logicalName, output: output });
        }
    };
    const setIntroVisited = () => { dispatch({ type: 'SET_INTRO_VISITED' }) };
    const setErrorMsg = (msg: string) => {
        dispatch({ type: "SET_ERROR_MSG", msg: msg })
    };
    const isFirstQuestionInCurrentSlide = (questionLogicalName: string) => {
        const currSlide = state.slides[state.currIdx];
        return currSlide.questions && currSlide.questions.length > 0 && currSlide.questions[0].logicalName === questionLogicalName
    }
    const getCurrentSlide = () => (state.slides[state.currIdx]);
    const variables = defineQuickFormTokens(defaultQuickFormTokens, tokens ?? {}, definition?.layout?.tokens ?? {});

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
            getCurrentSlide
        }}>
            {asContainer ? (
                <QuickFormContainer style={variables}>
                    <ErrorMessage message={state.errorMsg} />
                    {children}
                </QuickFormContainer>
            ) : (
                <div style={variables}>
                    <ErrorMessage message={state.errorMsg} />
                    {children}
                </div>
            )
            }
        </QuickFormContext.Provider>
    );
}