import { useEffect, useRef } from "react";
import { useQuickForm } from "../state";


export const useFocusableQuestion = <T extends HTMLElement>(questionkey: string, options?: FocusOptions) => {

    const { isFirstQuestionInCurrentSlide } = useQuickForm();
    const ref = useRef<T>(null);
    useEffect(() => {
        if (ref.current && isFirstQuestionInCurrentSlide(questionkey)) {
            ref.current.focus(options);
        }
    }, [ref, questionkey]);


    return ref;
}