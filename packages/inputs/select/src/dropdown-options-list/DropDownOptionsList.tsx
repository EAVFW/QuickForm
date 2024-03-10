import classNames from "classnames";
import { DropdownSelectOption } from "./dropdown-select-option/DropdownSelectOption";

type DropdownOptionsList = {
    styles: { [key: string]: string };
    options: { [key: string]: string };
    selectedOptions: string[];
    dropDownOptionClick: (key: string) => void;
}

export const DropdownOptionsList: React.FC<{
    styles: { [key: string]: string };
    options: { [key: string]: string };
    selectedOptions: string[];
    dropDownOptionClick: (key: string) => void;
}> = ({ styles, options, selectedOptions, dropDownOptionClick }) => (
    <>
        {Object.entries(options).map(([key, value]) => {
            const isSelected = selectedOptions.includes(key);
            return (
                <DropdownSelectOption
                    key={key}
                    className={classNames(styles["dropdown-item"], {
                        //[styles["inactive-option"]]: !isSelected && selectedOptions.length === options,
                    })}
                    onClick={() => dropDownOptionClick(key)}
                    isSelected={isSelected}
                >
                    <span className={classNames(styles["dropdown-item-label"], { [styles["selected"]]: isSelected })}>
                        {key}
                    </span>
                    <span className={styles["dropdown-text"]}>{value}</span>
                </DropdownSelectOption>
            );
        })}
    </>
);

export type SelectOptions = {
    [key: string]: string | { value: number, label: string, clearOthers?: boolean, clearOnOthers?: boolean }
    
}

interface DropdownOptionsParams {
    key: string;
    options: SelectOptions,
    selectedOptions: string[];
    maxItems: number;
    minItems: number;
    onOutputChange: (logicalName: string, output:any) => void;
    loggingEnabled?: boolean;
    
}

export const handleDropdownOptionClick = ({
    key,
    selectedOptions,
    options,
    maxItems,
    minItems,
    onOutputChange,
    loggingEnabled = false,
}: DropdownOptionsParams): string[] => {
    const log = loggingEnabled ? console.log : () => { };

    log('--- handleDropdownOptionClick ---', { key, maxItems, minItems });

    let option = options[key];

    let updatedOptions: string[] = [];
    
    if (selectedOptions.includes(key)) {
        // Remove allready selected key
        updatedOptions = selectedOptions.filter(option => option !== key);
    } else if (typeof option !== "string" && option.clearOthers) {
        updatedOptions = [key];
    } else if (selectedOptions.length < maxItems){
        // Add new key to selected options
        updatedOptions = [...selectedOptions, key];
    } else {
        // Replace last key with newly clicked key
        updatedOptions = [...selectedOptions.slice(1), key];
    }

    for (let [k, option] of Object.entries(options).filter(([k, option]) => typeof (option) !== "string" && option.clearOnOthers)) {
        if (updatedOptions.some(x => x !== k)) {
         
            updatedOptions = updatedOptions.filter(option => option !== k);
        }
    }


    log('Updated options:', updatedOptions);
    return updatedOptions;
};