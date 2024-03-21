import { InputPropertiesTypes } from "../../../../model";
import { InputComponentMetadata } from "./../../../../services/defaults/DefaultInputTypeResolver";

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
            }
        }
    }, field: {
        type: "text",
    }
}