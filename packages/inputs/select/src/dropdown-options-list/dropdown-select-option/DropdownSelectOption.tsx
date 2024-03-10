import { MouseEventHandler, ReactNode } from "react";
import classNames from "classnames";
import styles from "./DropdownSelectOption.module.css";
import { makeStyles, mergeClasses } from "@griffel/react";
import { quickformtokens } from "@eavfw/quickform-core/src/style/quickformtokens";
import { Checkmark } from "@eavfw/quickform-core/src/components/icons";

type DropdownSelectOptionProps = {
  readonly isSelected?: boolean;
  readonly onClick?: MouseEventHandler;
  readonly className?: string;
  readonly children: ReactNode;
};

const useDropDownSelectOptionStyles = makeStyles({
    root: {
        ':hover': {
            color: quickformtokens.onSurface,
            backgroundColor: quickformtokens.onBackgroundDarker900
        }
    },
    selected: {
        backgroundColor: quickformtokens.onBackgroundDarker800
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
          className={classNames(styles["dropdown-select__option"], className, mergeClasses(selectOptionStyles.root, isSelected && selectOptionStyles.selected), {
        [styles["animate"]]: isSelected,
        [styles["selected"]]: isSelected,
      })}
      onClick={onClick}
    >
      {children}
          {isSelected && (
              <Checkmark color={quickformtokens.onSurface} size={24} />)}
    </span>
  );
}