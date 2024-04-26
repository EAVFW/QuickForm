"use client";
import { quickformtokens, useQuickForm } from "@eavfw/quickform-core";
import { useFocusableQuestion } from "@eavfw/quickform-core/src/hooks/useFocusableQuestion";
import { CSSProperties, ChangeEvent, InputHTMLAttributes, useState } from "react";
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { QuestionModel } from "@eavfw/quickform-core/src/model";
import { IconResolver, IconType } from "../../../icons/IconResolver";

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

    inputIcon: {
        marginTop: '8px',
        paddingBottom: '9px',
    },
    iconLeft: {
        left: '0',
        paddingRight: '15px'
    },
    iconRight: {
        right: '0',
        paddingLeft: '15px'
    },
});

type BaseInputComponentProps = {
    type: InputHTMLAttributes<HTMLInputElement>["type"],
    questionModel: QuestionModel,
    beforeIcon?: IconType;
    afterIcon?: IconType
    style?: CSSProperties
    className?: string,
}

export const BaseInputComponent: React.FC<BaseInputComponentProps> = ({ questionModel, className, style, type, beforeIcon, afterIcon }) => {

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
            {beforeIcon &&
                <IconResolver
                    type={beforeIcon}
                    className={mergeClasses(styles.inputIcon, styles.iconLeft)}
                    size={18}
                    color={quickformtokens.primary}
                />
            }
            <input
                style={{ outline: 'none', }}
                ref={ref}
                type={type}
                className={styles.inputText}
                placeholder={questionModel.placeholder}
                value={text}
                onChange={handleChange}
            />
            {afterIcon &&
                <IconResolver
                    type={afterIcon}
                    className={mergeClasses(styles.inputIcon, styles.iconRight)}
                    size={18}
                    color={quickformtokens.primary}
                />
            }
        </div>
    );
}
