"use client";
 
import { BaseInputComponent } from "../baseinput/BaseInputComponent";
import { phoneInputSchema } from "./PhoneInputSchema"; 
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { PhoneProperties } from "../../../../model/InputType";



export const PhoneInput: InputComponentType<PhoneProperties> = (props) => {
    return <BaseInputComponent type="tel" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
PhoneInput.inputSchema = phoneInputSchema;
export const registerPhoneInput = ()=> registerInputComponent("phone", PhoneInput);