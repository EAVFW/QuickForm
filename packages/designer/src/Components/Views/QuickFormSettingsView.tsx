 
import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { mergeClasses } from "@fluentui/react-components";
import { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { defaultQuickFormTokens } from "@eavfw/quickform-core";



const inputSlideSchema = {
    label: "QuickForm Feature Flags",
    uiSchema: {
        quickFormTokens: {

        }
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
            quickFormTokens: {
                title: "Tokens (Variables)",
                type: "object",
                properties: {

                }
            }
        }
    }
} as { label: string, uiSchema: any, schema: JSONSchema7 };

function registerToken(key: keyof typeof defaultQuickFormTokens, title:string, description:string, widget:string) {

    const tokensSchema = inputSlideSchema.schema.properties?.quickFormTokens! as JSONSchema7;
    const uiSchema = inputSlideSchema.uiSchema.quickFormTokens;
    if (tokensSchema && tokensSchema.properties) {
        tokensSchema.properties[key] = {
            title,
            description,
            type: "string",
            default: defaultQuickFormTokens[key]
        }
    }
    if (widget) {
        uiSchema[key] = { "ui:widget": widget }
    }
}

registerToken("surface", "Surface Color", "The surface color....", "color");
registerToken("onSurface", "On Surface Color", "The color used on the surface....", "color");
registerToken("questionTextFontSize", "Question Text Font Size", "The size of question text...", "text");
registerToken("questionParagraphFontSize", "Question Paragraph Font Size", "The size of question paragraph...", "text");

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