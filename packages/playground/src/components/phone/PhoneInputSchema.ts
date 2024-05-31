
import { InputComponentMetadata } from "../../../../core/src/services/";
import { InputPropertiesTypes, } from "@eavfw/quickform-core/src/model";

export const phoneInputSchema: InputComponentMetadata<InputPropertiesTypes> = {
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
    }, field: {
        type: "text",
    }
}