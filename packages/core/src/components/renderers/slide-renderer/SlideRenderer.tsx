"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useQuickForm } from '../../../state/QuickFormContext';
import { Button } from '../../button/Button';
import { useHandleEnterKeypress } from '../../../hooks';
import { Slide } from '../../slide/Slide';
import { Checkmark } from '../../icons';
import { quickformtokens } from '../../../style/quickFormTokensDefinition';
import { mergeClasses } from '@griffel/react';



export const SlideRenderer: React.FC = () => {
    const { state, goToNextSlide } = useQuickForm();
    const currentSlide = state.slides[state.currIdx];

    /* Listens to enter key pressed */
    const enterKeyDisabled = currentSlide.questions.some(q => q.inputType === "multilinetext");
    useHandleEnterKeypress("slide", enterKeyDisabled, goToNextSlide);

    const [className, setClassName] = useState(state.classes.slide);
    let nextAllowedEffectTime = useRef(new Date().getTime());
    useEffect(() => {
        const timeout = setTimeout(() => {

            setClassName(mergeClasses(state.classes.slide, state.classes.slideIsIn));

        }, Math.max(150, nextAllowedEffectTime.current - new Date().getTime() + 150));

        return () => {
            clearTimeout(timeout);
            setClassName(mergeClasses(state.classes.slide, state.classes.slideIsOut));
            nextAllowedEffectTime.current = new Date().getTime() + 10;
        }
    }, [state.currIdx])
    return (
        <div className={className} id="SlideRenderer" style={slideStyling}        >
            <Slide model={currentSlide} />
            <Button
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
                onClick={goToNextSlide}
                showPressEnter={!enterKeyDisabled}
                children={<>OK<Checkmark style={{ height: '100%', marginLeft: quickformtokens.gap1 }} color={quickformtokens.onPrimary} size={24} /></>} />
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