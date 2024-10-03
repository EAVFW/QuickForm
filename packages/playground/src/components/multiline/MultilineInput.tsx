"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { makeStyles, shorthands } from "@griffel/react";
import { useQuickForm, InputComponentType, registerInputComponent, quickformtokens } from "@eavfw/quickform-core";
import { multilineInputSchema } from "./MultilineInputSchema";
import { MultilineProperties } from "../../../../core/src/model";

const useInputTextStyles = makeStyles({
    inputText: {
        backgroundColor: 'transparent',
        ...shorthands.border(`1px solid ${quickformtokens.primary}`),
        ...shorthands.borderRadius('5px'),
        color: quickformtokens.onSurface,
        fontSize: quickformtokens.multilineTextFontSize,
        marginTop: '15px',
        paddingBottom: '9px',
        maxHeight: '8rem',
        height: '8rem',
        width: '100%',
        boxSizing: 'border-box',
        ...shorthands.overflow('auto'),
        '&:focus-visible': {
            ...shorthands.borderBottom("2px", "solid", `${quickformtokens.primary}`),
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
    const { isFirstQuestionInCurrentSlide, answerQuestion, state } = useQuickForm();
    const { placeholder, output } = questionModel;
    const [text, setText] = useState<string>(output || '');
    const ref = useRef<HTMLTextAreaElement>(null);

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value.replace(/\r?\n/g, '\n'); // Normalize newline characters
        setText(newValue);
        answerQuestion(questionModel.logicalName, newValue, true);
    };

    /**
     * The input control is responsible of setting itself focused when becoming active.
     * - We should also listen to inputcontrols being focused and if not active, trigger a reducer that sets it to active. Ultimately removing active from other questions. 
     * This happens right now when an answer is given (intermediate or not), so not critical.
     */
    useEffect(() => {
        if (questionModel.isActive || ref.current && isFirstQuestionInCurrentSlide(questionModel.logicalName))
            ref.current?.focus();
    }, [ref, isFirstQuestionInCurrentSlide, questionModel.logicalName, questionModel.isActive]);

    return (
        <textarea onBlur={() => answerQuestion(questionModel.logicalName, text, false)}
            ref={ref}
            className={styles.inputText}
            placeholder={placeholder}
            value={text}
            onChange={handleChange}
        />
    );
};

MultilineInput.inputSchema = multilineInputSchema;
registerInputComponent("multilinetext", MultilineInput);