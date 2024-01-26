import { Question } from "./Question";

export class Slide {
    questions: Question[];
    columns?: any[];
    rows?: any[];

    constructor(questions: Question[]) {
        this.questions = questions;
    }

    // Getter to check if all questions are answered on the slide
    get isAnswered(): boolean {
        return this.questions.every(question => question.answered);
    }
}
