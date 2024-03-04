import { useCallback } from "react";
import { useQuickForm } from "../state";


export const useFocusableQuestion = <T extends HTMLElement>(questionkey: string, options?: FocusOptions) => {

    const { isFirstQuestionInCurrentSlide } = useQuickForm();

    const ref = useCallback((element: T) => {
        if (element && isFirstQuestionInCurrentSlide(questionkey)) {
            element.focus(options);
        }
    }, [questionkey]);
   

    return ref;
}