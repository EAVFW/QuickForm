import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './DropDownInput.module.css';
import { InputProps } from '../InputProps';
import { DropdownOptionsList, handleDropdownOptionClick } from './dropdown-options-list/DropDownOptionsList';
import { assertDropDownModel } from '../../../../model/QuestionModel';
import { useKeyPressHandler } from '../../../../hooks/useKeyPressHandler';
import { useQuickForm } from 'state/QuickFormContext';

export function DropDownInput(props: InputProps) {
    const { questionState, dispatch, markQuestionAsAnswered } = useQuickForm();
    const { options = {}, minItems, maxItems } = assertDropDownModel(questionState.currentQuestion);
    ;
    const { onAnswered, onOutputChange } = props;

    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const remainingChoices = parseInt(minItems!) - selectedOptions.length;

    /* Refactored this large function outside of component due to async state errors.. change loggingEnabled to false if no need for excessive console logs. */
    const onClickHandler = (key: string) => {
        const newOptions = handleDropdownOptionClick({
            key: key,
            selectedOptions: selectedOptions,
            maxItems: maxItems!,
            minItems: minItems!,
            onOutputChange: onOutputChange,
            markQuestionAsAnswered: markQuestionAsAnswered,
            dispatch: dispatch,
            questionState: questionState,
            onAnswered: onAnswered!,
            loggingEnabled: false
        });

        setSelectedOptions(newOptions);
    }

    useKeyPressHandler(Object.keys(options), (e, key) => { onClickHandler(key) });

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
