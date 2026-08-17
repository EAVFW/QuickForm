"use client";
import { ErrorPopup, quickformtokens, useQuickForm } from "../../index";
import { makeStyles, shorthands } from "@griffel/react";
import React, { PropsWithChildren } from "react";

const useStyles = makeStyles({
    root: {
        ...shorthands.padding("20px", "20px", "20px", "20px"),
        ...shorthands.margin("20px", "0px"),
        ...shorthands.borderRadius("20px"),
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        // backgroundColor: quickformtokens.background || "white"
    }
})

type ModernQuickFormContainerProps = {
    title: string,
    subtitle: string,
}

export const ModernQuickFormContainer: React.FC<PropsWithChildren<ModernQuickFormContainerProps>> = ({ children, subtitle, title }) => {

    const styles = useStyles();
    const { state: { errorMsg }, cssVariables } = useQuickForm();
    return (
        <div
            id="QuickForm"
            className={styles.root}
            style={cssVariables}
        >
            <ErrorPopup
                message={errorMsg}
            />
            <Headline
                text={title}
                fontWeight={800}
                color={quickformtokens.primary}
                lineHeight={1.2}
            />
            <Headline
                text={subtitle}
                fontWeight={300}
                color={"inherit"}
                lineHeight={1.1}
            />
            <div>
                {children}
            </div>
        </div >

    )
}

const Headline: React.FC<{ text: string, fontWeight: number, color: string, lineHeight: number }> = ({ text, fontWeight, color, lineHeight }) => {
    return (
        <h1
            style={
                {
                    textAlign: "center",
                    fontSize: "36px",
                    fontWeight: fontWeight,
                    color: color,
                    lineHeight: lineHeight,
                    margin: 0
                }
            }>
            {text}
        </h1>
    )
}