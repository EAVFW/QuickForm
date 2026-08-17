import { JSONSchema7 } from "json-schema";

export const radioInputSchema = {
    label: "Radio",
    uiSchema: {
        paragraph: {
            "ui:widget": "textarea"
        }
    },
    schema: {
        type: "object",
        properties: {
            options: {
                type: "object",
                title: "Options",
                additionalProperties: {
                    type: "string"
                }
            },
            direction: {
                type: "string",
                title: "Direction",
                enum: ["horizontal", "vertical"],
                default: "horizontal"
            }
        },
        required: ["options"]
    } as JSONSchema7
}
