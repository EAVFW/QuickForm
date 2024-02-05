import { ChangeEvent, ChangeEventHandler, ForwardedRef, forwardRef, RefObject, useEffect, useRef } from "react";
import { InputProps } from "../InputProps";
import styles from "./MultilineInput.module.css";
import classNames from "classnames";
import { useQuickForm } from "../../../../state/QuickFormContext";

export type MultilineInput = {
    readonly placeholder?: string;
    readonly className?: string;
    readonly value?: string;
    readonly onChange?: ChangeEventHandler<HTMLTextAreaElement>;
    readonly width?: string;
    readonly focus?: boolean;
    readonly maxLength?: number;
}

export function MultilineInput(props: InputProps) {
    const { state } = useQuickForm();
    const { placeholder, output } = props;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = event.target.value.replace(/\r?\n/g, '\n'); // Normalize newline characters
        props.onOutputChange(newValue);
    };

    const ref = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setTimeout(() => { ref.current?.focus(); }, 300);
    }, []);

    return (
        <QuestionTextArea ref={ref}
            placeholder={placeholder}
            value={output}
            onChange={handleChange}
            className=""
        />
    );
}

const QuestionTextArea = forwardRef(
    (
        { placeholder, className, value, onChange, width, focus = true, maxLength }: MultilineInput,
        passedRef: ForwardedRef<HTMLTextAreaElement>
    ) => {
        const textareaRef = (passedRef as RefObject<HTMLTextAreaElement>) ?? useRef<HTMLTextAreaElement>(null);

        return (
            <textarea style={{ width: width }}
                ref={passedRef ?? textareaRef}
                className={classNames(
                    styles["input__text"],
                    className
                )}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
            />
        );
    }
);

QuestionTextArea.displayName = "QuestionTextArea";
