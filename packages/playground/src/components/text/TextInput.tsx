"use client";
import React from "react";
import { textInputSchema } from "./TextInputSchema";
import { BaseInputComponent } from "../baseinput/BaseInputComponent";
import { InputComponentType, registerInputComponent } from "@eavfw/quickform-core";
import { IconType } from "../../../../core/src/components/icons/IconResolver";

export type TextProperties = {
    inputType: "text";
    defaultValue?: string;
    beforeIcon?: IconType;
    afterIcon?: IconType
}

export const TextInput: InputComponentType<TextProperties> = (props) => {
    return <BaseInputComponent type="text" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
TextInput.inputSchema = textInputSchema;
registerInputComponent("text", TextInput);