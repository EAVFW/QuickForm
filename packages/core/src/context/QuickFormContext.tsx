"use client"
import React, { PropsWithChildren, ReactNode, useContext, useReducer, useState } from "react";
import { IQuickFormContext } from "./IQuickFormContext";
import { QuickFormProps } from "../QuickFormProps";
import { questionReducer } from "../state-actions-reducer/QuestionReducer";
import { QuestionState, formResponsPayload, questionInitialState } from "../state-actions-reducer/QuestionState";
import { QuestionModel } from "model/QuestionModel";

export type QuickFormContextType = IQuickFormContext | undefined;
export const QuickFormContext = React.createContext<QuickFormContextType>(undefined);

type QuickFormProviderProps = {
    quickform: QuickFormProps;
    id: string;
    payload?: any;
}


export const QuickFormProvider: React.FC<PropsWithChildren<QuickFormProviderProps>> = ({
    children,
    quickform, id, payload = {}
}): JSX.Element => {

   
    const [questionState, dispatch] = useReducer(questionReducer, questionInitialState(quickform, id, payload));
  //  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ isSubmitting: false, isSubmitError: false, isSubmitOK: false });

    const goToQuestion = (q: QuestionModel, index?: number) => {
        const idx = index !== undefined ? index : q.questionNumber;
        dispatch({ type: 'SET_INDEX', index: idx });
    }
    /**
     * In Relation to <Question />, we could consider calling it "Slides" instead of questions?
     * <SlideRender /> instead of <Question /> and goToNextSlide. IntroSlide, QuestionSlides, SubmitSlide and ending Slide.
     * */
    const goToNextQuestion = async () => {
        if (questionState.currentQuestion?.logicalName === "submit") {
            return;
        };
        dispatch({ type: 'NEXT_QUESTION' });
    }
    const goToPreviousQuestion = () => { dispatch({ type: 'PREVIOUS_QUESTION' }); }
    //ADD Response, does not do anything, why is it here?
    //const addResponse = (key: string, value: any) => { dispatch({ type: 'ADD_RESPONSE', key, value }); };

    const markQuestionAsAnswered = (index: number) => {
        dispatch({ type: 'SET_ANSWERED', index: index });
        dispatch({ type: 'COMPUTE_PROGRESS' });
    }

    const toggleOverview = () => { dispatch({ type: 'TOGGLE_OVERVIEW' }) };



   

    const onQuestionBtnClicked = async () => {
        const { currentQuestion, currentQuestionIndex } = questionState;
        const key = currentQuestion.logicalName;
        if (!currentQuestion) {
            console.error("Current question is undefined");
            goToNextQuestion();
            return;
        }


        switch (key) {
            case "submit":
                markQuestionAsAnswered(currentQuestionIndex);
                dispatch({ type: "SUBMIT", dispatch, id });
                
                return;
            case "intro":
                goToNextQuestion();
                return;
            default:
                break;
        }

        if (!currentQuestion.output) {
            console.error("Output is undefined or empty");
            return;
        }

        console.log("Dispatching response with key:", key, "and value:", currentQuestion.output);
      //  addResponse(key!, currentQuestion.output);
        markQuestionAsAnswered(currentQuestionIndex);
        goToNextQuestion();
    }

   

    return (
        <QuickFormContext.Provider value={{
            markQuestionAsAnswered,
            dispatch,
            questionState,
           // submitStatus,
            goToQuestion,
            goToNextQuestion,
            goToPreviousQuestion,
            onQuestionBtnClicked,
          //  onSubmitBtnClicked,
            toggleOverview
        }}>
            {children}
        </QuickFormContext.Provider>
    );
}

export const useQuickForm = () => {
    const context = useContext(QuickFormContext);
    if (!context) {
        throw new Error("useQuickForm must be used within a QuickFormProvider");
    }
    return context;
}
export const useCurrentQuestion = () => useQuickForm().questionState.currentQuestion;
export const useQuickFormState = () => useQuickForm().questionState;

// const fakeApiCall = async (questionState: QuestionState): Promise<ApiResponse> => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({ data: "Success!" });
//             const responses = formResponsPayload(questionState);
//             console.log("submit post data: ", responses);
//         }, 2000); // Wait for 2 seconds to simulate network delay
//     });
// };