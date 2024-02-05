import { ChangeEvent, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./TextInput.module.css";
import { InputProps } from "../InputProps";
// import { useQuickForm } from "../../../../state/QuickFormContext";
// import { isValidEmail } from "../../../../validation/isValidEmail";

export function TextInput(props: InputProps) {
    const ref = useRef<HTMLInputElement>(null);
    const [text, setText] = useState<string>(props.output);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(() => event.target.value);
        props.onOutputChange(event.target.value);
    }
    // const { state, setErrorMsg } = useQuickForm();

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, [ref]);

    return (
        <input
            ref={ref}
            type="text"
            className={classNames(styles.input__text)}
            placeholder={props.placeholder}
            value={text}
            onChange={handleChange}
        />
    );
}
