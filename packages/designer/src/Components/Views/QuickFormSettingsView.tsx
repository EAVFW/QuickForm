 
import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { mergeClasses } from "@fluentui/react-components";
import { JSONSchema7, JSONSchema7Definition } from "json-schema";

const inputSlideSchema = {
    label: "QuickForm Feature Flags",
    uiSchema: {
       
    },
    schema: {
        type: "object",
        required: ["text"],
        properties: {
            autoAdvanceSlides: {
                title: "Auto Advance Slides",
                description: "Enable such when all questions for the slide is filled it auto advances to next slide",
                type: "boolean"

            },
        }
    }
} as { label: string, uiSchema: any, schema: JSONSchema7 };


export const QuickFormSettingsView = () => {

    const { quickformpayload: { intro }, updateQuickFormPayload: dispatch } = useQuickFormDefinition();
    const styles = useViewStyles();

    return (
        <div className={mergeClasses(styles.section, styles.sectionSlim)}>
            <Form templates={{ FieldTemplate: FieldTemplate, BaseInputTemplate: BaseInputTemplate }}
                validator={validator}
                {...inputSlideSchema}
                formData={intro}
                onChange={(a, b) => {
                    console.log("change", [a, b]);

                    dispatch(old => {
                        if (!old.layout)
                            old.layout = {};

                        old.layout.autoAdvanceSlides = a.formData.autoAdvanceSlides;
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