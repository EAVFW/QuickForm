"use client";
import React, { useState, useEffect } from 'react';
import { useDelayedClickListener } from "../../hooks";
import { useQuickForm } from "../../state/QuickFormContext";
import { quickformtokens } from '../../style/quickFormTokensDefinition';

type ErrorPopupProps = {
    readonly message: string;
};

export const ErrorPopup: React.FC<ErrorPopupProps> = ({ message }: ErrorPopupProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const { dispatch, state } = useQuickForm();

    /**
     *  DISCUSS - What cases is there for resetting error and can it be handled in reducer all alone?. 
     *  When an error is shown, upon next answer it can be cleared.
     * Possible a dissmis button - but i dont think it should automatically just remove when clicked.
     */


    //const resetErrorMessage = () => {
    //    if (state.errorMsg !== "") {
    //        dispatch({ type: "SET_ERROR_MSG", msg: "" })
    //    }
    //}

   // useDelayedClickListener(resetErrorMessage);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 350);
        }
    }, [message]);

    if (message === "") {
        return <></>;
    }

    const errorStyle: React.CSSProperties = {
        alignItems: 'flex-end',
        animation: isVisible ? 'slide-up 0.35s linear 1 forwards' : '',
        backgroundColor: 'var(--surface)',
        borderRadius: '3px',
        color: quickformtokens.onError,
        display: 'flex',
        fontSize: '1.5rem',
        marginTop: '15px',
        padding: '8px 12px',
        width: 'max-content',
    };

    const mobileErrorStyle: React.CSSProperties = {
        ...errorStyle,
        fontSize: '1.75rem',
        marginTop: '22px',
        width: '100%',
    };

    const imgStyle: React.CSSProperties = {
        marginRight: '4px',
    };

    return (
        <div style={window.innerWidth <= 599 ? mobileErrorStyle : errorStyle}>
            {/* If there's an image you want to include inside the error message */}
            {/* <img src="path_to_your_image" alt="Error" style={imgStyle} /> */}
            {message}
        </div>
    );
};
