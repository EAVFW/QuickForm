import { ReactNode } from "react";
import React from "react";
import { quickformtokens } from "../../style/quickFormTokensDefinition";
import { makeStyles } from "@griffel/react";


const useParagraphStyles = makeStyles({
    para: {
        color: quickformtokens.onSurface,
        fontSize: quickformtokens.paragraphFontSize,
        fontWeight: 'unset',
        lineHeight: '1.4em',
        marginTop: quickformtokens.gap1,
        '@media screen and (max-width: 599px)': { fontSize: quickformtokens.paragraphMobileFontSize },
    },

});


type ParagraphProps = {
    readonly children: ReactNode;
    style?: React.CSSProperties;
};

export const Paragraph: React.FC<ParagraphProps> = ({ style, children }: ParagraphProps) => {
    const styles = useParagraphStyles();

    if (typeof (children) === "string") {

        return (
            <p
                className={styles.para}
                style={style}
                dangerouslySetInnerHTML={{ __html: children.replace(/(?:\r\n|\r|\n)/g, '<br/>') }}
            />)
            ;
    }

    return <p className={styles.para} style={style}>{children}</p>;
}
