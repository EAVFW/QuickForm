import React from 'react';
import { QuestionModel, Row } from "../../../model";
import { Question } from '../../question/Question';
import { resolveQuickFormService } from '../../../services/QuickFormServices';
import { findQuestionByLogicalName } from '../../../utils/questionUtils';
import { ConditionalRender } from '../conditional-render/ConditionalRender';
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

    const question = findQuestionByLogicalName(row.ref!, questions);
    if (!question) return null;

    if (question.visible && question.visible?.rule) {

        return (
            <ConditionalRender
                key={question.logicalName}
                engine={question.visible?.type}
                rule={question.visible?.rule}
            >
                <Question
                    key={question.logicalName}
                    style={fullRowStyle}
                    model={question}
                />
            </ConditionalRender>
        )
    }

    return <Question key={question.logicalName} style={fullRowStyle} model={question} />
}