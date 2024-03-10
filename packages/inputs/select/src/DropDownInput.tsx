"use client"
import React, { useMemo, useState } from 'react';
import classNames from 'classnames';
import { useKeyPressHandler, useQuickForm, resolveQuickFormService, InputComponentType, registerInputComponent } from '@eavfw/quickform-core';

import styles from './DropDownInput.module.css';

import { DropdownOptionsList, SelectOptions, handleDropdownOptionClick } from './dropdown-options-list/DropDownOptionsList';



const SelectInputType = "select";

export type DropDownProperties = {
    inputType: typeof SelectInputType;
    maxItems?: number;
    minItems?: number;
    options: SelectOptions
}



export const DropDownInput: InputComponentType<DropDownProperties> = ({ questionModel, options:rawOptions, maxItems = Infinity, minItems = 1 }) => {

    const logger = resolveQuickFormService("logger");

    const { answerQuestion } = useQuickForm();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(questionModel.answered ? [questionModel.output] : []);
    const remainingChoices = Math.max(0, minItems - selectedOptions.length);

    logger.log("Dropdown Input: {@options} {@selectedOptions}", rawOptions, selectedOptions);

    const options = useMemo(() => Object.fromEntries(Object.entries(rawOptions).map(([k, v]) => [k, typeof v === "string" ? v : v.label])), [rawOptions]);

    /* Refactored this large function outside of component due to async state errors.. change loggingEnabled to false if no need for excessive console logs. */
    const onClickHandler = React.useCallback((key: string) => {
        const newOptions = handleDropdownOptionClick({
            key: key,
            selectedOptions: selectedOptions,
            options: rawOptions,
            maxItems: maxItems!,
            minItems: minItems!,
            onOutputChange: answerQuestion,
            loggingEnabled: false
        });

        const newOptionsLength = typeof newOptions.length !== "number" ? parseInt(newOptions.length) : newOptions.length;
        const minItemsLength = typeof minItems !== "number" ? minItems : minItems;

        logger.log("Dropdown Clicked: {key}, isFinished={isFinished}, minItemsLength={minItemsLength}, Result={result},selectedOptions={@selectedOptions},options={@options}",
            key, newOptionsLength >= minItemsLength, minItemsLength, newOptions.join(","), selectedOptions, options);

        setSelectedOptions(prev => newOptions);

        if (newOptionsLength >= minItemsLength) {
            const mapper = (x: string) => { const o = rawOptions[x]; return typeof o === "string" ? x : o.value };
            answerQuestion(questionModel?.logicalName!, maxItems === 1 ? newOptions.map(mapper)[0] :  newOptions.map(mapper), true);//  newOptions.join(","));
            
        } else {
            answerQuestion(questionModel?.logicalName!, undefined, false);//  newOptions.join(","));
        }

    }, [selectedOptions, maxItems, minItems]);

    useKeyPressHandler(Object.keys(options!), (e, key) => onClickHandler(key));

    return (
        <>
            {remainingChoices > 0 && (
                <span className={styles["prompt-text"]}>
                    {remainingChoices === 1 ? "Choose 1 more" : `Choose ${remainingChoices}`}
                </span>
            )}
            <div
                className={classNames(styles["dropdown-container"], {
                    [styles["dropdown-no-margin-top"]]: remainingChoices !== 0,
                })}
            >
                    <DropdownOptionsList
                        styles={styles}
                        options={options!}
                        selectedOptions={selectedOptions}
                        dropDownOptionClick={onClickHandler}
                    />
                
            </div>
        </>
    );
}


DropDownInput.quickform = {
    label: "Select",
    field: {
        //  type: undefined,
        typeProvider: (a) => a.maxItems === 1 ? "select" : "multiselect",
        listValuesProvider: (a) => Object.entries(a.options ?? {}).map(([okey, o]) => (typeof (o) === "string" ?
            {
                label: o,
                name: okey
            } : { label: o.label, name: o.value }))
    },
    uiSchema: {
        paragraph: {
            "ui:widget": "textarea"
        },
        options: {
            "ui:field": "OptionsFields"
        }
    },
    schema: {
        type: "object",

        properties: {
            text: {
                title: "Text",
                type: "string"
            },

            placeholder: {
                title: "Placeholder",
                type: "string"
            },
            paragraph: {
                title: "Paragraph",
                type: "string"
            },
            options: {
                type: "object",
                additionalProperties: {
                    "type": "object",
                    required:["key","label"],
                    properties: {
                        key: { "type": "string", title: "Key", description: "The key used for the option, this is also the keyboard key used to select this option" },
                        label: { "type": "string", title: "Label", description:"The label shown to the end users" },
                        value: { "type": "number", title: "Value", description: "Used in calculations when this option is picked" },
                        clearOthers: { type: "boolean", "title": "Clear Others", description: "When set, this options clears other options already picked" },
                        clearOnOthers: { type: "boolean", "title": "Clear On Others", description: "When set, this option get cleared if another option is picked" }
                    }
                }
            },
            minItems: {
                title: "Minum Items Picked",
                type: "integer",
                default: 1
            },
            maxItems: {
                title: "Maxium Items Picked",
                type: "integer",
                default: 1
            },
        }
    }
}

registerInputComponent("dropdown", DropDownInput);
