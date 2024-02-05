import React, { useState } from 'react';
import classNames from 'classnames';
import { useKeyPressHandler } from '../../../../hooks/useKeyPressHandler';
import { useQuickForm } from '../../../../state/QuickFormContext';
import styles from './DropDownInput.module.css';
import { InputProps } from '../InputProps';
import { DropDownProperties } from '../../../../model';
import { DropdownOptionsList, handleDropdownOptionClick } from './dropdown-options-list/DropDownOptionsList';

export function DropDownInput({ questionRef, inputProps, onOutputChange }: InputProps) {
    const { answerQuestion } = useQuickForm();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const { maxItems, minItems, options } = (inputProps as DropDownProperties);
    const remainingChoices = minItems - selectedOptions.length;

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
        const minItemsLength = typeof minItems !== "number" ? parseInt(minItems) : minItems;
        if (newOptionsLength === minItemsLength) {
            answerQuestion(questionRef, newOptions.join(","))
        } else {
            setSelectedOptions(prev => newOptions);
        }
    }, [selectedOptions, maxItems, minItems, onOutputChange]);

    useKeyPressHandler(Object.keys(options), (e, key) => onClickHandler(key));

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
                    options={options}
                    selectedOptions={selectedOptions}
                    dropDownOptionClick={onClickHandler}
                />
            </div>
        </>
    );
}