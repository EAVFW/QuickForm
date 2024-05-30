import { FC } from "react";
import { InputPropertiesTypes, InputProps } from "../../model";
import { QuestionJsonModel } from "../../model/json-definitions/JsonDataModels";
import { registerQuickFormService } from "../QuickFormServices";

const getDefaultValue = (schema: JSONSchema7Definition): any => {
    if (typeof schema !== 'object' || schema === null) return undefined;
    return 'default' in schema ? schema.default : undefined;
};

const parseInputProperties = (questionJsonModel: QuestionJsonModel): InputPropertiesTypes => {
    const inputType = questionJsonModel.inputType;
    if (!inputType) return {};

    const componentSchema = resolveInputComponent(inputType)?.inputSchema?.schema?.properties;
    if (componentSchema) {
        return Object.fromEntries(Object.entries(componentSchema)
            .filter(([key]) => !['text', 'paragraph', 'placeholder'].includes(key))
            .map(([key, schema]) => [key, questionJsonModel[key as keyof QuestionJsonModel] ?? getDefaultValue(schema)])) as InputPropertiesTypes;
    }
    //This will always return {} , do we know what we are doing here? KBA?
    const inputTypePropertiesMap: { [key: string]: () => InputPropertiesTypes } = {};

    return inputType in inputTypePropertiesMap ? inputTypePropertiesMap[inputType]() : {};
};

registerQuickFormService("inputTypePropertiesTransformer", parseInputProperties);


import { JSONSchema7, JSONSchema7Definition } from "json-schema";

/**
 * Field Metadata for @eavfw/quickform-querybuilder
 * https://github.com/ukrbublik/react-awesome-query-builder/blob/master/CONFIG.adoc
 */
type InputComponentFieldMetadataDefault<T> = {
    type: | 'text'
    | 'checkbox'
    | 'radio'
    | 'textarea'
    | 'date'
    | 'datetime-local'
    | 'time'
    | null;

}
export type InputComponentSelectFieldMetadata<T> = {
    type: "select" | "multiselect",
    listValuesProvider: (question: T) => Array<{ name: string | number, label: string }>
}
type InputComponentFieldMetadataNone<T> = {
    //type: undefined,
    listValuesProvider: (question: T) => Array<{ name: string | number, label: string }>
    typeProvider: (question: T) => "select" | "multiselect"
}
export type InputComponentFieldMetadata<T> = InputComponentFieldMetadataDefault<T> | InputComponentSelectFieldMetadata<T> | InputComponentFieldMetadataNone<T>;
export type FieldTypes<T> = (InputComponentFieldMetadataDefault<T> | InputComponentSelectFieldMetadata<T>)["type"];
export type InputComponentMetadata<T> = {
    label: string,
    uiSchema: any,
    field?: InputComponentFieldMetadata<T>,
    schema: JSONSchema7
};
export type InputComponentType<T = InputPropertiesTypes> = FC<InputProps<T> & T> & { inputSchema?: InputComponentMetadata<T> };

export type InputComponentDictionary = { [key: string]: InputComponentType<any>; };

const ThrowIfUsed: InputComponentType = (props) => { throw new Error("Not registered: " + props.questionModel.inputType) }
const inputComponents: InputComponentDictionary = {
    text: ThrowIfUsed,
    none: ThrowIfUsed,
    multilinetext: ThrowIfUsed
};

export const registerInputComponent = <T extends InputPropertiesTypes = InputPropertiesTypes>(key: string, component: InputComponentType<T>) => {
    inputComponents[key] = component;
};

export const resolveInputComponent = <T extends InputPropertiesTypes = InputPropertiesTypes>(key: string): InputComponentType<T> => {
    return inputComponents[key];
}

export const resolveInputComponentSchemas = () => {
    const result = Object.fromEntries(Object.keys(inputComponents).filter(x => "inputSchema" in inputComponents[x]).map(k => [k, inputComponents[k].inputSchema]));
    // console.log("resolveInputComponentSchemas", [result, Object.keys(inputComponents).filter(x => "inputSchema" in inputComponents[x]), Object.keys(inputComponents)]);
    return result as {
        [k: string]: InputComponentMetadata<any>
    };
}