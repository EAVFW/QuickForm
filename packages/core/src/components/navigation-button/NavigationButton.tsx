"use client";
import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import { ArrowUpIcon, ArrowDownIcon } from '../icons';
import { quickformtokens } from '../../style/quickFormTokensDefinition';
import { makeStyles, mergeClasses, shorthands } from "@griffel/react";
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { ArrowRightIcon } from '../icons/ArrowRightIcon';

type NavigationButtonProps = {
    className?: string;
    style?: React.CSSProperties;
    horizontal?: boolean;
}

const useNavigationStyles = makeStyles({
    button: {
        width: '50px',
        height: '100%',
        cursor: 'pointer',
        ...shorthands.borderWidth('1px'),
        ...shorthands.borderColor(quickformtokens.primary),
        stroke: quickformtokens.onPrimary,
        backgroundColor: quickformtokens.primary,
        ':hover': {
            stroke: quickformtokens.primary,
            backgroundColor: quickformtokens.onPrimary
        },
    },
    icon: {
        stroke: quickformtokens.primary,
        ':hover': {
            stroke: quickformtokens.onPrimary,
            backgroundColor: quickformtokens.primary
        },
    },
    disabled: {
        backgroundColor: quickformtokens.primaryDarker400,
        ':hover': {
            stroke: quickformtokens.onPrimary,
            backgroundColor: quickformtokens.primary,
        },
    },
    left: {
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        ...shorthands.borderRight('none')
    },
    right: {
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        ...shorthands.borderLeft('none')
    },
});

export const NavigationButton: React.FC<NavigationButtonProps> = ({ className, style, horizontal }) => {
    const styles = useNavigationStyles();

    const { goToNextSlide, goToPrevSlide, state } = useQuickForm();
    if (state.isIntroSlide || state.isSubmitSlide || state.isEndingSlide) {
        return null;
    }

    const disablePrevBtn = !state.hasPrevSlide;
    const prevLabel = disablePrevBtn ? "No previous slide" : "Go to previous";

    const disableNextBtn = !state.hasNextSlide;
    const nextLabel = disableNextBtn ? "No next slide" : "Go to next";

    return (
        <div className={className} style={style}>
            <label title={prevLabel} >
                <button
                    aria-label='Go to previous'
                    className={mergeClasses(styles.button, styles.left, disablePrevBtn && styles.disabled)}
                    disabled={disablePrevBtn}
                    onClick={goToPrevSlide}
                >
                    {horizontal ?
                        <ArrowLeftIcon  />
                        :
                        <ArrowDownIcon  />
                    }
                </button>
            </label>

            <label title={nextLabel} >
                <button
                    aria-label='Go to next'
                    className={mergeClasses(styles.button, styles.right, disableNextBtn && styles.disabled)}
                    disabled={disableNextBtn}
                    onClick={goToNextSlide}
                >
                    {horizontal ?
                        <ArrowRightIcon  />
                        :
                        <ArrowUpIcon   />
                    }
                </button>
            </label>
        </div >
    );
}