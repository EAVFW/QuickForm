import { QuickFormProps } from "QuickFormProps";
import { useReducer } from "react";
import { quickformReducer } from "./QuickformReducer";
import { defaultState } from "./QuickformState";
import { QuickFormContext } from "./QuickFormContext";
import { resolveQuickFormService } from "services/QuickFormServices";

type QuickFormProviderProps = {
    children: React.ReactNode;
    quickform: QuickFormProps;
    id: string;
    payload?: any;
}

export const QuickFormProvider: React.FC<QuickFormProviderProps> = (
    {
        children,
        quickform,
        id,
        payload = {}
    }
) => {
    // TODO - fix transformer to model new slide -> questions modeling
    const transform = resolveQuickFormService("modeltransformer");
    const [state, dispatch] = useReducer(quickformReducer, defaultState(transform(quickform, payload)));

    const goToSlide = (index?: number) => { dispatch({ type: 'SET_INDEX', index: index }); }
    const goToNextSlide = () => { dispatch({ type: 'NEXT_SLIDE' }); }
    const goToPrevSlide = () => { dispatch({ type: 'PREV_SLIDE' }); }
    const toggleOverview = () => { dispatch({ type: 'TOGGLE_OVERVIEW' }) };

    const markQuestionAsAnswered = (index: number) => {
        dispatch({ type: 'SET_ANSWERED', index: index });
        dispatch({ type: 'COMPUTE_PROGRESS' });
    }


    // const onQuestionBtnClicked = async () => {
    //     const { currIdx } = state;
    //     // if (!currentQuestion) {
    //     //     console.error("Current question is undefined");
    //     //     goToNextSlide();
    //     //     return;
    //     // }
    //     const key = currentQuestion.logicalName;

    //     switch (key) {
    //         case "submit":
    //             markQuestionAsAnswered(currentQuestionIndex);
    //             dispatch({ type: "SUBMIT", dispatch, id });

    //             return;
    //         case "intro":
    //             goToNextSlide();
    //             return;
    //         default:
    //             break;
    //     }

    //     if (!currentQuestion.output) {
    //         console.error("Output is undefined or empty");
    //         return;
    //     }

    //     markQuestionAsAnswered(currentQuestionIndex);
    //     goToNextSlide();
    // }

    return (
        <QuickFormContext.Provider value={{
            markQuestionAsAnswered,
            dispatch,
            state,
            goToSlide,
            goToNextSlide,
            goToPrevSlide,
            onQuestionBtnClicked: () => { },
            toggleOverview
        }}>
            {children}
        </QuickFormContext.Provider>
    );
}