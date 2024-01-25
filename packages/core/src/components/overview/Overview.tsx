"use client"
import React from 'react';
import { useQuickForm } from '../../state/QuickFormContext';
import classNames from "classnames";
import styles from "./Overview.module.css";
import { Button, ProgressCircle } from '../index';
import { QuestionModel } from '../../model/QuestionModel';
import PreviewPDFButton from '../preview-pdf-button/PreviewPDFButton';


export const QuestionList: React.FC<{ hideOnIntro?: boolean }> = ({ hideOnIntro }) => {

    const { questionState, goToQuestion, toggleOverview } = useQuickForm();
    if (questionState?.questions === undefined) return (<></>);
    if (questionState.currentQuestionIndex === 0 && hideOnIntro) return null;

    const handleOnQuestionClicked = (q: QuestionModel) => {
        toggleOverview();
        goToQuestion(q);
    }

    return <div className={classNames(styles['overview-right'])}>
        {/* List of Questions */}
        <ol className={classNames(styles.overviewList)}>
            {questionState.questions.filter(q => q.logicalName !== 'submit' && q.logicalName !== 'intro' && q.logicalName !== 'ending').map((q, index) => {
                return (
                    <li key={index}>
                        <a onClick={() => handleOnQuestionClicked(q)} title="Go to question">

                            <span style={{ opacity: q.answered?1:0 }}>✔</span>
                            {index+1}.&nbsp;
                            {q.text!}
                            {q.answered ? <span>&nbsp;:{q.output}</span> : null}
                        </a>
                    </li>
                );
            })}
        </ol>
    </div>
}
export const Overview: React.FC = () => {
    const { questionState, goToQuestion, toggleOverview } = useQuickForm();
    if (questionState?.questions === undefined) return (<></>);

    const handleOnQuestionClicked = (q: QuestionModel) => {
        toggleOverview();
        goToQuestion(q);
    }

    const handleCloseOverviewClicked = () => {
        toggleOverview();
    }

    return (
        <div className={classNames(styles.overview)} >

            <Button onClick={handleCloseOverviewClicked} children={"X"} className={classNames(styles['overviewButton'])} style={{ justifyContent: 'flex-end' }} />

            <div className={classNames(styles['overview-left'])}>
                {/* Progress Display */}
                <ProgressCircle
                    progress={questionState?.progress}
                    backgroundColor='#154068'
                />

                <div className={classNames(styles.overviewProgress)}>
                    <p>Questions: {questionState?.progressText}</p>
                </div>
            </div>

            <QuestionList />

            <PreviewPDFButton style={{ display: 'flex', justifyContent: 'center' }} />
        </div>
    );

}

