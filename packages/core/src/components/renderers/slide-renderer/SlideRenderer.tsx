"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useQuickForm } from '../../../state/QuickFormContext';
import { Button, Slide } from '../../index';
import { useHandleEnterKeypress } from '../../../hooks';
import { quickformtokens } from "../../../style";
import { mergeClasses } from '@griffel/react';
import { IconResolver } from '../../icons/IconResolver';
import { SlideModel } from '../../../model';

export const SlideRenderer: React.FC = () => {

    const { state, goToNextSlide } = useQuickForm();
    const [className, setClassName] = useState(state.classes.slide);

    const currentSlide: SlideModel = state.slides[state.currIdx];
    const buttonText: string = currentSlide?.buttonText ?? "OK";
    const showPressEnter: boolean = currentSlide?.questions?.some(q => q.inputType === "multilinetext" && q.isActive) === false;

    /* KBA - Leaving this for now - have to get back to it since we never actually set .isActive property on question.. so we cant use it to condition with at the moment.. */
    // const showPressEnter: boolean = currentSlide.questions.some(q => q.inputType === "multilinetext" && q.isActive) === false;
    console.log("showPressEnter", showPressEnter);
    console.log("showPressEnterCondition", currentSlide?.questions?.some(q => q.inputType === "multilinetext" && q.isActive));
    console.log("showPressEnterCurrentSlide", currentSlide);

    /* Listens to enter key pressed */
    useHandleEnterKeypress("slide", !showPressEnter, goToNextSlide);

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
        <div
            id="SlideRenderer"
            className={className}
        >
            <Slide model={currentSlide} />
            <Button
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}
                onClick={goToNextSlide}
                showPressEnter={showPressEnter}
                children={
                    <>
                        {buttonText}<IconResolver type={currentSlide?.icon} style={{ height: '100%', marginLeft: quickformtokens.gap1 }} color={quickformtokens.onPrimary} size={24} />
                    </>
                }
            />
        </div>
    );
};

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