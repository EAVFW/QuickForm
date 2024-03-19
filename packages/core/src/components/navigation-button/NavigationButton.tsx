"use client";
import React, { useState } from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import { ArrowUpIcon } from '../icons/ArrowUpIcon';
import { ArrowDownIcon } from '../icons/ArrowDownIcon';
import { quickformtokens } from '../../style/quickformtokens';
import { makeStyles, mergeClasses } from "@griffel/react";
interface Props {
    className?: string;
    style?: React.CSSProperties;
}

const useNavigationStyles = makeStyles({

    button: {
        ':hover': {
            stroke: quickformtokens.onBackgroundDarker300
        },
        stroke: quickformtokens.onBackground
    },
    icon: {

    },
    disabled: {
        stroke: quickformtokens.onBackgroundDarker800
    }
});
export const NavigationButton: React.FC<Props> = ({ className, style }) => {
    const styles = useNavigationStyles();

    const { goToNextSlide, goToPrevSlide, state } = useQuickForm();
    // const [leftHover, setLeftHover] = useState<boolean>(false);
    // const [rightHover, setRightHover] = useState<boolean>(false);
    if (state.isIntroSlide || state.isSubmitSlide || state.isEndingSlide) {
        return null;
    }

    const disablePrevBtn = !state.hasPrevSlide;
    const prevLabel = disablePrevBtn ? "No previous slide" : "Go to previous";
    const rightBtnStyling = {
        backgroundColor: quickformtokens.background,
        ...right,
        ...slideNavigationButton,
        // ...(rightHover ? hover : {})
    }

    const disableNextBtn = !state.hasNextSlide;
    const nextLabel = disableNextBtn ? "No next slide" : "Go to next";
    const leftBtnStyling = {
        backgroundColor: quickformtokens.background,
        ...left,

        ...slideNavigationButton,
        //  ...(leftHover ? hover : {})
    }

    return (
        <div className={className} style={style}>
            <label title={prevLabel} style={leftBtnStyling} >
                <button className={styles.button}
                    disabled={disablePrevBtn}
                    // onMouseEnter={() => setLeftHover(true)}
                    //  onMouseLeave={() => setLeftHover(false)}
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

                    //  onMouseEnter={() => setRightHover(true)}
                    //  onMouseLeave={() => setRightHover(false)}
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
    //  border: 'none',
    cursor: 'pointer',
    borderWidth: '1px'
};
const left: React.CSSProperties = {
    borderTopLeftRadius: '10px',
    borderBottomLeftRadius: '10px',
    //  border: `1px solid ${quickformtokens.onSurface}`,
    borderRight: 'none'
};
const right: React.CSSProperties = {
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    borderLeft: 'none'
};
const hover: React.CSSProperties = {
    //   backgroundColor: quickformtokens.onBackgroundDarker
};
