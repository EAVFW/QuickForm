"use client";
import React, { useState, useEffect } from 'react';
import { useQuickForm } from "../../state/QuickFormContext";
import { quickformtokens } from '../../style/quickFormTokensDefinition';

type ErrorPopupProps = {
    readonly message: string;
};

export const ErrorPopup: React.FC<ErrorPopupProps> = ({ message }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [opacity, setOpacity] = useState(0);
    const { dispatch } = useQuickForm();

    const resetErrorPopup = () => {
        dispatch({ type: 'SET_ERROR_MSG', msg: "" });
        setIsVisible(false);
        setOpacity(0);
    }

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (message) {
            setIsVisible(true);
            setOpacity(0);
            setTimeout(() => setOpacity(1), 10);

            timer = setTimeout(() => {
                resetErrorPopup();
            }, 30000);
        } else {
            resetErrorPopup();
        }

        return () => {
            clearTimeout(timer);
            setOpacity(0);
        };
    }, [message]);

    if (!isVisible) return null;

    const backdropStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    };

    const toastStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        borderRadius: '10px',
        backgroundColor: quickformtokens.error,
        color: quickformtokens.onError,
        fontSize: '16px',
        padding: '15px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        opacity: opacity,
        transition: 'opacity 0.5s ease-in',
    };

    const buttonContainerStyle: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginRight: '5px',
        marginBottom: '20px'
    }

    const buttonStyle: React.CSSProperties = {
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        fontSize: '16px',
        color: 'inherit'

    }

    return (
        <div style={backdropStyle}>
            <div style={toastStyle} onClick={(e) => e.stopPropagation()}>
                <div style={buttonContainerStyle}>
                    <button style={buttonStyle} onClick={resetErrorPopup}>X</button>
                </div>
                <div style={{
                    padding: '0px 20px 20px 20px'
                }}>
                    {message}
                </div>
            </div>
        </div>
    );
};