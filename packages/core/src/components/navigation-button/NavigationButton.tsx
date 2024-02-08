"use client";
import React, { useState } from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';

interface Props {
    className?: string;
    style?: React.CSSProperties;
}

export const NavigationButton: React.FC<Props> = ({ className, style }) => {
    const { goToNextSlide, goToPrevSlide, state } = useQuickForm();
    const [leftHover, setLeftHover] = useState<boolean>(false);
    const [rightHover, setRightHover] = useState<boolean>(false);
    if (state.isIntroSlide || state.isSubmitSlide || state.isEndingSlide) {
        return null;
    }

    const disablePrevBtn = !state.hasPrevSlide;
    const prevLabel = disablePrevBtn ? "No previous slide" : "Go to previous";
    const rightBtnStyling = {
        ...right,
        ...slideNavigationButton,
        ...(rightHover ? hover : {})
    }

    const disableNextBtn = !state.hasNextSlide;
    const nextLabel = disableNextBtn ? "No next slide" : "Go to next";
    const leftBtnStyling = {
        ...left,
        ...slideNavigationButton,
        ...(leftHover ? hover : {})
    }

    return (
        <div className={className} style={style}>
            <label title={prevLabel} style={leftBtnStyling} >
                <button
                    disabled={disablePrevBtn}
                    onMouseEnter={() => setLeftHover(true)}
                    onMouseLeave={() => setLeftHover(false)}
                    style={leftBtnStyling}
                    onClick={goToPrevSlide}
                >
                    <ArrowDownIcon />
                </button>
            </label>

            <label title={nextLabel} style={rightBtnStyling}>
                <button
                    disabled={disableNextBtn}
                    aria-label='Go to next'

                    onMouseEnter={() => setRightHover(true)}
                    onMouseLeave={() => setRightHover(false)}
                    style={rightBtnStyling}
                    onClick={goToNextSlide}
                >
                    <ArrowUpIcon />
                </button>
            </label>
        </div >
    );
}

const slideNavigationButton: React.CSSProperties = {
    width: '50px',
    height: '100%',
    border: 'none',
    cursor: 'pointer',
};
const left: React.CSSProperties = {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
};
const right: React.CSSProperties = {
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
};
const hover: React.CSSProperties = {
    backgroundColor: 'var(--hover)',
};
