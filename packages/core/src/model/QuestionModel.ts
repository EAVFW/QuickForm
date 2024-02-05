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

    constructor({
        logicalName,
        inputType,
        text,
        placeholder,
        paragraph,
        answered = false,
        inputProperties,
        output = {}
    }: {
        logicalName?: string,
        inputType: string,
        text: string,
        placeholder: string,
        paragraph: string,
        answered?: boolean,
        inputProperties?: DropDownProperties | RadioProperties | SliderProperties,
        output?: any
    }) {
        this.logicalName = logicalName;
        this.inputType = inputType;
        this.text = text;
        this.placeholder = placeholder;
        this.paragraph = paragraph;
        this.answered = answered;
        this.inputProperties = inputProperties;
        this.output = output;
    }
}