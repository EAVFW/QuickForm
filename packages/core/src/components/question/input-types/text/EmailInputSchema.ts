import { TextProperties } from "src/model";
import { InputComponentMetadata } from "src/services/defaults/DefaultInputTypeResolver";

export const textInputSchema: InputComponentMetadata<TextProperties> = {
    label: "Text",
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