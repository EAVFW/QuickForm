"use client";
import { makeStyles, mergeClasses, shorthands } from "@griffel/react"
import { CSSProperties, PropsWithChildren } from "react";
import { quickformtokens } from "../../style/quickFormTokensDefinition";

const useQuickFormContainerStyles = makeStyles({
    root: {
        maxWidth: '72rem',
        width: '100%',
        '@media screen and (max-width: 599px)': { ...shorthands.padding(0, quickformtokens.gap4) },
        '@media screen and (max-width: 72rem)': { ...shorthands.padding(0, quickformtokens.gap4) },
    }
});

export const QuickFormContainer: React.FC<PropsWithChildren<{ style?: CSSProperties, className?: string }>> = ({ children, style, className }) => {

    const styles = useQuickFormContainerStyles();

    return (
        <div className={mergeClasses(styles.root, className)} style={style} >
            {children}
        </div>
    )
}