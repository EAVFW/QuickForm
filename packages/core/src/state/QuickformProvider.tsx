import { useMemo, useReducer } from "react";
import { quickformReducer } from "./QuickformReducer";
import { defaultState } from "./QuickformState";
import { QuickFormContext } from "./QuickFormContext";
import { ErrorMessage } from "../components";
import { transformJSONInput } from "../services/ModelTransformer";
import { JsonDataModel } from "../model/json/JsonDataModels";

type QuickFormProviderProps = {
    children: React.ReactNode;
    json: JsonDataModel;
}

export const QuickFormProvider: React.FC<QuickFormProviderProps> = ({ children, json, }) => {
    // TODO - make resolveX work
    // const transform = resolveQuickFormService("modeltransformer");
    const defaultStateObj = useMemo(() => { return defaultState(transformJSONInput(json)) }, []);
    const [state, dispatch] = useReducer(quickformReducer, defaultStateObj);

    const goToSlide = (index?: number) => { dispatch({ type: 'SET_INDEX', index: index }); };
    const goToNextSlide = () => { dispatch({ type: 'NEXT_SLIDE' }); };
    const goToPrevSlide = () => { dispatch({ type: 'PREV_SLIDE' }); };
    const answerQuestion = (logicalName: string, output: any) => { dispatch({ type: 'ANSWER_QUESTION', logicalName: logicalName, output: output }) };
    const setIntroVisited = () => { dispatch({ type: 'SET_INTRO_VISITED' }) };
    const setErrorMsg = (msg: string) => {
        console.log("errorMsg");
        dispatch({ type: "SET_ERROR_MSG", msg: msg })
    };

    return (
        <QuickFormContext.Provider value={{
            state,
            dispatch,
            goToSlide,
            goToNextSlide,
            goToPrevSlide,
            answerQuestion,
            setIntroVisited,
            setErrorMsg
        }}>
            <ErrorMessage message={state.errorMsg} />
            {children}
        </QuickFormContext.Provider>
    );
}