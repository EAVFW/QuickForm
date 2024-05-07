"use client";
import { InputComponentType, registerInputComponent } from "@eavfw/quickform-core";
import { BaseInputComponent } from "../baseinput/BaseInputComponent";
import { phoneInputSchema } from "./PhoneInputSchema";
import { IconType } from "../../../icons/IconResolver";

export type PhoneProperties = {
    inputType: "phone";
    defaultValue?: string;
    beforeIcon?: IconType;
    afterIcon?: IconType
}

export const PhoneInput: InputComponentType<PhoneProperties> = (props) => {
    return <BaseInputComponent type="tel" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
PhoneInput.inputSchema = phoneInputSchema;
registerInputComponent("phone", PhoneInput);