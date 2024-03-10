"use client";
import { ChangeEvent, ChangeEventHandler, ForwardedRef, forwardRef, RefObject, useEffect, useRef, useState } from "react";
import styles from "./MultilineInput.module.css";
import classNames from "classnames";
import { useQuickForm } from "../../../../state/QuickFormContext";
import React from "react";
import { MultilineProperties } from "../../../../model/index";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";

export const MultilineInput: InputComponentType<MultilineProperties> = ({ questionModel }) => {
    const { isFirstQuestionInCurrentSlide, answerQuestion } = useQuickForm();
    const { placeholder, output } = questionModel;
    const [text, setText] = useState<string>(output);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value.replace(/\r?\n/g, '\n'); // Normalize newline characters
        setText(() => newValue);
        answerQuestion(questionModel.logicalName, newValue);
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
            className=""
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
        { placeholder, className, value, onChange, width, focus = true, maxLength }: MultilineInputProps,
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

MultilineInput.quickform = {
    label: "Multiline Text",
    uiSchema: {
        paragraph: {
            "ui:widget": "textarea"
        }
    },
    schema: {
        type: "object",
        properties: {
            text: {
                title: "Text",
                type: "string"
            },
            placeholder: {
                title: "Placeholder",
                type: "string"
            },
            paragraph: {
                title: "Paragraph",
                type: "string"
            }
        }
    },
    field: {
        type: "text",
    }
}

registerInputComponent("multilinetext", MultilineInput);