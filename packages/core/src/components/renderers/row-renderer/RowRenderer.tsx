import React, { useMemo } from 'react';
import { QuestionModel, Row } from "../../../model";
import { Question } from '../../question/Question';
import { resolveQuickFormService } from '../../../services/QuickFormServices';
import { findQuestionByKey } from '../../../utils/quickformUtils';
import { fullRowStyle } from './rowStyles';
import { ColumnRenderer, getColumnStyle } from '../column-renderer/ColumnRenderer';

type RowRendererProps = {
    row: Row;
    questions: QuestionModel[];
}

export const RowRenderer: React.FC<RowRendererProps> = ({ row, questions }) => {

    const logger = resolveQuickFormService("logger");
    logger.log("Rendering row {@row}", row);

    if (row.type === "row") {
        return (
            <>
                {row.columns.map((column, columnIndex) => (
                    <div key={columnIndex} style={getColumnStyle(row.columns!.length)}>
                        <ColumnRenderer column={column} questions={questions} />
                    </div>
                ))}</>
        )
    }

    const question = useMemo(() => findQuestionByKey(row.ref!, questions), [row.ref]);
    if (!question) return null;
    return <Question key={question.logicalName} style={fullRowStyle} model={question} />
}