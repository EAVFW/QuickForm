import { JSONSchema7 } from "json-schema";

export const checkboxInputSchema = {
    label: "Checkbox",
    uiSchema: {
    },
    schema: {
        type: "object",
        properties: {
            checked: {
                type: "boolean",
                title: "Default Checked State",
                description: "Determines whether the checkbox is checked by default."
            }
        },
        required: []
    } as JSONSchema7
}
