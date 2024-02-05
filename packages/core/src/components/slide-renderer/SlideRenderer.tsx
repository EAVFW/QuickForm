import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import { Button } from '../button/Button';
import { useHandleEnterKeypress } from '../../hooks';
import { Slide } from '../slide/Slide';



export const SlideRenderer: React.FC = () => {
    const { state, goToNextSlide } = useQuickForm();
    const currentSlide = state.slides[state.currIdx];

    const handleGoToNextSlideClicked = () => {
        // BIG TODO:
        // Validate model.Questions.. Are they all answered? Is all the output in correct form?
        // If yes, dispatch computeprogress and goToNextSlide
        goToNextSlide();
    }

    /* Listens to enter key pressed */
    const enterKeyDisabled = currentSlide.questions.some(q => q.inputType === "multilinetext");
    useHandleEnterKeypress("slide", enterKeyDisabled, handleGoToNextSlideClicked);
    console.log("currentSlide", currentSlide);

    return (
        <div
            id="SlideRenderer"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <Slide model={currentSlide} />
            <Button
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={handleGoToNextSlideClicked}
                showPressEnter={!enterKeyDisabled}
                children={"Næste"} />
        </div>
    );
};