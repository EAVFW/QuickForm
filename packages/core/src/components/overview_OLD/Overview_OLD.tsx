import React from 'react';
import { useQuickForm } from '../../context/QuickFormContext';
import classNames from "classnames";
import styles from "./Overview.module.css";

import { Button, ProgressCircle } from '../index';
import { QuestionModel } from '../../model/QuestionModel';

export const Overview_OLD: React.FC = () => {
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

            {/* Progress Display */}
            <ProgressCircle
                progress={questionState?.progress}
                backgroundColor='#154068'
            // color='#060f1a'
            />

            <div className={classNames(styles.overviewProgress)}>
                <p>Progress: {questionState?.progress}%</p>
                <p>Questions: {questionState?.progressText}</p>
            </div>

            {/* List of Questions */}
            <ol className={classNames(styles.overviewList)}>
                {questionState.questions.filter(q => q.logicalName !== 'submit' && q.logicalName !== 'intro' && q.logicalName !== 'ending').map((q, index) => {
                    return (
                        <li key={index}>
                            <a onClick={() => handleOnQuestionClicked(q)} title="Go to question">
                                {q.text!}
                                {q.answered === true && <span className={classNames(styles.overviewList)}> ✔</span>}
                            </a>
                        </li>
                    );
                })}
            </ol>

            <Button
                className={classNames(styles.overviewButton)}
                onClick={() => { alert("Not implemented yet.") }}
                showPressEnter={false}
                disabled={false}
            >
                Preview PDF
            </Button>
        </div>
    );

}

