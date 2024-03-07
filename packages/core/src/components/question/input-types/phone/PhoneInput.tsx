"use client";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";
import { BaseInputComponent } from "../text/TextInput";

export const PhoneInput: InputComponentType = (props) => {
    return <BaseInputComponent type="tel" {...props} />
}

PhoneInput.quickform = {
    label: "Phone",
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
registerInputComponent("phone", PhoneInput);