import { Column } from "./Layout";
import { QuestionModel } from "./QuestionModel";

export class SlideModel {
    questions: QuestionModel[] = [];
    columns: Column[];

    constructor(columns: Column[] = []) {
        this.columns = columns;
    }

    // Getter to check if all questions are answered on the slide
    get isAnswered(): boolean {
        return this.questions.every(question => question.answered);
    }

    addQuestion(question: QuestionModel) {
        this.questions.push(question);
    }
}
