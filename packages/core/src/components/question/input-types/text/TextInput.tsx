import { ChangeEvent, useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./TextInput.module.css";
import { InputProps } from "../InputProps";
// import { useQuickForm } from "../../../../state/QuickFormContext";
// import { isValidEmail } from "../../../../validation/isValidEmail";

export function TextInput({ placeholder, output, onOutputChange }: InputProps) {
    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => onOutputChange(event.target.value);
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
            placeholder={placeholder}
            value={output}
            onChange={handleChange}
        />
    );
}
