import { useState } from 'react';
import classNames from 'classnames';
import styles from './DropDownInput.module.css';
import { DropdownOptionsList, handleDropdownOptionClick } from './dropdown-options-list/DropDownOptionsList';
import { useKeyPressHandler } from '../../../../hooks/useKeyPressHandler';
import { InputProps } from "../InputProps";
import { useQuickForm } from '../../../../state/QuickFormContext';
import { DropDownProperties } from '../../../../model';

export function DropDownInput(props: InputProps) {
    const { state, dispatch, answerQuestion } = useQuickForm();
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const { maxItems, minItems, options } = (props.inputProps as DropDownProperties);
    const remainingChoices = parseInt(minItems!) - selectedOptions.length;

    /* Refactored this large function outside of component due to async state errors.. change loggingEnabled to false if no need for excessive console logs. */
    const onClickHandler = (key: string) => {
        const newOptions = handleDropdownOptionClick({
            key: key,
            selectedOptions: selectedOptions,
            maxItems: maxItems!,
            minItems: minItems!,
            onOutputChange: props.onOutputChange,
            markQuestionAsAnswered: () => { },
            dispatch: dispatch,
            questionState: {},
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
