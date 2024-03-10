"use client";
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
    },
    field: {
        type: "text",
    }
}
registerInputComponent("email", EmailInput);