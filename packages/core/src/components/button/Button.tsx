"use client";
import React from "react";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";

type BtnContainerProps = {
    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly children: ReactNode;
    readonly disabled?: boolean;
    readonly showPressEnter?: boolean;
    readonly onClick?: MouseEventHandler;
    visible?: boolean;
};

export const Button: React.FC<BtnContainerProps> = ({ children, showPressEnter, onClick, disabled, visible, style }: BtnContainerProps) => {
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
        <div style={{ ...btnContainerStyle, ...style }}>
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

    margin: '30px',
    marginTop: '16px',

};

const buttonStyle = {
    color: 'var(--on-surface)',
    backgroundColor: 'transparent',
    border: 'thin solid var(--on-surface)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.5rem',
    fontWeight: 700,
    padding: '10px 14px',
};

const spanStyle = {
    color: 'var(--on-surface)',
    fontSize: '1.25rem',
};

const strongStyle = {
    fontWeight: 'bolder',
    letterSpacing: '0.04em',
};

const hoverStyle: React.CSSProperties = {
    color: 'var(--white)',
    backgroundColor: 'var(--primary)'
}
