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

    const disableRightBtn = !state.hasPrevSlide;
    const rightLabel = disableRightBtn ? "No previous slide" : "Go to previous";
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
        <div style={slideNavigation}>
            <label title={rightLabel} style={leftBtnStyling} >
                <button
                    disabled={disableRightBtn}
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

/* CSS Styling */
const slideNavigation: React.CSSProperties = {
    width: '100px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'end',
    marginRight: '10px',
    borderRadius: '50px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backgroundColor: 'var(--surface)',
};
const slideNavigationButton: React.CSSProperties = {
    width: '50px',
    height: '100%',
    border: 'none',
    cursor: 'pointer',
};
const left: React.CSSProperties = {
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
};
const right: React.CSSProperties = {
    borderTopRightRadius: '50px',
    borderBottomRightRadius: '50px',
};
const hover: React.CSSProperties = {
    backgroundColor: 'var(--hover)',
};
