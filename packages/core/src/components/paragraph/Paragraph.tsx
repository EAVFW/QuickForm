import { ReactNode } from "react";
import styles from "./Paragraph.module.css";
import React from "react";
import { quickformtokens } from "../../style/quickFormTokensDefinition";


type ParagraphProps = {
    readonly children: ReactNode;
    style?: React.CSSProperties;
};

export const Paragraph: React.FC<ParagraphProps> = ({ style, children }: ParagraphProps) => {

    const paragraphStyles = {
        fontSize: quickformtokens.questionParagraphFontSize, //'1.5rem',
        marginTop: quickformtokens.gap2,
        ...style ?? {}
    }

    if (typeof (children) === "string")
        return <p className={styles["para"]}
            style={paragraphStyles}
            dangerouslySetInnerHTML={{ __html: children.replace(/(?:\r\n|\r|\n)/g, '<br/>') }} />;

    return <p className={styles["para"]} style={paragraphStyles}>{children}</p>;
}
