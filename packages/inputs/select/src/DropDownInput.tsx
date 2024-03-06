"use client"
import React, { useState } from 'react';
import classNames from 'classnames';
import { useKeyPressHandler, useQuickForm, resolveQuickFormService, InputComponentType, registerInputComponent } from '@eavfw/quickform-core';

import styles from './DropDownInput.module.css';

import { DropdownOptionsList, handleDropdownOptionClick } from './dropdown-options-list/DropDownOptionsList';



const SelectInputType = "select";

export type DropDownProperties = {
    inputType: typeof SelectInputType;
    maxItems?: number;
    minItems?: number;
    options: {
        [key: string]: string;
    }
}



export const DropDownInput: InputComponentType<DropDownProperties> = ({ questionModel, options, maxItems, minItems }) => {

    const logger = resolveQuickFormService("logger");

    const { answerQuestion } = useQuickForm();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(questionModel.answered ? [questionModel.output] : []);
    // const { maxItems, minItems, options } = (questionModel?.inputProperties as DropDownProperties);
    const remainingChoices = minItems! - selectedOptions.length;

    logger.log("Dropdown Input: {@options} {@selectedOptions}", options, selectedOptions);
    /* Refactored this large function outside of component due to async state errors.. change loggingEnabled to false if no need for excessive console logs. */
    const onClickHandler = React.useCallback((key: string) => {
        const newOptions = handleDropdownOptionClick({
            key: key,
            selectedOptions: selectedOptions,
            maxItems: maxItems!,
            minItems: minItems!,
            onOutputChange: answerQuestion,
            loggingEnabled: false
        });

        const newOptionsLength = typeof newOptions.length !== "number" ? parseInt(newOptions.length) : newOptions.length;
        const minItemsLength = typeof minItems !== "number" ? minItems : minItems;

        logger.log("Dropdown Clicked: {key}, isFinished={isFinished}, minItemsLength={minItemsLength}, Result={result},selectedOptions={@selectedOptions},options={@options}",
            key, newOptionsLength === minItemsLength, minItemsLength, newOptions.join(","), selectedOptions, options);

        if (newOptionsLength === minItemsLength) {
            setSelectedOptions(prev => newOptions);
            setTimeout(() => {
                answerQuestion(questionModel?.logicalName!, newOptions.join(","));
            },1000);
        } else {
            setSelectedOptions(prev => newOptions);
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
                additionalProperties: true
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