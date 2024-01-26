export class Question {
    readonly logicalName?: string;
    inputType: string;
    text: string;
    placeholder: string;
    paragraph: string;
    answered?: boolean = false;
    output?: any = {};

    constructor(answered: boolean = false, output: any = {}) {
        this.answered = answered;
        this.output = output;
    }
}