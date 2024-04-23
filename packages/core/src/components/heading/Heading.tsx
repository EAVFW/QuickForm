import React, { ReactNode } from "react";
import { ImArrowRightIcon } from "../../components/icons";
import { useQuickForm } from "../../state/QuickFormContext";
import { quickformtokens } from "../../style/quickFormTokensDefinition";
import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../services/QuickFormServices";

type HeadingProps = {
    readonly children: ReactNode;
    readonly style?: React.CSSProperties;
    readonly className?: string;
    readonly label?: string;
};

export const Heading: React.FC<HeadingProps> = ({ children, label, style = {} }: HeadingProps) => {

    const shouldDisplayNumber = resolveQuickFormService("headingNumberDisplayProvider")();

    const headingStyles: React.CSSProperties = {
        fontSize: quickformtokens.headlineFontSize,
        fontWeight: 'bold',
        color: quickformtokens.onSurface,
        position: "relative",
        display: 'flex',
        alignItems: 'center'
    };

    return (
        <h1 style={{ ...style, ...headingStyles }}>
            {shouldDisplayNumber && <span style={{ marginRight: quickformtokens.gap1, fontSize: quickformtokens.questionNumberFontSize, }}>
                <span style={{ marginRight: '5px' }}>{label}</span>
                <ImArrowRightIcon size="12px" />
            </span>}
            {children}
        </h1>
    );
}

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    let { state } = useQuickForm();
    return !(state.isEndingSlide || state.isIntroSlide || state.isSubmitSlide)
}

registerQuickFormService("headingNumberDisplayProvider", defaultHeadingNumberDisplayProvider);