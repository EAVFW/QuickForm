"use client"

import { makeStaticStyles, makeStyles, mergeClasses, shorthands } from "@griffel/react"
import { CSSProperties, PropsWithChildren } from "react";
import { quickformtokens } from "../../style/QuickFormTokensDefinition";

const useQuickFormContainerStyles = makeStyles({
    root: {
        
        maxWidth: '72rem',
        width: '100%',
        '@media screen and (max-width: 599px)': { ...shorthands.padding(0, quickformtokens.gap4) },
        '@media screen and (max-width: 72rem)': { ...shorthands.padding(0, quickformtokens.gap4) },
    }
});

export const QuickFormContainer: React.FC<PropsWithChildren<{ style?: CSSProperties }>> = ({ children, style }) => {

    const styles = useQuickFormContainerStyles();
    
    return (
        <div className={styles.root} style = { style } >
            {children }
        </div>
    )
}