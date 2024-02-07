
 

import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { mergeClasses } from "@fluentui/react-components";
import { JSONSchema7, JSONSchema7Definition } from "json-schema";

const endingSlideSchema = {
    label: "Ending Settings",
    uiSchema: {
        paragraph: {
            "ui:widget": "textarea"
        }
    },
    schema: {
        type: "object",
        required: ["text"],
        properties: {
            text: {
                title: "Placeholder",
                description: "The headline displayed to the end user when completed the form",
                type: "string"

            },
            paragraph: {
                title: "Paragraph",
                description: "The text displayed to the end user when when completed the form",
                type: "string"
            }
        }
    }
} as { label: string, uiSchema: any, schema: JSONSchema7 };


export const QuickFormEndingSettingsView = () => {

    const { quickformpayload: { ending }, updateQuickFormPayload: dispatch } = useQuickFormDefinition();
    const styles = useViewStyles();

    return (
        <div className={mergeClasses(styles.section, styles.sectionSlim)}>
            <Form templates={{ FieldTemplate: FieldTemplate, BaseInputTemplate: BaseInputTemplate }}
                validator={validator}
                {...endingSlideSchema}
                formData={ending}
                onChange={(a, b) => {
                    console.log("change", [a, b]);

                    dispatch(old => {
                        old.intro = { ...old.ending, ...a.formData }
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