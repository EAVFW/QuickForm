import { ErrorPopup, quickformtokens, useQuickForm } from "@eavfw/quickform-core";
import { makeStyles, shorthands, mergeClasses } from "@griffel/react";
import React, { PropsWithChildren } from "react";
// import { Outfit } from "next/font/google";
// const outfit = Outfit({ subsets: ["latin"] });


const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: 'center',
        width: "100%",
        minWidth: "800px",
        maxWidth: "1080px",
        height: 'fit-content',
        ...shorthands.padding("20px", "20px", "20px", "20px"),
        ...shorthands.margin("20px", "0px"),
        ...shorthands.borderRadius("20px"),
        // borderRadius: '20px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    }
})

type QuickFormContainerProps = {
    title: string,
    subtitle: string,
}

export const QuickFormContainer: React.FC<PropsWithChildren<QuickFormContainerProps>> = ({ children, subtitle, title }) => {

    const styles = useStyles();
    const { state: { errorMsg }, cssVariables } = useQuickForm();
    return (
        <div id="QuickForm" className={mergeClasses(styles.root/*, outfit.className*/)} style={cssVariables}>
            <ErrorPopup message={errorMsg} />
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
            <div style={{ width: "95%", margin: "30px 0px 10px 0px" }}>
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