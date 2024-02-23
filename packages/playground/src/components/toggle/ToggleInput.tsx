import React, { ChangeEvent, useState, FC } from "react";
import { InputProps, registerInputComponent } from "@eavfw/quickform-core";
import styles from "./Toggle.module.css";

export const ToggleInput: FC<InputProps> = ({ questionModel, onOutputChange }) => {

    return (
        <div>

        </div>
    )
}

registerInputComponent("toggle", ToggleInput);