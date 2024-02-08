import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import { Button } from '../button/Button';
import { useHandleEnterKeypress } from '../../hooks';
import { Slide } from '../slide/Slide';


export const SlideRenderer: React.FC = () => {
    const { state, goToNextSlide, answerQuestion } = useQuickForm();
    const currentSlide = state.slides[state.currIdx];
    // const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

    // useEffect(() => {
    //     // This effect runs whenever currentSlide changes, to reset our check.
    //     setAllQuestionsAnswered(currentSlide.isAnswered);
    // }, [currentSlide]);

    // useEffect(() => {
    //     // This effect attempts to navigate to the next slide if all questions are answered.
    //     if (allQuestionsAnswered) {
    //         goToNextSlide();
    //     }
    // }, [allQuestionsAnswered, goToNextSlide]);

    const handleGoToNextSlideClicked = () => {
        for (var q of currentSlide.questions) {
            if (typeof q.output !== "undefined" && q.output !== "") {
                answerQuestion(q.logicalName!, q.output);
            }
        }

        // // Check outside the loop, after state has a chance to update
        // const allAnswered = !currentSlide.questions.some(q => q.answered === false);
        // setAllQuestionsAnswered(allAnswered);

        // if (!allAnswered) {
        //     console.log("Not all question have been answered on slide: ", currentSlide);
        // } else {
        //     console.log("All questions answered for slide: ", currentSlide);
        //     // We no longer directly call goToNextSlide here
        // }
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
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'start'}}
                onClick={handleGoToNextSlideClicked}
                showPressEnter={!enterKeyDisabled}
                children={"Ok"} />
        </div>
    );
};