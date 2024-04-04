"use client";
import classNames from "classnames";
import styles from "./BaseInput.module.css";
import { ChangeEvent, useState } from "react";
import { QuestionModel } from "../../../../model";
import React, { CSSProperties, InputHTMLAttributes } from "react";
import { useQuickForm } from "../../../../state/QuickFormContext";
import { useFocusableQuestion } from "../../../../hooks/useFocusableQuestion";

export const BaseInputComponent = ({ questionModel, className, style, type }: { type: InputHTMLAttributes<HTMLInputElement>["type"], questionModel: QuestionModel, className?: string, style?: CSSProperties }) => {

    const [text, setText] = useState<string>(questionModel!.output);
    const ref = useFocusableQuestion<HTMLInputElement>(questionModel.logicalName);
    const { answerQuestion, validateAndAnswerQuestion } = useQuickForm();

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

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "")
            questionModel.errorMsg = "";
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