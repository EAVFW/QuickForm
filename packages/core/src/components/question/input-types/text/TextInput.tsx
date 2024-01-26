"use client"
import { ChangeEvent } from "react";
import { InputProps } from "../InputProps";
import {
    ChangeEventHandler,
    ForwardedRef,
    forwardRef,
    HTMLAttributes,
    RefObject,
    useEffect,
    useRef,
} from "react";
import styles from "./TextInput.module.css";
import classNames from "classnames";
import { useQuickForm } from "state/QuickFormContext";


export type InputTextProps = {
    readonly type: "text";
    readonly props: InputProps;
    readonly placeholder?: string;
    readonly className?: string;
    readonly value?: string;
    readonly onChange?: ChangeEventHandler<HTMLInputElement>;
    readonly pattern?: string;
    readonly width?: string;
    readonly focus?: boolean;
    readonly inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
    readonly maxLength?: number;
}

/* TODO - Refactor this */
export function TextInput(props: InputProps) {
    const { state: questionState } = useQuickForm();
    const { placeholder } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => props.onOutputChange(event.target.value);
    const ref = useRef<HTMLInputElement>(null);
    // useEffect(() => {
    //     console.log("Output changed:", questionState?.output);
    // }, [questionState?.output]);
    useEffect(() => {
        setTimeout(() => { ref.current?.focus(); }, 300);
    }, []);
    return (
        <>
            <QuestionInputText ref={ref}
                type="text"
                props={props}
                placeholder={placeholder}
                value={questionState?.currentQuestion.output}
                onChange={handleChange}
                className=""
            />
        </>
    );
}

const QuestionInputText = forwardRef(
    (
        { placeholder, className, value, onChange, type, pattern, inputMode, width, focus = true, maxLength }: InputTextProps,
        passedRef: ForwardedRef<HTMLInputElement>
    ) => {
        const inputTextRef = (passedRef as RefObject<HTMLInputElement>) ?? useRef<HTMLInputElement>(null);

        // useEffect(() => {
        //     console.log("passedRef", passedRef);
        //     if (focus) {
        //         setTimeout(() => {
        //             inputTextRef.current?.focus();
        //         }, 500);
        //     }
        // }, []);



        useEffect(() => {
            if (inputTextRef.current && pattern) {
                setInputFilter(inputTextRef.current, function (value) {

                    if (maxLength && (value?.length ?? 0) > maxLength) {
                        return false;
                    }

                    return RegExp(pattern).test(value); // Allow digits and '.' only, using a RegExp.
                }, "Kun tal er tilladt");
            }
        }, [inputTextRef]);

        return (
            <input style={{ width: width }} pattern={pattern} inputMode={inputMode}
                ref={passedRef ?? inputTextRef}
                className={classNames(
                    styles["input__text"],
                    className
                )}
                type={type ?? "text"}
                placeholder={placeholder ?? ""}
                value={value}
                onChange={onChange}
            />
        );
    }
);

QuestionInputText.displayName = "QuestionInputText";

function setInputFilter(textbox: Element, inputFilter: (value: string) => boolean, errMsg: string): void {

    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
        textbox.addEventListener(event, function (this: (HTMLInputElement | HTMLTextAreaElement) & { oldValidValue: string; oldValue: string; oldSelectionStart: number | null, oldSelectionEnd: number | null }) {
            console.log(this.value);
            if (inputFilter(this.value)) {
                console.log("filter1", [this.oldValidValue, this.oldValue, this.value, this.selectionStart, this.oldSelectionStart, this.selectionEnd, this.oldSelectionEnd]);


                this.oldValidValue = this.oldValue;
                this.oldValue = this.value;


                if (this.oldValidValue !== this.oldValue) {
                    this.setCustomValidity('');
                }

                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;

            }
            else if (Object.prototype.hasOwnProperty.call(this, "oldValue")) {
                console.log("filter2");
                this.value = this.oldValue;
                this.setCustomValidity(errMsg);
                this.reportValidity();

                if (this.oldSelectionStart !== null &&
                    this.oldSelectionEnd !== null) {
                    this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
                }
            }
            else {
                this.oldValidValue = '';
                this.oldValue = '';
                this.value = "";

            }
        });
    });
}
