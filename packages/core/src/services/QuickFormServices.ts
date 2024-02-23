
import { DropDownProperties, QuestionModel, QuickFormModel, RadioProperties, SliderProperties } from "../model";
import { QuickFormDefinition } from "../model";
import { QuestionJsonModel } from "../model/json/JsonDataModels";
import { InputComponentType } from "./defaults/DefaultInputTypeResolver";

export type HeadingNumberDisplayProvider = () => boolean;
export type QuickFormModelTransformer = (data: QuickFormDefinition, payload: any) => QuickFormModel;
export type QuestionTransformer = (key: string, question: QuestionJsonModel, value?: any) => QuestionModel;
export type InputTypePropertiesTransformer = (questionJsonModel: QuestionJsonModel) => DropDownProperties | RadioProperties | SliderProperties | undefined;
export type RegisterInputTypeComponent = (key: string, component: InputComponentType) => void;
export interface IQuickFormLogger {

    log(body: string, ...args: any[]): void;
    warn(body: string, ...args: any[]): void;
}
export type QuickFormFeatures = {
    modeltransformer?: QuickFormModelTransformer,
    headingNumberDisplayProvider?: HeadingNumberDisplayProvider,
    questionTransformer?: QuestionTransformer,
    inputTypePropertiesTransformer?: InputTypePropertiesTransformer;
    registerInputTypeComponent?: RegisterInputTypeComponent;
    logger?: IQuickFormLogger
}
let _quickFormFeatures: QuickFormFeatures = {

};
export function registerQuickFormService<Key extends keyof QuickFormFeatures>(name: Key, instance: (QuickFormFeatures)[Key]) {
    _quickFormFeatures[name] = instance;
}

export function resolveQuickFormService<Key extends keyof QuickFormFeatures>(name: Key) {
    let f = _quickFormFeatures[name];
    if (!f)
        throw new Error(`'${name}' was not registered, registred keys: ${Object.keys(_quickFormFeatures)}`);
    return f;
}