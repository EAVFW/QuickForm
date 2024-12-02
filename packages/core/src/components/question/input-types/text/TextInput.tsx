"use client";
import React from "react";
import { textInputSchema } from "./TextInputSchema";
import { BaseInputComponent } from "../baseinput/BaseInputComponent"; 
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { TextProperties } from "../../../../model/InputType";



export const TextInput: InputComponentType<TextProperties> = (props) => {
    return <BaseInputComponent type="text" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
TextInput.inputSchema = textInputSchema;
export const registerTextInput = ()=>registerInputComponent("text", TextInput);