import React from 'react';

type ErrorMessageProps = {
    message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    if (!message) return null;

    const errorMessageStyle: React.CSSProperties = {
        color: 'red',
        textDecoration: 'underline',
        marginTop: '4px',
        fontSize: '1rem',
        fontWeight: 'bold',
    };

    return (
        <div style={errorMessageStyle}>
            {message}
        </div>
    );
}