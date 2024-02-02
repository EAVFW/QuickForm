import React from 'react';
import { SlideModel, QuestionModel } from "../../model";
import { Question } from '../question/Question';
import { useQuickForm } from '../../state/QuickFormContext';
import { Button } from '../button/Button';
import { useHandleEnterKeypress } from '../../hooks';

type SlideProps = {
    model: SlideModel;
}

export const Slide: React.FC<SlideProps> = ({ model }: SlideProps) => {
    const { state, goToNextSlide } = useQuickForm();

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
                                    <div key={innerRowIndex}>
                                        <ul>
                                            <li>
                                                <Question model={question} />
                                            </li>
                                        </ul>
                                    </div>
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
