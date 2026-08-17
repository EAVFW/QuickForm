"use client";
 
import { BaseInputComponent } from "../baseinput/BaseInputComponent";
import { emailInputSchema } from "./EmailInputSchema"; 
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { EmailProperties } from "../../../../model/InputType";



export const EmailInput: InputComponentType<EmailProperties> = (props) => {
    return <BaseInputComponent type="email" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
EmailInput.inputSchema = emailInputSchema;
export const registerEmailInput = ()=> registerInputComponent("email", EmailInput);