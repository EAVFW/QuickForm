 


import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { mergeClasses } from "@fluentui/react-components";
import { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { JsonField, JsonWidget } from "./rjsf/Widgets/JsonWidget";
import { RegistryFieldsType } from "@rjsf/utils";

const submitSlideSchema = {
    label: "Ending Settings",
    uiSchema: {
        text: {
            "ui:widget": "textarea"
        },
        paragraph: {
            "ui:widget": "textarea"
        },
        submitFields: {
            "ui:widget": "jsonWidget",
         //   "ui:ObjectFieldTemplate": JsonFieldTemplate
            "ui:field":"jsonField"
        }
    },
    schema: {
        type: "object",
        required: ["text"],
        properties: {
            text: {
                title: "Text",
                description: "The headline displayed to the end user when about to submit the form",
                type: "string"

            },
            paragraph: {
                title: "Paragraph",
                description: "The text displayed to the end user when about to submit the form",
                type: "string"

            },
            submitFields: {
                type: "object"
            },
            buttonText: {
                title: "Submit button text",
                description:"The text on the button for submitting the form",
                type: "string"
            },
        }
    }
} as { label: string, uiSchema: any, schema: JSONSchema7 };


export const QuickFormSubmitSettingsView = () => {

    const { quickformpayload: { submit }, updateQuickFormPayload: dispatch } = useQuickFormDefinition();
    const styles = useViewStyles();

    return (
        <div className={mergeClasses(styles.section, styles.sectionSlim)}>
            <Form templates={{ FieldTemplate: FieldTemplate, BaseInputTemplate: BaseInputTemplate }} fields={{ "jsonField": JsonField }} widgets={{ jsonWidget: JsonWidget }}
                validator={validator}
                {...submitSlideSchema}
                formData={submit}
                onChange={(a, b) => {
                    console.log("change", [a, b]);

                    dispatch(old => {
                        old.submit = { ...old.submit, ...a.formData }
                        return { ...old };
                    });
                }}
            >
                <>
                </>
            </Form>
        </div>
    )

}