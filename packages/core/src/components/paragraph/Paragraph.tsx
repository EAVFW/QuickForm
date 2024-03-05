import { ReactNode } from "react";
import styles from "./Paragraph.module.css";
import React from "react";
import { quickformtokens } from "../../style/quickformtokens";


type ParagraphProps = {
  readonly children: ReactNode;
  style?: React.CSSProperties;
};

export function Paragraph({ style, children }: ParagraphProps) {

    const paragraphStyles = {
        fontSize: quickformtokens.questionParagraphFontSize, //'1.5rem',
        marginTop: quickformtokens.gap2,
        ...style ?? {}
    }
    return <p className={styles["para"]} style={paragraphStyles}>{children}</p>;
}
