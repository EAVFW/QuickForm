
import { QuickFormProps } from "../QuickForm";
import { Slide } from "../model/new/Slide";

export type HeadingNumberDisplayProvider = () => boolean;
export type QuickFormModelTransformer = (quickform: QuickFormProps, payload: any) => Slide[];

export type QuickFormFeatures = {
    modeltransformer?: QuickFormModelTransformer,
    headingNumberDisplayProvider?: HeadingNumberDisplayProvider,
}
let _quickFormFeatures: QuickFormFeatures = {

};
export function registerQuickFormService<Key extends keyof QuickFormFeatures>(name: Key, instance: (QuickFormFeatures)[Key]) {
    _quickFormFeatures[name] = instance;
}

export function resolveQuickFormService<Key extends keyof QuickFormFeatures>(name: Key) {
    let f = _quickFormFeatures[name];
    if (!f)
        throw new Error(`'${name}' was not registered`);
    return f;
}