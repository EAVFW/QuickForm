import { resolveQuickFormService } from "../services/QuickFormServices";
import { QuestionModel } from "./QuestionModel";
import { QuestionJsonModel } from "./json-definitions/JsonDataModels";
import { QuestionRef } from "./json-definitions/Layout";

export class SlideModel {
    displayName?: string;
    questions: QuestionModel[] = [];
    rows: Row[];

    constructor(rows: Row[] = []) {
        this.rows = rows;
    }

    addQuestion(layout: QuestionRef, question: QuestionJsonModel, payload: any) {
        const mapJsonQuestionToModelQuestion = resolveQuickFormService("questionTransformer");
        const questionModel = mapJsonQuestionToModelQuestion(layout.ref, question, payload[question?.logicalName ?? layout.ref])

        this.questions.push(questionModel);

        return {
            style: layout.style,
            type: "question",
            ref: layout.ref
        } as QuestionLayout;
    }

    /**
     * When all questions are answered, the slide is considered answered.
     */
    public get isAnswered() { return this.questions.every(q => q.answered); }
}

export type QuestionLayout = {
    style?: React.CSSProperties;
    type: "question",
    ref: string
}

export type RowColumns = {
    style?: React.CSSProperties;
    type: "row",
    columns: Array<Column>
}

export type Row = QuestionLayout | RowColumns

export type ColumnWithRows = {
    style?: React.CSSProperties;
    type: "column",
    rows: Row[];
}
export type Column = QuestionLayout | ColumnWithRows;