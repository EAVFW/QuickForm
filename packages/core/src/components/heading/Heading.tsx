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
        fontSize: quickformtokens.questionTextFontSize,
        fontWeight: 'unset',
        color: quickformtokens.onSurface,
        position: "relative"
    }

    return (
        <h1 style={{ ...style, ...headingStyles }}>
            {shouldDisplayNumber && <span style={{ //TODO - if mobile left 0, top:-2.4rem,justifycontext start
                display: 'inline-flex', alignItems: 'center', gap: quickformtokens.gap1, position: "absolute", width: "100px", left: "-100px", justifyContent: "end",
                fontSize: quickformtokens.questionNumberFontSize,
                height: "100%",
                paddingRight: quickformtokens.gap2
            }}>

                <span>{label}</span>
                <ImArrowRightIcon size="12px" />

            </span>
            }
            {children}
        </h1>
    );


}

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    let { state } = useQuickForm();
    return !(state.isEndingSlide || state.isIntroSlide || state.isSubmitSlide)
}
registerQuickFormService("headingNumberDisplayProvider", defaultHeadingNumberDisplayProvider);