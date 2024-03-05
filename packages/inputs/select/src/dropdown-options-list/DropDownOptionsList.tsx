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
                        [styles["inactive-option"]]: !isSelected && selectedOptions.length === 2,
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

interface DropdownOptionsParams {
    key: string;
    selectedOptions: string[];
    maxItems: number;
    minItems: number;
    onOutputChange: (logicalName: string, output:any) => void;
    loggingEnabled?: boolean;
}

export const handleDropdownOptionClick = ({
    key,
    selectedOptions,
    maxItems,
    minItems,
    onOutputChange,
    loggingEnabled = false,
}: DropdownOptionsParams): string[] => {
    const log = loggingEnabled ? console.log : () => { };

    log('--- handleDropdownOptionClick ---', { key, maxItems, minItems });

    let updatedOptions: string[]=[];
    if(selectedOptions.includes(key)){
        // Remove allready selected key
        updatedOptions = selectedOptions.filter(option => option !== key)
    } else if (selectedOptions.length < maxItems){
        // Add new key to selected options
        updatedOptions = [...selectedOptions, key];
    } else {
        // Replace last key with newly clicked key
        updatedOptions = [...selectedOptions.slice(1), key];
    }

    log('Updated options:', updatedOptions);
    return updatedOptions;
};