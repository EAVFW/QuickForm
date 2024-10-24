import React from 'react';
import { useQuickForm } from '../../../../core/src/state/QuickFormContext';
import { isSlideAnswered } from '@eavfw/quickform-core/src/utils/quickformUtils';

export const OverviewList = () => {
    const { state, goToSlide } = useQuickForm();

    if (state.isIntroSlide || state.isSubmitSlide || state.isEndingSlide) return null;

    const handleOnQuestionClicked = (slideIndex: number) => {
        goToSlide(slideIndex);
    };

    return (
        <div style={overviewStyle}>
            <ol style={listStyle}>
                {state.slides.map((slide, slideIndex) =>
                    <li
                        key={slideIndex}
                        style={listItemStyle}
                        title={"Go to slide" + slideIndex + 1}
                        onClick={() => handleOnQuestionClicked(slideIndex)}
                    >
                        <span style={linkStyle}>
                            {slideIndex + 1}. {slide.displayName}
                        </span>
                        {isSlideAnswered(slide) && (
                            <span style={{ ...checkIconStyle, opacity: 1 }}>✔</span>
                        )}
                    </li>
                )}
            </ol>
        </div>
    );
};

const overviewStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
};

const listStyle: React.CSSProperties = {
    listStyleType: 'none',
    margin: 0,
    padding: '0 20px',
    overflowY: 'auto',
};

const listItemStyle: React.CSSProperties = {
    padding: '8px 0',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const linkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'inherit'
};

const checkIconStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    marginLeft: '10px',
};