import { InputPropertiesTypes, InputTypeMap } from "./InputType";

export class QuestionModel {
    logicalName: string = "";
    inputType: keyof InputTypeMap | "text";;
    text: string = "";
    placeholder: string = "";
    paragraph: string = "";
    dataType: "string" | "number" | "boolean" = "string"
    answered: boolean = false;
    output: any = {};
    inputProperties?: InputPropertiesTypes;

    constructor(inputType: keyof InputTypeMap | "text", inputProperties?: QuestionModel['inputProperties']) {
        this.inputType = inputType;
        this.inputProperties = inputProperties;
    }
}