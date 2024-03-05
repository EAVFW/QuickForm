"use client"
import React, { CSSProperties, HtmlHTMLAttributes, InputHTMLAttributes } from "react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./TextInput.module.css";
import { useQuickForm } from "../../../../state/QuickFormContext";
import { InputProps, TextProperties } from "../../../../model/InputType";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { useFocusableQuestion } from "../../../../hooks/useFocusableQuestion";
import { QuestionModel } from "../../../../model";

export const BaseInputComponent = ({ questionModel, className, style, type }: { type: InputHTMLAttributes<HTMLInputElement>["type"], questionModel: QuestionModel, className?: string, style?: CSSProperties }) => {

    const [text, setText] = useState<string>(questionModel!.output);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(() => event.target.value);
        questionModel.output = event.target.value;
    }
    const ref = useFocusableQuestion<HTMLInputElement>(questionModel.logicalName);

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
    }
}
registerInputComponent("text", TextInput);
registerInputComponent("email", TextInput);
