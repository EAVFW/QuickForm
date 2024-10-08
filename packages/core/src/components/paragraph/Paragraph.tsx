"use client";
import { ReactNode } from "react";
import React from "react";
import { quickformtokens } from "../../style/quickFormTokensDefinition";
import { makeStyles, shorthands } from "@griffel/react";


const useParagraphStyles = makeStyles({
    para: {
        color: quickformtokens.onSurface,
        fontSize: quickformtokens.questionParagraphFontSize,
        fontWeight: 'unset',
        //lineHeight: quickformtokens.questionParagraphFontSize, // '1.4em',
        ...shorthands.margin(0, 0, quickformtokens.gap1, 0),
        '@media screen and (max-width: 599px)': { fontSize: quickformtokens.paragraphMobileFontSize },
    },

});


type ParagraphProps = {
    readonly children: ReactNode;
    style?: React.CSSProperties;
    isHtml?: boolean;
};

export const Paragraph: React.FC<ParagraphProps> = ({ style, children,isHtml }: ParagraphProps) => {
    const styles = useParagraphStyles();

    if (typeof (children) === "string") {

        return (
            <p
                className={styles.para}
                style={style}
                dangerouslySetInnerHTML={{ __html: isHtml ? children: children.replace(/(?:\r\n|\r|\n)/g, '<br/>') }}
            />
        );
    }

    return <p className={styles.para} style={style}>{children}</p>;
}
