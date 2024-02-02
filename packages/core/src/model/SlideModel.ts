import { QuestionModel } from "./QuestionModel";

export class SlideModel {
    questions: QuestionModel[] = [];
    rows: Row[];

    constructor(rows: Row[] = []) {
        this.rows = rows;
    }

    // Getter to check if all questions are answered on the slide
    get isAnswered(): boolean {
        return this.questions.length > 0 && this.questions.every(question => question.answered);
    }

    addQuestion(question: QuestionModel) {
        this.questions.push(question);
    }
}

export type Row = {
    style?: React.CSSProperties;
    columns?: Column[];
    questionRefLogicalName: string;
}

export type Column = {
    style?: React.CSSProperties;
    rows: Row[];
}
