import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../services/QuickFormServices";
import { useQuickForm } from "../../state/QuickFormContext";
import { ImArrowRightIcon } from "../../components/icons";
import React, { CSSProperties } from "react";
import classNames from "classnames";
import { ReactNode } from "react";

type HeadingProps = {
    readonly children: ReactNode;
    readonly style?: React.CSSProperties;
    readonly className?: string;
    readonly label?: string;
};

export function Heading({ children, label, style = {} }: HeadingProps) {

    const shouldDisplayNumber = resolveQuickFormService("headingNumberDisplayProvider")();

    const headingStyles: React.CSSProperties = {
        fontSize: '1.5rem',
        fontWeight: 'unset',
        color: 'var(--on-surface)',
    }

    console.log("shouldDisplayNumber", shouldDisplayNumber);

    return (
        <h1 style={{ ...style, ...headingStyles }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                {shouldDisplayNumber && <ImArrowRightIcon size="12px" />}
                {shouldDisplayNumber && <span style={{ marginLeft: '4px', marginRight: '4px' }}>{label}</span>}
                {children}
            </span>
        </h1>
    );


}

const rootStyles: CSSProperties = {
    position: "absolute",
    left: 0,
    translate: "-110px",
    justifyContent: 'end',
    width: '100px',
    display: "flex",
    alignItems: "center",
    fontSize: "22px",
    top: "11px"
};

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    let { state } = useQuickForm();
    return !(state.isEndingSlide || state.isIntroSlide || state.isSubmitSlide)
}
registerQuickFormService("headingNumberDisplayProvider", defaultHeadingNumberDisplayProvider);