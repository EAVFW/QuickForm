"use client";
import { ChangeEvent, useState } from "react";
import { QuestionModel } from "../../../../model";
import { makeStyles, shorthands } from '@griffel/react';
import React, { CSSProperties, InputHTMLAttributes } from "react";
import { useQuickForm } from "../../../../state/QuickFormContext";
import { useFocusableQuestion } from "../../../../hooks/useFocusableQuestion";
import { quickformtokens } from "../../../../style/quickFormTokensDefinition";
import { TelephoneIcon } from "../../../../components/icons/TelephoneIcon";

const useInputTextStyles = makeStyles({
    inputContainer: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'transparent',
        color: 'var(--on-surface)',
        width: '100%',
    },
    inputText: {
        backgroundColor: 'transparent',
        ...shorthands.border('none'),
        ...shorthands.borderBottom(`1px solid var(--question-placeholder-color)`),
        color: 'var(--on-surface)',
        fontSize: quickformtokens.questionInputFontSize,
        marginTop: '8px',
        paddingBottom: '9px',
        width: '100%',
        ...shorthands.transition('color', '1s ease', 'opacity', '1s ease'),
        ':focus-visible': {
            ...shorthands.borderBottom('2px solid var(--on-surface)'),
            paddingBottom: '8px',
            ...shorthands.outline('none'),
            '::placeholder': {
                color: 'var(--on-surface)',
                opacity: 1,
            },
        },
        '::placeholder': {
            color: 'var(--question-placeholder-color)',
            opacity: 'var(--medium-emphasis-opacity)',
            ...shorthands.transition('color', '1s')
        },
        '@media screen and (max-width: 599px)': {
            fontSize: quickformtokens.questionInputFontSize,
            marginTop: '32px',
        },

    },
    inputIcon: {
        position: 'absolute',
        ...shorthands.padding('10px'),
        cursor: 'pointer',
    },
    iconLeft: {
        left: '0',
    },
    iconRight: {
        right: '0',
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
        <input style={style}
            ref={ref}
            type={type}
            // className={classNames(styles.input__text, className)}
            className={styles.inputText}
            placeholder={questionModel.placeholder}
            value={text}
            onChange={handleChange}

        />

        // <div className={styles.inputContainer}>
        //     <TelephoneIcon className={`${styles.inputIcon} ${styles.iconLeft}`} size={16} color={quickformtokens.primary} />
        //     <input
        //         type="text"
        //         className={styles.inputText}
        //         placeholder={questionModel.placeholder}
        //         value={text}
        //         onChange={handleChange}
        //     />
        //     <TelephoneIcon className={`${styles.inputIcon} ${styles.iconRight}`} size={16} color={quickformtokens.primary} />
        // </div>
    );
}