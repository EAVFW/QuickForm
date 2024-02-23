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

import React from "react";
import { TextInput, MultilineInput, DropDownInput } from "../../components/question/input-types/index";
import { InputProps } from "../../model/InputType";

export type InputComponentType = React.ComponentType<InputProps>;

export type InputComponentDictionary = {
    [key: string]: InputComponentType;
};

const inputComponents: InputComponentDictionary = {
    "text": TextInput,
    // TODO - Create Radio
    "radio": TextInput,
    // TODO - Create Slider
    "slider": TextInput,
    "multilinetext": MultilineInput,
    // TODO - Create Email
    "email": TextInput,
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