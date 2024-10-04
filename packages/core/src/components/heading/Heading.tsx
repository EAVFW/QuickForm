import React, { ReactNode } from "react";
import { quickformtokens } from "../../style/quickFormTokensDefinition";

type HeadingProps = {
    readonly children: ReactNode;
    readonly style?: React.CSSProperties;
    readonly className?: string;
    readonly label?: string;
    readonly isHtml?: boolean;
};

export const Heading: React.FC<HeadingProps> = ({ children, label, style = {}, isHtml }: HeadingProps) => {

    const headingStyles: React.CSSProperties = {
        fontSize: quickformtokens.headlineFontSize,
        fontWeight: 'bold',
        color: quickformtokens.onSurface,
        position: "relative",
      //  display: 'flex',
       // alignItems: 'center',
        // CSS-reset from default margin on h1
        margin: 0
    };


    if (typeof (children) === "string") {

        if(isHtml)
            return (
                <div
                style={{ ...style, ...headingStyles }}
                dangerouslySetInnerHTML={{ __html:  children }}
            />
        );

        return (
            <h1
                style={{ ...style, ...headingStyles }}
                dangerouslySetInnerHTML={{ __html: isHtml?children: children.replace(/(?:\r\n|\r|\n)/g, '<br/>') }}
            />
        );
    }

    return (
        <h1 style={{ ...style, ...headingStyles }}>
            {children}
        </h1>
    );
}