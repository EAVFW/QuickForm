import { DropDownProperties, RadioProperties, SliderProperties } from "../../model";
import { QuestionJsonModel } from "../../model/json/JsonDataModels";
import { registerQuickFormService } from "../QuickFormServices";



function parseInputProperties(questionJsonModel: QuestionJsonModel): DropDownProperties | RadioProperties | SliderProperties | undefined {
    let inputProperties: DropDownProperties | RadioProperties | SliderProperties | undefined;
    // switch (value.inputType) {
    //     case "dropdown":
    //         inputProperties = value as DropDownProperties;
    //         break;
    //     case "radio":
    //         inputProperties = value as RadioProperties;
    //         break;
    //     case "slider":
    //         inputProperties = value as SliderProperties;
    //         break;
    //     default:
    //         inputProperties = {};
    // }
    switch (questionJsonModel.inputType) {
        case "dropdown":
            inputProperties = {
                inputType :questionJsonModel.inputType,
                options: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).options,
                minItems: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).minItems ?? 1,
                maxItems: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).maxItems ?? 1,
            };
            console.log("dropdown", questionJsonModel)
            console.log("inputProperties", inputProperties)
            break;
        case "radio":
            inputProperties = {
                inputType: questionJsonModel.inputType,
                options: (questionJsonModel as (QuestionJsonModel & RadioProperties)).options,
            };
            break;
        case "slider":
            inputProperties = {
                inputType: questionJsonModel.inputType,
                min: (questionJsonModel as (QuestionJsonModel & SliderProperties)).min,
                max: (questionJsonModel as (QuestionJsonModel & SliderProperties)).max,
                step: (questionJsonModel as (QuestionJsonModel & SliderProperties)).step,
            };
            break;
        default:
            inputProperties = undefined;
    }

    return inputProperties
}

registerQuickFormService("inputTypePropertiesTransformer", parseInputProperties);