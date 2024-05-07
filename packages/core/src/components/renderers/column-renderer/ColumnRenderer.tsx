import React from 'react';
import { QuestionModel, Column } from "../../../model";
import { Question } from '../../question/Question';
import { resolveQuickFormService } from '../../../services/QuickFormServices';
import { findQuestionByLogicalName } from '../../../utils/quickformUtils';
import { RowRenderer } from '../row-renderer/RowRenderer';
import { fullRowStyle } from '../row-renderer/rowStyles';


type ColumnRendererProps = {
    column: Column;
    questions: QuestionModel[];
}

export const getColumnStyle = (numberOfColumns: number): React.CSSProperties => ({
    width: `${100 / numberOfColumns}%`,
    display: 'flex',
    flexDirection: 'column',
});

export const ColumnRenderer: React.FC<ColumnRendererProps> = ({ column, questions }) => {

    const logger = resolveQuickFormService("logger");
    logger.log("Rendering column {@column}", column);

    if (column.type === "question") {
        const question = findQuestionByLogicalName(column.ref!, questions);
        if (!question || question.visible && question.visible.isVisible === false) return null;
        return <Question key={question.logicalName} style={fullRowStyle} model={question} />
    }

    return (<>

        {column.rows.map((innerRow, innerRowIndex) => {
            if (innerRow.type === "question") {
                const question = findQuestionByLogicalName(innerRow.ref!, questions);
                if (!question || question.visible && question.visible.isVisible === false) return null;
                return <Question key={question.logicalName} model={question} />
            } else {
                return <RowRenderer key={"RowRenderer idx: " + innerRowIndex} row={innerRow} questions={questions} />
            }
        })}
    </>
    )
}