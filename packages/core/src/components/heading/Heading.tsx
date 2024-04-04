import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../services/QuickFormServices";
import { useQuickForm } from "../../state/QuickFormContext";
import { ImArrowRightIcon } from "../../components/icons";
import React from "react";
import { ReactNode } from "react";
import { quickformtokens } from "../../style/quickformtokens";


type HeadingProps = {
    readonly children: ReactNode;
    readonly style?: React.CSSProperties;
    readonly className?: string;
    readonly label?: string;
};

export const Heading: React.FC<HeadingProps> = ({ children, label, style = {} }: HeadingProps) => {

    const shouldDisplayNumber = resolveQuickFormService("headingNumberDisplayProvider")();

    const headingStyles: React.CSSProperties = {
        fontSize: quickformtokens.questionTextFontSize, //'1.5rem',
        fontWeight: 'unset',
        color: 'var(--on-surface)',
        position: "relative"
    }

    return (
        <h1 style={{ ...style, ...headingStyles }}>
            {shouldDisplayNumber && <span style={{ //TODO - if mobile left 0, top:-2.4rem,justifycontext start
                display: 'inline-flex', alignItems: 'center', gap: quickformtokens.gap1, position: "absolute", width: "100px", left: "-100px", justifyContent: "end",
                fontSize: quickformtokens.questionQuestionNumberFontSiez,
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