"use client";
import React from "react";
import { TextProperties } from "../../../../model/InputType";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { textInputSchema } from "./TextInputSchema";
import { BaseInputComponent } from "../baseinput/BaseInputComponent";

export const TextInput: InputComponentType<TextProperties> = (props) => {
    return <BaseInputComponent type="text" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
TextInput.inputSchema = textInputSchema;
registerInputComponent("text", TextInput);