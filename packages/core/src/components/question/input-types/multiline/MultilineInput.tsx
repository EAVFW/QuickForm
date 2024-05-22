"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { makeStyles, shorthands } from "@griffel/react";
import { quickformtokens } from "../../../../style/quickFormTokensDefinition";
import { multilineInputSchema } from "./MultilineInputSchema";
import { MultilineProperties } from "../../../../model/index";
import { useQuickForm } from "../../../../state/QuickFormContext";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";

const useInputTextStyles = makeStyles({
    inputText: {
        backgroundColor: 'transparent',
        ...shorthands.border(`1px solid ${quickformtokens.onSurface}`),
        ...shorthands.borderRadius('5px'),
        color: quickformtokens.onSurface,
        fontSize: quickformtokens.multilineTextFontSize,
        marginTop: '15px',
        paddingBottom: '9px',
        width: '100%',
        maxHeight: '8rem', // Set maximum height for three lines
        height: '8rem',
        resize: 'vertical',
        ...shorthands.overflow('auto'),
        '&:focus-visible': {
            ...shorthands.borderBottom("2px", "solid", `${quickformtokens.onSurface}`),
            ...shorthands.outline('none'),
            paddingBottom: '8px'
        },
        '&::placeholder': {
            color: quickformtokens.onSurface,
            opacity: quickformtokens.mediumEmphasisOpacity,
        },
        '&::-ms-input-placeholder': {
            color: quickformtokens.onSurface,
            opacity: quickformtokens.mediumEmphasisOpacity,
        },
        '@media screen and (max-width: 599px)': {
            fontSize: quickformtokens.multilineTextMobileFontSize,
            marginTop: '32px',
        },
    },
});

export const MultilineInput: InputComponentType<MultilineProperties> = ({ questionModel }) => {
    const styles = useInputTextStyles();
    const { isFirstQuestionInCurrentSlide, answerQuestion } = useQuickForm();
    const { placeholder, output } = questionModel;
    const [text, setText] = useState<string>(output || '');

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value.replace(/\r?\n/g, '\n'); // Normalize newline characters
        setText(newValue);
        answerQuestion(questionModel.logicalName, newValue, true);
    };

    const ref = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if (ref.current && isFirstQuestionInCurrentSlide(questionModel.logicalName)) {
            ref.current.focus();
        }
    }, [ref, isFirstQuestionInCurrentSlide, questionModel.logicalName]);

    return (
        <textarea onBlur={() => answerQuestion(questionModel.logicalName, text, false)}
            ref={ref}
            className={styles.inputText}
            placeholder={placeholder}
            value={text}
            onChange={handleChange}
            style={{ width: '100%' }}
        />
    );
};

MultilineInput.inputSchema = multilineInputSchema;
registerInputComponent("multilinetext", MultilineInput);