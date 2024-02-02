import styles from "./Button.module.css";
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
                style={buttonStyle}
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

const btnContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12.5px',
    marginTop: '16px',
};

const buttonStyle = {
    color: 'var(--on-surface)',
    backgroundColor: 'transparent',
    border: 'thin solid var(--on-surface)',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 700,
    padding: '10px 14px',
    // Hover, active, focus-visible styles cannot be directly applied as inline styles. Fix it with useState or similar if it is preffered to keep them as React.CSSProperties
};

const spanStyle = {
    color: 'var(--on-surface)',
    fontSize: '1.25rem',
};

const strongStyle = {
    fontWeight: 'bolder',
    letterSpacing: '0.04em',
};
