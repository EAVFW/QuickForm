import React, { useEffect, useState } from 'react';
import { SlideModel, QuestionModel } from "../../model";
import { Question } from '../question/Question';
import { useQuickForm } from '../../state/QuickFormContext';
import { Button } from '../button/Button';
import { useHandleEnterKeypress } from '../../hooks';
import styles from "./Slide.module.css";
import classNames from 'classnames';

type SlideProps = {
    model: SlideModel;
}

export const Slide: React.FC<SlideProps> = ({ model }: SlideProps) => {
    const { state, goToNextSlide } = useQuickForm();

    // const { transitionOut, questionBoxClasses } = useTransitionState();


    const findQuestionByLogicalName = (logicalName: string): QuestionModel | undefined => {
        return model.questions.find(q => q.logicalName === logicalName);
    };

    const getColumnStyle = (numberOfColumns: number): React.CSSProperties => ({
        width: `${100 / numberOfColumns}%`,
        display: 'flex',
        flexDirection: 'column',
    });

    const handleGoToNextSlideClicked = () => {
        // BIG TODO:
        // Validate model.Questions.. Are they all answered? Is all the output in correct form?
        // If yes, dispatch computeprogress and goToNextSlide
        goToNextSlide();
    }

    /* Listens to enter key pressed */
    useHandleEnterKeypress("slide", handleGoToNextSlideClicked);

    console.log("slide", model);

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {model.rows.map((row, rowIndex) => (
                <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    {row.columns?.map((column, columnIndex) => (
                        <div key={columnIndex} style={getColumnStyle(row.columns.length)}>
                            {column.rows.map((innerRow, innerRowIndex) => {
                                const question = findQuestionByLogicalName(innerRow.questionRefLogicalName);
                                if (!question) return null;
                                return (
                                    <Question
                                        key={innerRowIndex}
                                        model={question}
                                        questionNumber={innerRowIndex + 1}
                                    />
                                );
                            })}
                        </div>
                    ))}
                </div>
            ))}
            <Button
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                onClick={handleGoToNextSlideClicked}
                showPressEnter={true}
                children={"Næste"} />
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
//             console.log("progress: ", progress);
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

