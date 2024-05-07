import React, { ReactNode } from "react";
import { quickformtokens } from "../../style/quickFormTokensDefinition";

type HeadingProps = {
    readonly children: ReactNode;
    readonly style?: React.CSSProperties;
    readonly className?: string;
    readonly label?: string;
};

export const Heading: React.FC<HeadingProps> = ({ children, label, style = {} }: HeadingProps) => {

    const headingStyles: React.CSSProperties = {
        fontSize: quickformtokens.headlineFontSize,
        fontWeight: 'bold',
        color: quickformtokens.onSurface,
        position: "relative",
        display: 'flex',
        alignItems: 'center',
        // CSS-reset from default margin on h1
        margin: 0
    };

    return (
        <h1 style={{ ...style, ...headingStyles }}>
            {children}
        </h1>
    );
}