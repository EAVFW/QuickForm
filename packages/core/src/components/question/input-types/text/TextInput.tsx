"use client";
import React, { CSSProperties, InputHTMLAttributes } from "react";
import { ChangeEvent, useState } from "react";
import classNames from "classnames";
import styles from "./TextInput.module.css";
import { useQuickForm } from "../../../../state/QuickFormContext";
import { TextProperties } from "../../../../model/InputType";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { useFocusableQuestion } from "../../../../hooks/useFocusableQuestion";
import { QuestionModel } from "../../../../model";
import { textInputSchema } from "./TextInputSchema";
import { useFocusOutHandler } from "src/hooks/useFocusOutHandler";

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

    /* @pks - I added a quick hook to attempt adressing iOS focus issues - please test if this works as expected */
    useFocusOutHandler(ref, (value) => answerQuestion(questionModel.logicalName, value));

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