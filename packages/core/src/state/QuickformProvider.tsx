import { useReducer } from "react";
import { quickformReducer } from "./QuickformReducer";
import { defaultState } from "./QuickformState";
import { QuickFormContext } from "./QuickFormContext";
import { QuickFormProps } from "../QuickForm";
import { ErrorMessage } from "../components";
import { transformJSONInput } from "../services/ModelTransformer";

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
    // TODO - make resolveX work
    // const transform = resolveQuickFormService("modeltransformer");
    const formData = transformJSONInput(quickform, payload);
    const [state, dispatch] = useReducer(quickformReducer, defaultState(formData));

    const goToSlide = (index?: number) => { dispatch({ type: 'SET_INDEX', index: index }); }
    const goToNextSlide = () => { dispatch({ type: 'NEXT_SLIDE' }); }
    const goToPrevSlide = () => { dispatch({ type: 'PREV_SLIDE' }); }
    const toggleOverview = () => { dispatch({ type: 'TOGGLE_OVERVIEW' }) };

    const answerQuestion = (logicalName: string, output: any) => {
        dispatch({ type: 'ANSWER_QUESTION', logicalName: logicalName, output: output })
    }

    return (
        <QuickFormContext.Provider value={{
            state,
            dispatch,
            goToSlide,
            goToNextSlide,
            goToPrevSlide,
            answerQuestion,
            toggleOverview,
            onQuestionBtnClicked: () => { }
        }}>
            <ErrorMessage message={state.errorMsg} />
            {children}
        </QuickFormContext.Provider>
    );
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