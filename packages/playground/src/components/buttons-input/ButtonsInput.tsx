"use client";
import React, { useState } from "react";
import { InputComponentType, quickformtokens, registerInputComponent, useQuickForm } from "@eavfw/quickform-core";
import { makeStyles, shorthands } from '@griffel/react';
import { buttonsInputSchema } from "./ButtonsInputSchema";


const useButtonStyles = makeStyles({
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        ...shorthands.gap("15px"),

        "@media (max-width: 480px)": {
            flexDirection: "column",
        },
    },

    button: {
        height: "55px",
        minHeight: "55px",
        backgroundColor: `${quickformtokens?.surface ?? "grey"}`,
        color: `${quickformtokens?.onSurface ?? "white"}`,
        fontSize: '1rem',
        cursor: 'pointer',
        width: "100%",
        flexGrow: 0,
        flexBasis: "100%",

        /* Extra small devices (phones, 600px and down) */
        "@media only screen and (max-width: 600px)": {
            flexBasis: "100%",
        },

        /* Small devices (portrait tablets and large phones, 600px and up) */
        "@media only screen and (min-width: 600px)": {
            // flexBasis: "50%",
            flexBasis: "calc(50% - 7.5px)"
        },

        /* Medium devices (landscape tablets, 768px and up) */
        "@media only screen and (min-width: 768px)": {
            flexBasis: "calc(33.3333% - 10px)",
        },

        /* Large devices (laptops/desktops, 992px and up) */
        "@media only screen and (min-width: 992px)": {
            // 4 buttons on a row gives 3 gaps (3x15 px) - this provides the calculation 45px/4 items width = 11.25px
            flexBasis: "calc(25% - 11.25px)",
        },

        boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        ...shorthands.transition(
            "background, color, border, border-color, box-shadow",
            "350ms",
            "ease-in-out",
            "0ms"
        ),
        ...shorthands.border("1px", "solid", `${quickformtokens?.primary ?? "grey"}`),
        ...shorthands.borderRadius("5px"),
    },
    selected: {
        backgroundColor: `${quickformtokens?.primary ?? "grey"}`,
        color: `${quickformtokens?.onPrimary ?? "white"}`,

    }
});

export type ButtonsProperties = {
    inputType: "buttons";
    options: {
        [key: string]: {
            key: string;
            label: string;
        }
    }
    defaultValue?: string;
}

export const ButtonsInput: InputComponentType<ButtonsProperties> = ({ questionModel, options }) => {
    const { answerQuestion } = useQuickForm();
    const [selectedValue, setSelectedValue] = useState<string>(questionModel.output);
    const buttonStyles = useButtonStyles();

    const handleChange = (value: string) => {
        setSelectedValue(value);
        answerQuestion(questionModel.logicalName, value);
    };

    return (
        <div className={buttonStyles.buttonContainer}>
            {Object.entries(options).map(([key, value]) => (
                <button
                    key={`button-key-${key}`}
                    onClick={() => handleChange(key)}
                    className={`${buttonStyles.button} ${selectedValue === key ? buttonStyles.selected : ''}`}
                    id={`${questionModel.logicalName}-${value.key}`}
                >
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {/* {selectedValue === key && <Checkmark style={{ paddingLeft: '10px' }} size={20} color={quickformtokens.onPrimary} />}{value} */}
                        {value.label}
                    </div>
                </button>
            ))}
        </div>
    );
};

ButtonsInput.inputSchema = buttonsInputSchema;
registerInputComponent("buttons", ButtonsInput);