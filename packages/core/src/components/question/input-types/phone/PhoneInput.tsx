"use client";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { BaseInputComponent } from "../text/TextInput";
import { phoneInputSchema } from "./PhoneInputSchema";

export const PhoneInput: InputComponentType = (props) => {
    return <BaseInputComponent type="tel" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
PhoneInput.inputSchema = phoneInputSchema;
registerInputComponent("phone", PhoneInput);