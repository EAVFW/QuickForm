"use client"
import React from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./TextInput.module.css";
import { InputProps } from "model/InputType";
import { useQuickForm } from "../../../../state/QuickFormContext";
// import { useQuickForm } from "../../../../state/QuickFormContext";
// import { isValidEmail } from "../../../../validation/isValidEmail";

export function TextInput({ questionModel, onOutputChange }: InputProps) {
    const [text, setText] = useState<string>(questionModel!.output);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(() => event.target.value);
        onOutputChange(event.target.value);
    }
    const { isFirstQuestionInCurrentSlide } = useQuickForm();
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (ref.current && isFirstQuestionInCurrentSlide(questionModel.logicalName)) {
            ref.current.focus();
        }
    }, [ref]);

    return (
        <input
            ref={ref}
            type="text"
            className={classNames(styles.input__text)}
            placeholder={questionModel.placeholder}
            value={text}
            onChange={handleChange}
        />
    );
}
