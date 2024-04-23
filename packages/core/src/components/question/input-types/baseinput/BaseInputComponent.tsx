"use client";
import { ChangeEvent, useState } from "react";
import { QuestionModel } from "../../../../model";
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import React, { CSSProperties, InputHTMLAttributes } from "react";
import { useQuickForm } from "../../../../state/QuickFormContext";
import { useFocusableQuestion } from "../../../../hooks/useFocusableQuestion";
import { quickformtokens } from "../../../../style/quickFormTokensDefinition";

const useInputTextStyles = makeStyles({
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'transparent',
        color: 'var(--on-surface)',
        width: '100%',
        ...shorthands.borderTop('none'),
        ...shorthands.borderLeft('none'),
        ...shorthands.borderRight('none'),
        ...shorthands.borderBottom("1px", "solid", `${quickformtokens.questionPlaceholderColor}`),

        ':focus': {
            ...shorthands.borderBottom("1px", "solid", `${quickformtokens.primary}`),
            paddingBottom: '8px',
        },
    },
    inputText: {
        color: 'var(--on-surface)',
        backgroundColor: 'transparent',
        fontSize: quickformtokens.questionInputFontSize,
        marginTop: '8px',
        paddingBottom: '9px',
        width: '100%',
        ...shorthands.border('none'),

        '@media screen and (max-width: 599px)': {
            fontSize: quickformtokens.questionInputFontSize,
            marginTop: '32px',
        },

    },
});

export const BaseInputComponent = ({ questionModel, className, style, type }: { type: InputHTMLAttributes<HTMLInputElement>["type"], questionModel: QuestionModel, className?: string, style?: CSSProperties }) => {

    const [text, setText] = useState<string>(questionModel!.output);
    const ref = useFocusableQuestion<HTMLInputElement>(questionModel.logicalName);
    const { answerQuestion } = useQuickForm();
    const styles = useInputTextStyles();

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
        <div className={mergeClasses(styles.inputContainer, className)} style={style}>
            <input
                style={{ outline: 'none', }}
                ref={ref}
                type={type}
                className={styles.inputText}
                placeholder={questionModel.placeholder}
                value={text}
                onChange={handleChange}
            />
        </div>
    );
}