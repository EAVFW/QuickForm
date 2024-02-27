import { FC } from "react";
import { DropDownProperties, RadioProperties, SliderProperties } from "../../model";
import { QuestionJsonModel } from "../../model/json/JsonDataModels";
import { registerQuickFormService } from "../QuickFormServices";

function parseInputProperties(questionJsonModel: QuestionJsonModel): DropDownProperties | RadioProperties | SliderProperties | undefined {
    let inputProperties: DropDownProperties | RadioProperties | SliderProperties | undefined;

    switch (questionJsonModel.inputType) {
        case "dropdown":
            inputProperties = {
                inputType: questionJsonModel.inputType,
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

import { TextInput, MultilineInput, DropDownInput } from "../../components/question/input-types/index";
import { InputProps } from "../../model/InputType";

export type InputComponentType = FC<InputProps>;

export type InputComponentDictionary = {
    [key: string]: InputComponentType;
};

const inputComponents: InputComponentDictionary = {
    // TODO - Create Radio
    "radio": TextInput,
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