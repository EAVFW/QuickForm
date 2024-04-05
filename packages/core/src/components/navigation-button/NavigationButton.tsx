"use client";
import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import { ArrowUpIcon, ArrowDownIcon } from '../icons';
import { quickformtokens } from '../../style/quickFormTokensDefinition';
import { makeStyles, mergeClasses } from "@griffel/react";

type NavigationButtonProps = {
    className?: string;
    style?: React.CSSProperties;
}

const useNavigationStyles = makeStyles({
    button: {
        ':hover': {
            stroke: quickformtokens.onBackground
        },
        stroke: quickformtokens.onBackground
    },
    icon: {

    },
    disabled: {
        stroke: quickformtokens.onBackground
    }
});
export const NavigationButton: React.FC<NavigationButtonProps> = ({ className, style }) => {
    const styles = useNavigationStyles();

    const { goToNextSlide, goToPrevSlide, state } = useQuickForm();
    if (state.isIntroSlide || state.isSubmitSlide || state.isEndingSlide) {
        return null;
    }

    const disablePrevBtn = !state.hasPrevSlide;
    const prevLabel = disablePrevBtn ? "No previous slide" : "Go to previous";
    const rightBtnStyling = {
        backgroundColor: quickformtokens.background,
        ...right,
        ...slideNavigationButton,
    }

    const disableNextBtn = !state.hasNextSlide;
    const nextLabel = disableNextBtn ? "No next slide" : "Go to next";
    const leftBtnStyling = {
        backgroundColor: quickformtokens.background,
        ...left,
        ...slideNavigationButton,
    }

    return (
        <div className={className} style={style}>
            <label title={prevLabel} style={leftBtnStyling} >
                <button className={styles.button}
                    disabled={disablePrevBtn}
                    style={leftBtnStyling}
                    onClick={goToPrevSlide}
                >
                    <ArrowUpIcon className={mergeClasses(styles.icon, disablePrevBtn && styles.disabled)} />
                </button>
            </label>

            <label title={nextLabel} style={rightBtnStyling}>
                <button className={styles.button}
                    disabled={disableNextBtn}
                    aria-label='Go to next'
                    style={rightBtnStyling}
                    onClick={goToNextSlide}
                >
                    <ArrowDownIcon className={mergeClasses(styles.icon, disableNextBtn && styles.disabled)} />
                </button>
            </label>
        </div >
    );
}

const slideNavigationButton: React.CSSProperties = {
    width: '50px',
    height: '100%',
    cursor: 'pointer',
    borderWidth: '1px'
};
const left: React.CSSProperties = {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    borderRight: 'none'
};
const right: React.CSSProperties = {
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    borderLeft: 'none'
};