"use client";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { BaseInputComponent } from "../baseinput/BaseInputComponent";
import { emailInputSchema } from "./EmailInputSchema";

export const EmailInput: InputComponentType = (props) => {
    return <BaseInputComponent type="email" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
EmailInput.inputSchema = emailInputSchema;
registerInputComponent("email", EmailInput);