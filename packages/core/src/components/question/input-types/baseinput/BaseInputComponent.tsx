"use client";
import { quickformtokens, useHandleEnterKeypress, useQuickForm } from "@eavfw/quickform-core";
import { useFocusableQuestion } from "@eavfw/quickform-core/src/hooks/useFocusableQuestion";
import { CSSProperties, ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { makeStyles, mergeClasses, shorthands } from '@griffel/react';
import { QuestionModel } from "@eavfw/quickform-core/src/model";
import { IconResolver, IconType } from "../../../icons/IconResolver";

import { trace } from "@opentelemetry/api";

const tracer = trace.getTracer("quickform", "1.0.0");

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
        ...shorthands.borderBottom("1px", "solid", `${quickformtokens?.questionPlaceholderColor || "black"}`),

        ':focus': {
            ...shorthands.borderBottom("1px", "solid", `${quickformtokens?.primary || "blue"}`),
            paddingBottom: '8px',
        },
    },
    inputText: {
        color: 'var(--on-surface)',
        backgroundColor: 'transparent',
        fontSize: quickformtokens?.questionInputFontSize || "16px",
        marginTop: '8px',
        paddingBottom: '9px',
        width: '100%',
        ...shorthands.border('none'),

        '@media screen and (max-width: 599px)': {
            fontSize: quickformtokens?.questionInputFontSize || "16px",
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

   // const [text, setText] = useState<string>(questionModel!.output);
    const ref = useFocusableQuestion<HTMLInputElement>(questionModel.logicalName);
    const { answerQuestion } = useQuickForm();
    const styles = useInputTextStyles();

    const span = trace.getActiveSpan();

    if (span) {
        span.addEvent("BaseInputComponent:render");
    }



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
        console.log("BaseInputComponent:handleChange", event.target.value);
        if (span) {
            span.addEvent("BaseInputComponent:handleChange", { 'value': event.target.value });
        }
        //EXPLAIN: WHY IS THIS HERE? If no reason, lets remove.
        if (event.target.value === "")
            questionModel.errorMsg = "";


       // setText(() => event.target.value);
        answerQuestion(questionModel.logicalName, event.target.value, true);
        resize();
    }

    /**
     * The input control is responsible of setting itself focused when becoming active.
     * - We should also listen to inputcontrols being focused and if not active, trigger a reducer that sets it to active. Ultimately removing active from other questions. 
     * This happens right now when an answer is given (intermediate or not), so not critical.
     */
    useEffect(() => {
        if (questionModel.isActive)
            ref.current?.focus();
    }, [questionModel.isActive]);

    ///**
    // * While a base input component is active we should answer the question upon enter.
    // */
    //useHandleEnterKeypress(!questionModel.isActive, () => {
    //    answerQuestion(questionModel.logicalName, text, false);
    //});

    const handleBlur = () => {
       
        if (span) {
            span.addEvent("BaseInputComponent:handleBlur");
        }
        answerQuestion(questionModel.logicalName, questionModel!.output, false);
        // Add any additional logic you want to execute on blur
    };
    

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
                value={questionModel!.output}
                onChange={handleChange}
                onBlur={handleBlur}
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
