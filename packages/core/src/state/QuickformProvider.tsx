import { useReducer } from "react";
import { quickformReducer } from "./QuickformReducer";
import { defaultState } from "./QuickformState";
import { QuickFormContext } from "./QuickFormContext";
import { ErrorMessage } from "../components";
import { transformJSONInput } from "../services/ModelTransformer";
import { JsonDataModel } from "../model/JsonDataModel";

type QuickFormProviderProps = {
    children: React.ReactNode;
    json: JsonDataModel;
}

export const QuickFormProvider: React.FC<QuickFormProviderProps> = ({ children, json, }) => {
    // TODO - make resolveX work
    // const transform = resolveQuickFormService("modeltransformer");
    const formData = transformJSONInput(json);
    const [state, dispatch] = useReducer(quickformReducer, defaultState(formData));

    const goToSlide = (index?: number) => { dispatch({ type: 'SET_INDEX', index: index }); };
    const goToNextSlide = () => { dispatch({ type: 'NEXT_SLIDE' }); };
    const goToPrevSlide = () => { dispatch({ type: 'PREV_SLIDE' }); };
    const answerQuestion = (logicalName: string, output: any) => { dispatch({ type: 'ANSWER_QUESTION', logicalName: logicalName, output: output }) };
    const setIntroVisited = () => { dispatch({ type: 'SET_INTRO_VISITED' }) };

    return (
        <QuickFormContext.Provider value={{
            state,
            dispatch,
            goToSlide,
            goToNextSlide,
            goToPrevSlide,
            answerQuestion,
            setIntroVisited
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