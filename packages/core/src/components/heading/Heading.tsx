import React, { CSSProperties } from "react";
import { ReactNode } from "react";
import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../services/QuickFormServices";
import { useQuickForm } from "../../state/QuickFormContext";
import styles from "./Heading.module.css";
type HeadingProps = {
    readonly children: ReactNode;
    readonly style?: React.CSSProperties;
    readonly className?: string;
    readonly label?: string;
};

const headingStyles: React.CSSProperties = {
    fontSize: '2.4rem',
    fontWeight: 'unset',
    color: 'var(--on-surface)',
}

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    let { state } = useQuickForm();
    console.log("defaultHeadingNumberDisplayProvider", [!(state.isEndingSlide || state.isIntroSlide || state.isSubmitSlide), state])
    return !(state.isEndingSlide || state.isIntroSlide || state.isSubmitSlide)
}
registerQuickFormService("headingNumberDisplayProvider", defaultHeadingNumberDisplayProvider);

import classNames from "classnames";
import { ImArrowRightIcon } from "../../components/icons";

export function Heading({ children, className, label, style = {} }: HeadingProps) {

    const shouldDisplayNumber = resolveQuickFormService("headingNumberDisplayProvider")();
    const { state } = useQuickForm();

    return (
        <h1
            className={classNames(styles["heading"], className, label ? styles["num"] : "")}
            style={{ ...style, ...headingStyles }} >

            {shouldDisplayNumber &&
                <div style={rootStyles}>
                    {label}&nbsp;<ImArrowRightIcon size={"12px"} />
                </div>
            }

            {children}
        </h1>
    );
}

const rootStyles = {
    position: "absolute",
    left: 0,
    translate: "-110px",
    justifyContent: 'end',
    width: '100px',
    display: "flex",
    alignItems: "center",
    fontSize: "22px",
    top: "11px"
} as CSSProperties;