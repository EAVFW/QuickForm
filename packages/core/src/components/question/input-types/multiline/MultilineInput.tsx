"use client";
import classNames from "classnames";
import styles from "./MultilineInput.module.css";
import { multilineInputSchema } from "./MultilineInputSchema";
import { MultilineProperties } from "../../../../model/index";
import { useQuickForm } from "../../../../state/QuickFormContext";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import React, { ChangeEvent, ChangeEventHandler, ForwardedRef, forwardRef, RefObject, useEffect, useRef, useState } from "react";

export const MultilineInput: InputComponentType<MultilineProperties> = ({ questionModel }) => {
    const { isFirstQuestionInCurrentSlide, answerQuestion } = useQuickForm();
    const { placeholder, output } = questionModel;
    const [text, setText] = useState<string>(output);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value.replace(/\r?\n/g, '\n'); // Normalize newline characters
        setText(() => newValue);
        answerQuestion(questionModel.logicalName, newValue, true);
    };

    const ref = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (ref.current && isFirstQuestionInCurrentSlide(questionModel.logicalName)) {
            ref.current.focus();
        }
    }, [ref]);

    return (
        <QuestionTextArea
            ref={ref}
            placeholder={placeholder}
            value={text}
            onChange={handleChange}
        />
    );
}

type MultilineInputProps = {
    readonly placeholder?: string;
    readonly className?: string;
    readonly value?: string;
    readonly onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    readonly width?: string;
    readonly focus?: boolean;
    readonly maxLength?: number;
}

const QuestionTextArea = forwardRef(
    (
        { placeholder, className, value, onChange, width, maxLength }: MultilineInputProps,
        passedRef: ForwardedRef<HTMLTextAreaElement>
    ) => {
        const textareaRef = (passedRef as RefObject<HTMLTextAreaElement>) ?? useRef<HTMLTextAreaElement>(null);

        return (
            <textarea style={{ width: width }}
                ref={passedRef ?? textareaRef}
                className={classNames(
                    styles["input__text"],
                    className
                )}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
            />
        );
    }
);

QuestionTextArea.displayName = "QuestionTextArea";

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
MultilineInput.inputSchema = multilineInputSchema;
registerInputComponent("multilinetext", MultilineInput);