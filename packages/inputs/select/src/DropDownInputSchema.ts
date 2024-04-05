import type { InputComponentMetadata } from "@eavfw/quickform-core";
import type { DropDownProperties } from "./DropDownInput";


export const DropDownInputSchema: InputComponentMetadata<DropDownProperties> = {
    label: "Select",
    field: {
        //  type: undefined,
        typeProvider: (a) => a.maxItems === 1 ? "select" : "multiselect",
        listValuesProvider: (a) => Object.entries(a.options ?? {}).map(([okey, o]) => (typeof (o) === "string" ?
            {
                label: o,
                name: okey
            } : { label: o.label, name: o.value }))
    },
    uiSchema: {
        paragraph: {
            "ui:widget": "textarea"
        },
        options: {
            "ui:field": "OptionsFields"
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
            options: {
                type: "object",
                additionalProperties: {
                    "type": "object",
                    required:["key","label"],
                    properties: {
                        key: { "type": "string", title: "Key", description: "The key used for the option, this is also the keyboard key used to select this option" },
                        label: { "type": "string", title: "Label", description:"The label shown to the end users" },
                        value: { "type": "number", title: "Value", description: "Used in calculations when this option is picked" },
                        clearOthers: { type: "boolean", "title": "Clear Others", description: "When set, this options clears other options already picked" },
                        clearOnOthers: { type: "boolean", "title": "Clear On Others", description: "When set, this option get cleared if another option is picked" }
                    }
                }
            },
            minItems: {
                title: "Minum Items Picked",
                type: "integer",
                default: 1
            },
            maxItems: {
                title: "Maxium Items Picked",
                type: "integer",
                default: 1
            },
        }
    }
}