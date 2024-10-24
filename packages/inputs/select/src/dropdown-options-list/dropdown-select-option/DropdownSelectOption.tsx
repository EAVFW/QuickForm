import { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";
import styles from "./DropdownSelectOption.module.css";
import { makeStyles, mergeClasses } from "@griffel/react";
import { Checkmark } from "@eavfw/quickform-core/src/components/icons";
import { shorthands } from "@fluentui/react-components";
import { quickformtokens } from "@eavfw/quickform-core";

type DropdownSelectOptionProps = {
    readonly isSelected?: boolean;
    readonly onClick?: MouseEventHandler;
    readonly className?: string;
    readonly children: ReactNode;
};

const useDropDownSelectOptionStyles = makeStyles({

    selected: {
        backgroundColor: quickformtokens.onBackgroundDarker800
    },
    option: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        ...shorthands.padding('0px', '8px'),
        marginLeft: '8px',
        marginBottom: '5px',
        fontSize: '2rem',
        lineHeight: '2rem',
        minHeight: '40px',

        cursor: 'pointer',
        ...shorthands.transition('background-color', '0.3s'),
       // overflowX: 'auto',

        color: quickformtokens.onSurface,
        backgroundColor: 'transparent',

        ...shorthands.border('1px', 'solid', quickformtokens.primary),
        ...shorthands.borderRadius('5px'),
        ':hover': {
            color: quickformtokens.onSurface,
            backgroundColor: quickformtokens.onBackgroundDarker900
        }
    }
})

export function DropdownSelectOption({
    isSelected,
    onClick,
    className,
    children,
}: DropdownSelectOptionProps) {

    const selectOptionStyles = useDropDownSelectOptionStyles();
    return (
        <span
            className={classNames(styles["dropdown-select__option"], mergeClasses(className,selectOptionStyles.option, isSelected && selectOptionStyles.selected), {
                [styles["animate"]]: isSelected,
                [styles["selected"]]: isSelected,
            })}
            onClick={onClick}
        >
            {children}
            {isSelected && (
                <Checkmark style={{display:"flex"}} color={quickformtokens.onSurface} size={"2rem"} />)}
        </span>
    );
}
