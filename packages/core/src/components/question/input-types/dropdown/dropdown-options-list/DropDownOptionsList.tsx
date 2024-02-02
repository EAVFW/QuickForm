import classNames from "classnames";
import { DropdownSelectOption } from "./dropdown-select-option/DropdownSelectOption";

type DropdownOptionsList = {
    styles: { [key: string]: string };
    options: { [key: string]: string };
    selectedOptions: string[];
    dropDownOptionClick: (key: string) => void;
}

export const DropdownOptionsList: React.FC<DropdownOptionsList> = ({ styles, options, selectedOptions, dropDownOptionClick }) => {

    return (
        <>
            {Object.entries(options).map(([key, label]) => {
                const isSelected = selectedOptions.includes(label);

                return (
                    <DropdownSelectOption
                        key={key}
                        className={classNames(styles["dropdown-item"], {
                            [styles["inactive-option"]]: !isSelected && selectedOptions.length === 2,
                        })}
                        onClick={() => dropDownOptionClick(label)}
                        isSelected={isSelected}
                    >
                        <span className={classNames({ [styles["dropdown-item-label"]]: true, [styles["selected"]]: isSelected })}>
                            {key}
                        </span>
                        <span className={styles["dropdown-text"]}>{label}</span>
                    </DropdownSelectOption>
                );
            })}
        </>
    )
}



interface DropdownOptionsParams {
    key: string;
    selectedOptions: string[];
    maxItems: string;
    minItems: string;
    onOutputChange: (key: string) => void;
    markQuestionAsAnswered: (index: number) => void;
    dispatch: React.Dispatch<any>;
    questionState?: {
        currentQuestionIndex?: number;
    };
    loggingEnabled?: boolean;
}

export const handleDropdownOptionClick = ({
    key,
    selectedOptions,
    maxItems,
    minItems,
    onOutputChange,
    markQuestionAsAnswered,
    dispatch,
    questionState,
    loggingEnabled = false
}: DropdownOptionsParams): string[] => {

    const log = (...args: any[]) => {
        if (loggingEnabled) {
            console.log(...args);
        }
    };

    log('--- Beginning of handleDropdownOptionClick ---');
    log('Clicked key:', key);

    // Ensure maxItems and minItems are always integers
    const maxItemsCount = parseInt(maxItems || '0');
    const minItemsCount = parseInt(minItems || '0');

    log('maxItemsCount:', maxItemsCount);
    log('minItemsCount:', minItemsCount);

    let updatedOptions = [...selectedOptions];
    log('Initial selectedOptions:', selectedOptions);

    if (!selectedOptions.includes(key)) {
        log('Key is not in selectedOptions.');

        if (selectedOptions.length < maxItemsCount) {
            log('Adding key to selectedOptions as maxItemsCount is not reached.');
            updatedOptions.push(key);
        } else {
            log('Max limit reached. Removing the oldest selection and adding the new key.');
            updatedOptions = [...updatedOptions.slice(1), key];
        }
    } else {
        log('Key is already in selectedOptions. Removing it.');
        updatedOptions = updatedOptions.filter(option => option !== key);
    }

    log('Updated options:', updatedOptions);
    onOutputChange(key);
    log('onOutputChange called with key:', key);

    if (updatedOptions.length === minItemsCount) {
        log('Exact minItemsCount reached. Marking question as answered.');
        markQuestionAsAnswered(questionState?.currentQuestionIndex || -1);
    } else if (updatedOptions.length < minItemsCount) {
        log('Below minItemsCount after de-selection. Marking question as unanswered.');
        dispatch({ type: 'SET_UNANSWERED', index: questionState?.currentQuestionIndex || -1 });
    }

    log('--- End of handleDropdownOptionClick ---');
    return updatedOptions;
}