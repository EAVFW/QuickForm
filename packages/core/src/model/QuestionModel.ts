import { DropDownProperties, InputTypeMap, RadioProperties, SliderProperties } from "./InputType";

type QuestionInputType = keyof InputTypeMap | "text";

export class QuestionModel {
    logicalName: string = "";
    inputType: string;
    text: string = "";
    placeholder: string = "";
    paragraph: string = "";
    answered?: boolean = false;
    output: any = {};
    inputProperties?: DropDownProperties | RadioProperties | SliderProperties | undefined;

    constructor(inputType: QuestionInputType, inputProperties?: QuestionModel['inputProperties']) {
        this.inputType = inputType;
        this.inputProperties = inputProperties;
    }
}