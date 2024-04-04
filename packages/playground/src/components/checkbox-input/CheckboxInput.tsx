import React, { useState } from "react";
import { InputComponentType, InputProps, registerInputComponent, useQuickForm } from "@eavfw/quickform-core";
import styles from "./CheckboxInput.module.css";
import { checkboxInputSchema } from "./CheckboxInputSchema";

export const CheckboxInput: InputComponentType<{}> = ({ questionModel }) => {
    const [isChecked, setIsChecked] = useState<boolean>(questionModel.output === "true");
    const { answerQuestion } = useQuickForm();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        answerQuestion(questionModel.logicalName, event.target.checked ? "true" : "false")
    }

    const checkboxStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        margin: '10px 0',
    };

    const labelStyle: React.CSSProperties = {
        marginLeft: '10px',
    };

    return (
        <div
            className={styles['checkbox-container']}
            style={checkboxStyle}
        >
            <input
                type="checkbox"
                id={"checkbox-input" + questionModel.logicalName}
                checked={isChecked}
                onChange={handleChange}
                className={styles['checkbox-input']}
            />
            <label
                htmlFor={"checkbox-input" + questionModel.logicalName}
                style={labelStyle}
            >
                {questionModel.text}
            </label>
        </div>
    );
};

CheckboxInput.inputSchema = checkboxInputSchema;
registerInputComponent("checkbox", CheckboxInput);