import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import { Button } from '../button/Button';
import { useHandleEnterKeypress } from '../../hooks';
import { Slide } from '../slide/Slide';


export const SlideRenderer: React.FC = () => {
    const { state, answerQuestion } = useQuickForm();
    const currentSlide = state.slides[state.currIdx];

    /* If all questions are answered, goToNextSlide() is called by the answerQuestion function (dispatch) */
    const handleGoToNextSlideClicked = () => {
        for (var q of currentSlide.questions) {
            if (typeof q.output !== "undefined" && q.output !== "") {
                answerQuestion(q.logicalName!, q.output);
            }
        }
    };

    /* Listens to enter key pressed */
    const enterKeyDisabled = currentSlide.questions.some(q => q.inputType === "multilinetext");
    useHandleEnterKeypress("slide", enterKeyDisabled, handleGoToNextSlideClicked);
    console.log("SlideRenderer: currentSlide", currentSlide);

    return (
        <div
            id="SlideRenderer"
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            <Slide model={currentSlide} />
            <Button
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
                onClick={handleGoToNextSlideClicked}
                showPressEnter={!enterKeyDisabled}
                children={"Ok"} />
        </div>
    );
};