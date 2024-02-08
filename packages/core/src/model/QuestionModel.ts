import { DropDownProperties, InputTypeMap, RadioProperties, SliderProperties } from "./InputType";
import { InputTypes } from "./json/JsonDataModels";

type QuestionInputType = keyof InputTypeMap | "text";

export class QuestionModel {
    logicalName: string = "";
    inputType: InputTypes;
    text: string = "";
    placeholder: string = "";
    paragraph: string = "";
    dataType: "string" | "number" | "boolean" = "string"
    answered?: boolean = false;
    output: any = {};
    inputProperties?: DropDownProperties | RadioProperties | SliderProperties | undefined;

    constructor(inputType: QuestionInputType, inputProperties?: QuestionModel['inputProperties']) {
        this.inputType = inputType;
        this.inputProperties = inputProperties;
    }
}