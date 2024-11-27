
import { ValidationResult } from "../model/ValidationResult";
import { InputPropertiesTypes, QuestionModel, QuickFormModel } from "../model";
import { QuickFormDefinition } from "../model";
import { QuestionJsonModel } from "../model/json-definitions/JsonDataModels";
import { InputComponentType, widthDefaultInputTypePropertiesTransformer } from "./defaults/DefaultInputTypeResolver";
import { QuickformState } from "../state";

export type HeadingNumberDisplayProvider = () => boolean;
export type QuickFormModelTransformer = (data: QuickFormDefinition, payload: any) => QuickFormModel;
export type QuestionTransformer = (key: string, question: QuestionJsonModel, value?: any, visible?: { type: string; rule: string; }) => QuestionModel;
export type InputTypePropertiesTransformer = (questionJsonModel: QuestionJsonModel) => InputPropertiesTypes | undefined;
export type RegisterInputTypeComponent = (key: string, component: InputComponentType) => void;
export type InputValidator = <TProps extends InputPropertiesTypes>(questionModel: QuestionModel<TProps>, state: QuickformState) => Promise<ValidationResult>;
export interface IQuickFormLogger {
    log(body: string, ...args: any[]): void;
    warn(body: string, ...args: any[]): void;
}

declare global {
    var __quickFormFeatures: QuickFormFeatures | undefined;

}
export interface QuickFormFeatures  {
    modeltransformer?: QuickFormModelTransformer,
    headingNumberDisplayProvider?: HeadingNumberDisplayProvider,
    questionTransformer?: QuestionTransformer,
    inputTypePropertiesTransformer?: InputTypePropertiesTransformer;
    registerInputTypeComponent?: RegisterInputTypeComponent;
    inputValidator?: InputValidator;
    logger?: IQuickFormLogger
}

//let _quickFormFeatures: QuickFormFeatures = {
//};

export function getOrCreateServiceContainer(keys?: Map<string, string>): QuickFormFeatures {
    if (!globalThis.__quickFormFeatures) {
        console.info(`✨ Created a service container ✨`);
        globalThis.__quickFormFeatures = {};
;
    }
    return globalThis.__quickFormFeatures;
}

export function registerQuickFormService<Key extends keyof QuickFormFeatures>(name: Key, instance: (QuickFormFeatures)[Key]) {
    let services = getOrCreateServiceContainer();
    services[name] = instance;
}

export function resolveQuickFormService<Key extends keyof QuickFormFeatures>(name: Key) {

    let services = getOrCreateServiceContainer();
    let f = services[name];
    if (!f)
        throw new Error(`'${name}' was not registered, registred keys: ${Object.keys(services)}`);
    return f as Required<QuickFormFeatures>[Key];
}

