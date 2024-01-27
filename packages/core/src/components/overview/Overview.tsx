import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import classNames from "classnames";
import styles from "./Overview.module.css";
import { Button, ProgressCircle } from '../index';
import PreviewPDFButton from '../preview-pdf-button/PreviewPDFButton';
import { Slide } from '../../model';


export const QuestionList: React.FC<{ hideOnIntro?: boolean }> = ({ hideOnIntro }) => {

    const { state, goToSlide, toggleOverview } = useQuickForm();
    if (state?.slides === undefined) return (<></>);
    if (state.currIdx === 0 && hideOnIntro) return null;

    const handleOnQuestionClicked = (s: Slide) => {
        const slideIdx = state.slides.indexOf(s);
        toggleOverview();
        goToSlide(slideIdx);
    }

    return <div className={classNames(styles['overview-right'])}>
        {/* List of Questions */}
        <ol className={classNames(styles.overviewList)}>
            {state.slides.map(s => {
                return s.questions.map((q, index) => {
                    return (
                        <li key={index}>
                            <a onClick={() => handleOnQuestionClicked(s)} title="Go to question">

                                <span style={{ opacity: q.answered ? 1 : 0 }}>✔</span>
                                {index + 1}.&nbsp;
                                {q.text!}
                                {q.answered ? <span>&nbsp;:{q.output}</span> : null}
                            </a>
                        </li>
                    );
                })
            })}
        </ol>
    </div>
}
export const Overview: React.FC = () => {
    const { state, toggleOverview } = useQuickForm();
    const slidesAreNotDefined = state?.slides === undefined || state.slides.length === 0;
    if (slidesAreNotDefined) return (<></>);

    const handleCloseOverviewClicked = () => {
        toggleOverview();
    }

    return (
        <div className={classNames(styles.overview)} >

            <Button onClick={handleCloseOverviewClicked} children={"X"} className={classNames(styles['overviewButton'])} style={{ justifyContent: 'flex-end' }} />

            <div className={classNames(styles['overview-left'])}>
                {/* Progress Display */}
                <ProgressCircle
                    progress={state?.progress}
                    backgroundColor='#154068'
                />

                <div className={classNames(styles.overviewProgress)}>
                    <p>Questions: {state?.progressText}</p>
                </div>
            </div>

            <QuestionList />

            <PreviewPDFButton style={{ display: 'flex', justifyContent: 'center' }} />
        </div>
    );
}