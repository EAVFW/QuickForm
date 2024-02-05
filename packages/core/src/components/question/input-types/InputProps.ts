import { DropDownProperties, InputTypes, RadioProperties, SliderProperties } from "../../../model";

export type InputProps = {
    questionRef?: string;
    inputType: InputTypes;
    inputProps: DropDownProperties | RadioProperties | SliderProperties;
    output: string;
    onOutputChange(output: string): void;
    placeholder?: string;
}