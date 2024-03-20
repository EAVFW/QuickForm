"use client";
import React, { CSSProperties, InputHTMLAttributes } from "react";
import { ChangeEvent, useEffect, useState } from "react";
import classNames from "classnames";
import styles from "./TextInput.module.css";
import { useQuickForm } from "../../../../state/QuickFormContext";
import { TextProperties } from "../../../../model/InputType";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { useFocusableQuestion } from "../../../../hooks/useFocusableQuestion";
import { QuestionModel } from "../../../../model";
import { textInputSchema } from "./TextInputSchema";

export const BaseInputComponent = ({ questionModel, className, style, type }: { type: InputHTMLAttributes<HTMLInputElement>["type"], questionModel: QuestionModel, className?: string, style?: CSSProperties }) => {

    const [text, setText] = useState<string>(questionModel!.output);
    const ref = useFocusableQuestion<HTMLInputElement>(questionModel.logicalName);
    const { answerQuestion } = useQuickForm();

    const resize = () => {
        const input = ref.current;
        if (!input)
            return;

        const oldvalue = input.value;

        if (!oldvalue || oldvalue === '')
            input.value = input.placeholder;

        const isOverflowed = input.scrollWidth > input.clientWidth;
        input.value = oldvalue;
        if (isOverflowed) {
            var style = window.getComputedStyle(input, null).getPropertyValue('font-size');
            input.style.fontSize = (parseFloat(style) - 1) + "px";
            resize();
        }
    }

    useEffect(() => {
        if (ref.current) {
            resize();
        }
    }, [ref]);
    useEffect(() => {
        /**
         * This is not fired on chrome, edge on IOS. TODO
         * https://support.google.com/chrome/thread/170808931/ios-software-keyboard-done-button-doesn-t-work-in-input-on-overlays?hl=en     
         * 
         */
        const onfocusOut = (e: FocusEvent) => {

            if (ref.current) {
                answerQuestion(questionModel.logicalName, ref.current.value);
            }
        };
        document.addEventListener('focusout', onfocusOut);
        return () => {
            document.removeEventListener("focusout", onfocusOut);
        }
    }, [ref, questionModel.logicalName])
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(() => event.target.value);
        answerQuestion(questionModel.logicalName, event.target.value, true);
        resize();
    }

    return (
        <input style={style}
            ref={ref}
            type={type}
            className={classNames(styles.input__text, className)}
            placeholder={questionModel.placeholder}
            value={text}
            onChange={handleChange}
        />
    );

}
export const TextInput: InputComponentType<TextProperties> = (props) => {
    return <BaseInputComponent type="text" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
TextInput.inputSchema = textInputSchema;
registerInputComponent("text", TextInput);