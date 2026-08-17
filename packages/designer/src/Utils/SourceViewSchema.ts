import { languages } from "monaco-editor";

export const sourceViewSchema =
  [
    {
      uri: "http://myserver/submitfields.json", // id of the first schema
      fileMatch: ["*"], // associate with our model
      schema: {
        type: "object",
        properties: {
          uiSchema: {
            $ref: "http://myserver/uiSchema.json" // reference the second schema
          }
        }
      }
    },

    {
      uri: "http://myserver/uiSchema.json", // id of the first schema
      schema: {
        type: "object",
        properties: {
          "ui:label": {
            type: "string"
          },
        },
        "patternProperties": {
          "^\\w+$": {
            "type": "object",
            "properties": {
              "ui:label": { "type": "string" },
              "ui:placeholder": { "type": "string" },
              "ui:inputProps": { $ref: "http://myserver/inputProps.json" }
            }
          }
        }
      }
    },
    {
      uri: "http://myserver/inputProps.json", // id of the first schema
      schema: {
        type: "object",
        properties: {
          "beforeIcon": { enum: ["Email", "User"] },
          "afterIcon": { enum: ["Email", "User"] },
        }
      }
    }
  ]