"use client"
import React, { useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { useKeyPressHandler, useQuickForm, resolveQuickFormService, InputComponentType, registerInputComponent } from '@eavfw/quickform-core';

import styles from './DropDownInput.module.css';

import { DropdownOptionsList, SelectOptions, handleDropdownOptionClick } from './dropdown-options-list/DropDownOptionsList';
import { DropDownInputSchema } from './DropDownInputSchema';



const SelectInputType = "select";

export type DropDownProperties = {
    inputType: typeof SelectInputType;
    maxItems?: number;
    minItems?: number;
    options: SelectOptions
}



export const DropDownInput: InputComponentType<DropDownProperties> = ({ questionModel, options:rawOptions, maxItems = Infinity, minItems = 1 }) => {

    const logger = resolveQuickFormService("logger");

    const { answerQuestion, state: { autoAdvanceSlides } } = useQuickForm();
    const [selectedOptions, setSelectedOptions] = useState<string[]>(questionModel.answered ? [questionModel.output] : []);
    const remainingChoices = Math.max(0, minItems - selectedOptions.length);

    logger.log("Dropdown Input: {@options} {@selectedOptions}", rawOptions, selectedOptions);

    const options = useMemo(() => Object.fromEntries(Object.entries(rawOptions).map(([k, v]) => [k, typeof v === "string" ? v : v.label])), [rawOptions]);
    const timer = useRef(0);
    /* Refactored this large function outside of component due to async state errors.. change loggingEnabled to false if no need for excessive console logs. */
    const onClickHandler = React.useCallback((key: string) => {
        clearTimeout(timer.current);
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
            const mapper = (x: string) => { const o = rawOptions[x]; return typeof o === "string" || o.value==='' ? x : o.value ?? x };
            answerQuestion(questionModel?.logicalName!, maxItems === 1 ? newOptions.map(mapper)[0] : newOptions.map(mapper), true);//  newOptions.join(","));

            if (newOptionsLength === maxItems && autoAdvanceSlides) {

                timer.current = window.setTimeout(() => {
                    answerQuestion(questionModel?.logicalName!, maxItems === 1 ? newOptions.map(mapper)[0] : newOptions.map(mapper));

                }, 1000);
            }
            
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


DropDownInput.inputSchema =DropDownInputSchema
registerInputComponent("dropdown", DropDownInput);
