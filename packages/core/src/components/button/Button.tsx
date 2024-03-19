"use client";
import React, { PropsWithChildren } from "react";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { quickformtokens } from "../../style/quickformtokens";
import { makeStyles, shorthands } from "@griffel/react";

type BtnContainerProps = {
    readonly className?: string;
    readonly style?: React.CSSProperties;
   
    readonly disabled?: boolean;
    readonly showPressEnter?: boolean;
    readonly onClick?: MouseEventHandler;
    visible?: boolean;
};

const useButtonStyles = makeStyles({
    container: {
        display: 'flex',
        alignItems: 'center',
        ...shorthands.gap( '12.5px'),

        marginTop: '30px',
    },
    button: {
        color: quickformtokens.onSurface,
        backgroundColor: quickformtokens.primary,
        ...shorthands.border('thin','solid',quickformtokens.primary),
        ...shorthands.borderRadius('8px'),
        cursor: 'pointer',
        fontSize: '2rem',
        fontWeight: 700,
        ...shorthands.padding('10px', '14px'),
        ':hover': {
            color: quickformtokens.white,
            backgroundColor: quickformtokens.primaryLighter
        }
    }
})

export const Button: React.FC<PropsWithChildren< BtnContainerProps>> = ({ children, showPressEnter, onClick, disabled, visible, style }) => {
   

    if (typeof visible !== "undefined" && visible === false) {
        return (<></>);
    }
    const styles = useButtonStyles();
    const [isOnMobile, setIsOnMobile] = useState(false);
    useEffect(() => {
        if (navigator?.userAgent.toLowerCase().includes("mobile")) {
            setIsOnMobile(true);
        }

        const handleResizeEvent = () => {
            setIsOnMobile(navigator?.userAgent.toLowerCase().includes("mobile"));
        };

        window.addEventListener("resize", handleResizeEvent);
        return () => {
            window.removeEventListener("resize", handleResizeEvent);
        };
    }, []);

    return (
        <div className={styles.container}>
            <button
                className={styles.button}
                style={style}
                disabled={disabled}
                type="button"
                onClick={onClick}
               
            >
                {children}

            </button>
            {!disabled && !isOnMobile && showPressEnter && (
                <span style={spanStyle}>
                    <>Tryk <strong style={strongStyle}>Enter ↵</strong></>
                </span>
            )}
        </div>
    );
}

 
const spanStyle = {
    color: quickformtokens.onSurface,
    fontSize: '1.25rem',
};

const strongStyle = {
    fontWeight: 'bolder',
    letterSpacing: '0.04em',
};
 