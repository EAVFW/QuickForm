import { JSONSchema7 } from "json-schema";

export const sliderInputSchema = {
    label: "Slider",
    uiSchema: {
        paragraph: {
            "ui:widget": "textarea"
        }
    },
    schema: {
        type: "object",
        properties: {
            min: {
                title: "Minimum Value",
                type: "number"
            },
            max: {
                title: "Maximum Value",
                type: "number"
            },
            step: {
                title: "Step",
                type: "number"
            }
        },
        required: ["min", "max", "step"]
    } as JSONSchema7
}
