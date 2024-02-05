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
}