import { FC } from "react";
import { DropDownProperties, RadioProperties, SliderProperties, ButtonsProperties, InputPropertiesTypes, InputProps } from "../../model";
import { QuestionJsonModel } from "../../model/json/JsonDataModels";
import { registerQuickFormService } from "../QuickFormServices";
import { TextInput, MultilineInput, DropDownInput } from "../../components/question/input-types/index";

function parseInputProperties(questionJsonModel: QuestionJsonModel): InputPropertiesTypes {
    let inputProperties: InputPropertiesTypes;

    switch (questionJsonModel.inputType) {
        case "buttons":
            inputProperties = {
                inputType: questionJsonModel.inputType,
                options: (questionJsonModel as (QuestionJsonModel & ButtonsProperties)).options
            };
            break;

        case "dropdown":
            inputProperties = {
                inputType: questionJsonModel.inputType,
                options: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).options,
                minItems: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).minItems ?? 1,
                maxItems: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).maxItems ?? 1,
            };
            break;

        case "radio":
            inputProperties = {
                inputType: questionJsonModel.inputType,
                options: (questionJsonModel as (QuestionJsonModel & RadioProperties)).options,
                direction: (questionJsonModel as (QuestionJsonModel & RadioProperties)).direction
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



export type InputComponentType = FC<InputProps>;

export type InputComponentDictionary = {
    [key: string]: InputComponentType;
};

const inputComponents: InputComponentDictionary = {
    // TODO - Create Email
    "email": TextInput,
    // TODO - Create Toggle
    "toggle": TextInput,


    "text": TextInput,
    "slider": TextInput,
    "multilinetext": MultilineInput,
    "dropdown": DropDownInput,
    "none": TextInput,
};

export const registerInputComponent = (key: string, component: InputComponentType) => {
    inputComponents[key] = component;
};

export const resolveInputComponent = (key: string): InputComponentType => {
    return inputComponents[key];
}

// registerQuickFormService("registerInputTypeComponent", RegisterComponent);