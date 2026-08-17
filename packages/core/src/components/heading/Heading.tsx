"use client";
import React, { ReactNode } from "react";
import { quickformtokens } from "../../style/quickFormTokensDefinition";
import { makeStyles, mergeClasses } from "@griffel/react";

type HeadingProps = {
    readonly children: ReactNode;
    readonly style?: React.CSSProperties;
    readonly className?: string;
    readonly label?: string;
    readonly isHtml?: boolean;
};

const useHeadingStyles = makeStyles({
    heading: {
        fontSize: quickformtokens.headlineFontSize,
        fontWeight: 'bold',
        color: quickformtokens.onSurface,
        position: "relative",
        //  display: 'flex',
        // alignItems: 'center',
        // CSS-reset from default margin on h1
        margin: 0
    }
});
export const Heading: React.FC<HeadingProps> = ({ children, label, style = {}, isHtml,className }: HeadingProps) => {

    const headingStyles = useHeadingStyles();


    if (typeof (children) === "string") {

        if(isHtml)
            return (
                <div className={mergeClasses(headingStyles.heading, className)}
                style={{ ...style }}
                dangerouslySetInnerHTML={{ __html:  children }}
            />
        );

        return (
            <h1 className={mergeClasses(headingStyles.heading, className)}
                style={{ ...style }}
                dangerouslySetInnerHTML={{ __html: isHtml?children: children.replace(/(?:\r\n|\r|\n)/g, '<br/>') }}
            />
        );
    }

    return (
        <h1 className={mergeClasses(headingStyles.heading, className)} style={{ ...style }}>
            {children}
        </h1>
    );
}