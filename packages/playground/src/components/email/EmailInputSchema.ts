import { InputComponentMetadata } from "@eavfw/quickform-core";
import { InputPropertiesTypes } from "@eavfw/quickform-core/src/model";

export const emailInputSchema: InputComponentMetadata<InputPropertiesTypes> = {
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
            },
            beforeIcon: {
                enum: [
                    "Phone",
                    "Email",
                    "User"
                ],
                // @ts-ignore
                "enumNames": [
                    "Phone",
                    "Email",
                    "User"
                ]
            },
            afterIcon: {
                enum: [
                    "Phone",
                    "Email",
                    "User"
                ],
                // @ts-ignore
                "enumNames": [
                    "Phone",
                    "Email",
                    "User"
                ]
            }
        }
    },
    field: {
        type: "text",
    }
}
