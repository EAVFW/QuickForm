"use client";
import { useState } from "react";
import { InputComponentType, registerInputComponent, useQuickForm } from "@eavfw/quickform-core";
import { RadioProperties } from "@eavfw/quickform-core/src/model";
import { buttonsInputSchema } from "./ButtonsInputSchema";

export const ButtonsInput: InputComponentType<RadioProperties> = ({ questionModel, options }) => {
    const { answerQuestion } = useQuickForm();
    const [selectedValue, setSelectedValue] = useState<string>(questionModel.output);

    const handleChange = (value: string) => {
        setSelectedValue(value);
        answerQuestion(questionModel.logicalName, value);
    };


    return (
        <div style={buttonContainerStyles}>
            {Object.entries(options).map(([key, value]) => (
                <button
                    key={key}
                    onClick={() => handleChange(value)}
                    style={selectedValue === value ? { ...buttonStyles, ...selectedStyles } : buttonStyles}
                    id={`${questionModel.logicalName}-${key}`}
                >
                    {value}
                </button>
            ))}
        </div>
    );
};

ButtonsInput.inputSchema = buttonsInputSchema;
registerInputComponent("buttons", ButtonsInput);


const selectedStyles: React.CSSProperties = {
    backgroundColor: 'var(--primary)',
    color: 'white',
};

const buttonContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '20px',
    width: '100%',
    marginTop: '20px',
};

const buttonStyles: React.CSSProperties = {
    height: '50px',
    width: '50%',
    maxWidth: 'calc(50% - 10px)',
    padding: '0 25px',
    fontSize: '16px',
    cursor: 'pointer',
    border: '1px solid var(--surface)',
    backgroundColor: 'var(--background)',
    textAlign: 'center',
    borderRadius: '10px',
};