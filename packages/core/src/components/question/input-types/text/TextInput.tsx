"use client"
import React from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./TextInput.module.css";
import { useQuickForm } from "../../../../state/QuickFormContext";
import { InputProps, TextProperties } from "../../../../model/InputType";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";

export const TextInput: InputComponentType<TextProperties> =({ questionModel })=> {
    const [text, setText] = useState<string>(questionModel!.output);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(() => event.target.value);
        questionModel.output = event.target.value;
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

TextInput.quickform = {
    label: "Text",
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
    }
}
registerInputComponent("text", TextInput);
