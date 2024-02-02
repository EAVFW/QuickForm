import { DropDownProperties, RadioProperties, SliderProperties } from "./InputType";

export class QuestionModel {
    readonly logicalName?: string;
    inputType: string;
    text: string;
    placeholder: string;
    paragraph: string;
    answered?: boolean = false;
    inputProperties?: DropDownProperties | RadioProperties | SliderProperties;
    output?: any = {};

    constructor(answered: boolean = false, output: any = {}) {
        this.answered = answered;
        this.output = output;
    }
}