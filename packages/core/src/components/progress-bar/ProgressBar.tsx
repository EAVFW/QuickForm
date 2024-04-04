import React from "react";
import styles from "./ProgressBar.module.css";

type ProgressBarProps = {
  readonly width?: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ width }: ProgressBarProps) => {
  return (
    <div className={styles["progress-bar__path"]}>
      <div
        className={styles["progress-bar"]}
        style={{ width: `${width ?? 0}%` }}
      />
    </div>
  );
}
