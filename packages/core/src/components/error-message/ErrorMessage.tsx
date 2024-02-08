"use client";
import React, { useState, useEffect } from 'react';
import { useDelayedClickListener } from "../../hooks";
import { useQuickForm } from "../../state/QuickFormContext";

type ErrorProps = {
  readonly message: string;
};

export const ErrorMessage: React.FC<ErrorProps> = ({ message }: ErrorProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const { dispatch } = useQuickForm();

  useDelayedClickListener(() => dispatch({ type: "SET_ERROR_MSG", msg: "" }));

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
    color: 'var(--error)',
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
