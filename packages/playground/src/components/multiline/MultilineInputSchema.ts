
import { InputComponentMetadata } from "../../../../core/src/services/";
import { InputPropertiesTypes, } from "@eavfw/quickform-core/src/model";

export const multilineInputSchema: InputComponentMetadata<InputPropertiesTypes> = {
    label: "Multiline Text",
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