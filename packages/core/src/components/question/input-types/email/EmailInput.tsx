"use client"
import classNames from "classnames";
import { ChangeEvent, useState } from "react";
import { useFocusableQuestion } from "../../../../hooks/useFocusableQuestion";
import { InputProps } from "../../../../model/InputType";

import styles from "../text/TextInput.module.css";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { BaseInputComponent } from "../text/TextInput";

export const EmailInput: InputComponentType = (props) => {

    
    return <BaseInputComponent type="email" {...props} />
}

EmailInput.quickform = {
    label: "Email",
    uiSchema: {
        paragraph: {
            "ui:widget": "textarea"
        }
    },
    schema: {
        type: "object",

        properties: {
            text: {
                title: "Text",
                type: "string"
            },
            placeholder: {
                title: "Placeholder",
                type: "string"
            },
            paragraph: {
                title: "Paragraph",
                type: "string"
            }
        }
    }
}
registerInputComponent("email", EmailInput);
