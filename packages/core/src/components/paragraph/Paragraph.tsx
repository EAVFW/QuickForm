import { ReactNode } from "react";
import styles from "./Paragraph.module.css";
import React from "react";

type ParagraphProps = {
  readonly children: ReactNode;
  style?: React.CSSProperties;
};

export function Paragraph({ style, children }: ParagraphProps) {
  return <p className={styles["para"]} style={style ? style : {}}>{children}</p>;
}
