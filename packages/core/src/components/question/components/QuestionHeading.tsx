import React, { ReactNode } from "react";
import { ImArrowRightIcon } from "../../../components/icons";
import { useQuickForm } from "../../../state/QuickFormContext";
import { quickformtokens } from "../../../style/quickFormTokensDefinition";
import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../../services/QuickFormServices";


type QuestionHeadingProps = {
    readonly children: ReactNode;
    readonly style?: React.CSSProperties;
    readonly className?: string;
    readonly label?: string;
};

export const QuestionHeading: React.FC<QuestionHeadingProps> = ({ children, label, style = {} }: QuestionHeadingProps) => {

    const shouldDisplayNumber = resolveQuickFormService("headingNumberDisplayProvider")();

    const headingStyles: React.CSSProperties = {
        fontSize: quickformtokens.questionHeadlineFontSize,
        fontWeight: quickformtokens.questionHeadlineFontWeight,
        color: quickformtokens.onSurface,
        position: "relative",
        display: 'flex',
        alignItems: 'center',
        // CSS-reset from default margin on h1
        margin: 0
    };

    return (
        <h1 style={{ ...style, ...headingStyles }}>
            {shouldDisplayNumber && <div style={{
                marginRight: quickformtokens.gap1, fontSize: `calc( ${quickformtokens.questionNumberFontSize} * 0.85 )` ,
                position: 'absolute',
                left: '0px',
                translate: '-110px',
                justifyContent: 'end',
                width: '100px' ,
                display: 'flex',
                alignItems: 'center'   
            }}>
                <span style={{ marginRight: quickformtokens.gap1}}>{label}</span>
                <ImArrowRightIcon size="12px" />
            </div>}
            {children}
        </h1>
    );
}

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    let { state } = useQuickForm();
    if (state.enableQuestionNumbers) {
        return state.enableQuestionNumbers && !(state.isEndingSlide || state.isIntroSlide || state.isSubmitSlide)
    }
    return false;
}

registerQuickFormService("headingNumberDisplayProvider", defaultHeadingNumberDisplayProvider);