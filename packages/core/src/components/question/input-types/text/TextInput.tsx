import { ChangeEvent, useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./TextInput.module.css";
import { InputProps } from "../InputProps";
import { useQuickForm } from "../../../../state/QuickFormContext";

export function TextInput({ placeholder, output, onOutputChange }: InputProps) {
    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => onOutputChange(event.target.value);

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, [ref]);

    console.log("placeHodlerText", placeholder);

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
