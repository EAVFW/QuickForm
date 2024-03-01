import React from 'react';
import { useQuickForm } from '../../../state/QuickFormContext';
import { Button } from '../../button/Button';
import { useHandleEnterKeypress } from '../../../hooks';
import { Slide } from '../../slide/Slide';


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

    return (
        <div id="SlideRenderer" style={slideStyling}        >
            <Slide model={currentSlide} />
            <Button
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
                onClick={handleGoToNextSlideClicked}
                showPressEnter={!enterKeyDisabled}
                children={"Ok"} />
        </div>
    );
};

const slideStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
}


// enum ViewStatus {
//     InView,
//     TransitioningOut,
//     OutOfView,
//     TransitioningIn
// }

// const animationTimerSetting = 300;
// const useTransitionState = () => {
//     const [viewStatus, setViewStatus] = useState(ViewStatus.OutOfView);
//     // const { questionNumber } = useCurrentQuestion();
//     const questionBoxClasses = classNames(styles['question-box'], {
//         [styles['slide-out']]: viewStatus === ViewStatus.TransitioningOut,
//         [styles['slide-in']]: viewStatus === ViewStatus.TransitioningIn,
//         [styles['rendered']]: viewStatus === ViewStatus.InView,

//     });

//     useEffect(() => {

//         setViewStatus(ViewStatus.TransitioningIn);
//         setTimeout(() => {

//             setViewStatus(ViewStatus.InView);
//         }, animationTimerSetting);
//     }, []);
//     // }, [questionNumber]);

//     return {
//         questionBoxClasses,
//         transitionOut: (onComplete?: () => void) => {
//             setViewStatus(ViewStatus.TransitioningOut);
//             if (onComplete) {
//                 setTimeout(() => {
//                     onComplete();
//                 }, animationTimerSetting);
//             }
//         }
//     }
// }


// const handleQuestionNextBtnClick = () => {

//         /**
//          * If this is the submit part and we are progress 100 (completed)
//          * TODO: Make the progress === 100 a method returned from quickform
//          * 'isQuestionsComplete()'
//          *
//          * Such the logic on if its complete (the progress===100) is actually somewhere
//          * else than in the rendering part.
//          * */
//         if (inputType === "submit") {
//             if (progress === 100) {

//                 /**
//                  * If its complete, we simply click the onSubmitBtnClicked()
//                  *
//                  * I think it makes sense to add some ValidateForSubmission.
//                  *
//                  * */
//                 transitionOut(onQuestionBtnClicked);


//             }
//         }

//         /**
//          * If its not submit, we will ask quickform if the input type should be validated
//          * */
//         if (shouldValidateInputType(inputType)) {

//             /**
//              * The actualy validateinput should be on usequickform i think.
//              *
//              * Basically library users should be able to plug in validation
//              * */
//             const isValid = validateInput();
//             if (!isValid) return;
//         }
//         transitionOut(onQuestionBtnClicked)
//     };