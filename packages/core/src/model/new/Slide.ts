import { Column } from "./Layout";
import { Question } from "./Question";

export class Slide {
    questions: Question[];
    rows?: any[];
    // A slide can contain multiple columns
    columns?: { [key: string]: Column };

    constructor(questions: Question[]) {
        this.questions = questions;
    }

    // Getter to check if all questions are answered on the slide
    get isAnswered(): boolean {
        return this.questions.every(question => question.answered);
    }
}
