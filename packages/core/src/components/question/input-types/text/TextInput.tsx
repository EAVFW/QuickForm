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
        answerQuestion(questionModel.logicalName, event.target.value,true);
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
    }, field: {
        type: "text",
    }
}
registerInputComponent("text", TextInput);
registerInputComponent("email", TextInput);