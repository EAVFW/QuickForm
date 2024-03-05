"use client";
import React, { PropsWithChildren } from "react";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import { quickformtokens } from "../../style/quickformtokens";

type BtnContainerProps = {
    readonly className?: string;
    readonly style?: React.CSSProperties;
   
    readonly disabled?: boolean;
    readonly showPressEnter?: boolean;
    readonly onClick?: MouseEventHandler;
    visible?: boolean;
};

export const Button: React.FC<PropsWithChildren< BtnContainerProps>> = ({ children, showPressEnter, onClick, disabled, visible, style }) => {
    const [hover, setHover] = useState<boolean>(false);

    if (typeof visible !== "undefined" && visible === false) {
        return (<></>);
    }

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
        <div style={{ ...btnContainerStyle }}>
            <button
                style={{ ...buttonStyle, ...style, ...hover ? hoverStyle : {} }}
                disabled={disabled}
                type="button"
                onClick={onClick}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
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

const btnContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12.5px',

    marginTop: '30px',
    //marginTop: '16px',

};

const buttonStyle = {
    color: quickformtokens.onSurface,
    backgroundColor: quickformtokens.primary,
    border: `thin solid ${quickformtokens.primary}`,
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '2rem',
    fontWeight: 700,
    padding: '10px 14px',
};

const spanStyle = {
    color: quickformtokens.onSurface,
    fontSize: '1.25rem',
};

const strongStyle = {
    fontWeight: 'bolder',
    letterSpacing: '0.04em',
};

const hoverStyle: React.CSSProperties = {
    color: quickformtokens.white,
    backgroundColor: quickformtokens.primaryLighter
}
