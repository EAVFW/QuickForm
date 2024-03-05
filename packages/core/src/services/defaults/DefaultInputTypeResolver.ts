import { FC } from "react";
import {  RadioProperties, SliderProperties, ButtonsProperties, InputPropertiesTypes, InputProps } from "../../model";
import { QuestionJsonModel } from "../../model/json-definitions/JsonDataModels";
import { registerQuickFormService } from "../QuickFormServices";
//import { TextInput, MultilineInput, DropDownInput } from "../../components/question/input-types/index";

function getDefaultValue(schema: JSONSchema7Definition) {
    if (typeof schema === "boolean")
        return undefined;
    if (typeof schema === "string")
        return undefined;
    if (typeof schema === "object")
        return schema.default;
}
function parseInputProperties(questionJsonModel: QuestionJsonModel): InputPropertiesTypes {
    if (!questionJsonModel.inputType)
        return {};
  
    const comp = resolveInputComponent(questionJsonModel.inputType)?.quickform?.schema?.properties;
    if (comp) {
        return Object.fromEntries(Object.entries(comp)
            .filter(([k, _]) => !(k === "text" || k === "paragraph" || k === "placeholder"))
            .map(([k, schema]) => [k, questionJsonModel[k as keyof (QuestionJsonModel)] ?? getDefaultValue(schema)])) as InputPropertiesTypes;
    }

    let inputProperties: InputPropertiesTypes;


    switch (questionJsonModel.inputType) {
       
        case "buttons":
            inputProperties = {
                inputType: questionJsonModel.inputType,
                options: (questionJsonModel as (QuestionJsonModel & ButtonsProperties)).options
            };
            break;

        //case "dropdown":
        //    inputProperties = {
        //        inputType: questionJsonModel.inputType,
        //        options: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).options,
        //        minItems: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).minItems ?? 1,
        //        maxItems: (questionJsonModel as (QuestionJsonModel & DropDownProperties)).maxItems ?? 1,
        //    };
        //    break;

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


            inputProperties = {}
;
    }

    return inputProperties
}

registerQuickFormService("inputTypePropertiesTransformer", parseInputProperties);


import { JSONSchema7, JSONSchema7Definition } from "json-schema";
export type InputComponentMetadata = { label: string, uiSchema: any, schema: JSONSchema7 };
export type InputComponentType<T = InputPropertiesTypes> = FC<InputProps<T> & T> & { quickform?: InputComponentMetadata };

export type InputComponentDictionary = {

    [key: string]: InputComponentType<any>;
};
const ThrowIfUsed: InputComponentType = (props) => { throw new Error("Not registered: " + props.questionModel.inputType) }
const inputComponents: InputComponentDictionary = {
    text: ThrowIfUsed,
    none: ThrowIfUsed,
    dropdown: ThrowIfUsed,
    slider: ThrowIfUsed,
    toggle: ThrowIfUsed,
    multilinetext: ThrowIfUsed
};

export const registerInputComponent = <T extends InputPropertiesTypes = InputPropertiesTypes>(key: string, component: InputComponentType<T>) => {
    inputComponents[key] = component;
};

export const resolveInputComponent = <T extends InputPropertiesTypes = InputPropertiesTypes>(key: string): InputComponentType<T> => {
    return inputComponents[key];
}

export const resolveInputComponentSchemas = () => {

    const result = Object.fromEntries(Object.keys(inputComponents).filter(x => "quickform" in inputComponents[x]).map(k => [k, inputComponents[k].quickform]));
    console.log("resolveInputComponentSchemas", [result, Object.keys(inputComponents).filter(x => "quickform" in inputComponents[x]), Object.keys( inputComponents)]);
    return result as {
        [k: string]: InputComponentMetadata
    };
}
// registerQuickFormService("registerInputTypeComponent", RegisterComponent);