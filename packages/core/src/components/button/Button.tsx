"use client";
import styles from "./Button.module.css";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import classNames from "classnames";

type BtnContainerProps = {
    readonly className?: string;
    readonly style?: React.CSSProperties;
    readonly children: ReactNode;
    readonly disabled?: boolean;
    readonly showPressEnter?: boolean;
    readonly onClick?: MouseEventHandler;
    visible?: boolean;
};

export function Button({ children, showPressEnter, className, onClick, disabled, visible, style }: BtnContainerProps) {

    if (visible !== undefined && visible === false) {
        return (<></>);
    }
    if (disabled) {
        return (<div>Denne er lukket</div>);
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
        <div className={classNames(styles["btn-container"], className)} style={style ? style : {}}>
            <button disabled={disabled} type="button" onClick={onClick}>
                {children}
            </button>
            {!disabled && !isOnMobile && showPressEnter && (
                <span>
                    <>Tryk <strong>Enter ↵</strong></>
                </span>
            )}
        </div>
    );
}
