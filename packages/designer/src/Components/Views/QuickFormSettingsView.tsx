
import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { mergeClasses } from "@fluentui/react-components";
import { JSONSchema7 } from "json-schema";
import { ModernQuickFormContainer, QuickForm, QuickFormProvider, defaultQuickFormTokens } from "@eavfw/quickform-core";
import { useState } from "react";

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

function registerToken(key: keyof typeof defaultQuickFormTokens, title: string, description: string, widget: string) {

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

registerToken("fontFamily", "Font Used", "The font used", "text");

registerToken("surface", "Surface Color", "The surface color....", "color");
registerToken("onSurface", "On Surface Color", "The color used on the surface....", "color");

registerToken("background", "Background Color", "The background color used on the webplace where the quickform is used...", "color");
registerToken("onBackground", "On Background Color", "The color used for text ontop of background color....", "color");

registerToken("secondary", "Secondary Color", "The secondary color used. This is default color for buttons, sliders and components used in input controls", "color");
registerToken("onSecondary", "On Secondary Color", "The color used for text ontop of secondary color....", "color");


registerToken("primary", "Primary Color", "The priamry color used. This is the color used for next buttons and other important elements. Also considered the brand colour", "color");
registerToken("onPrimary", "On Primary Color", "The color used for text ontop of primary color....", "color");

registerToken("error", "Error Color", "The colour used for containers with errors, aka background colour.", "color");
registerToken("onError", "On Error Color", "The color used for text ontop of error color....", "color");

registerToken("questionHeadlineFontSize", "Question Headline Font Size", "The size of the question headline...", "text");
registerToken("questionParagraphFontSize", "Question Paragraph Font Size", "The size of question paragraph...", "text");

type DemoDisplayTypes = "mobile" | "tablet" | "desktop";
type DemoDisplay = {
    [key in DemoDisplayTypes]: { width: number, height: number, title: string };

};

const demoDisplays: DemoDisplay = {
    mobile: {
        width: 320,
        height: 568,
        title: "Mobile"

    },
    tablet: {
        width: 768,
        height: 1024,
        title: "Tablet"
    },
    desktop: {
        width: 1366,
        height: 768,
        title: "Desktop"
    }

};

export const QuickFormSettingsView = () => {

    const { quickformpayload, updateQuickFormPayload: dispatch } = useQuickFormDefinition();
    const styles = useViewStyles();
    const [currentDemoDisplay, setCurrentDemoDisplay] = useState<DemoDisplayTypes>("mobile");
    const tokensSchema = inputSlideSchema.schema.properties?.quickFormTokens! as JSONSchema7;

    return (
        <div className={mergeClasses(styles.section, styles.sectionSlim)}>
            <Form templates={{ FieldTemplate: FieldTemplate, BaseInputTemplate: BaseInputTemplate }}
                validator={validator}
                {...inputSlideSchema}
                formData={quickformpayload.intro}
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
                <QuickFormProvider
                    // Hack to update the form when the payload changes
                    key={currentDemoDisplay + JSON.stringify(quickformpayload)}
                    definition={quickformpayload}
                    payload={{}}
                    tokens={tokensSchema.properties}
                >
                    <ModernQuickFormContainer
                        title="QuickForm Settings"
                        subtitle="Customize the look and feel of your QuickForm"
                    >
                        <QuickForm />
                    </ModernQuickFormContainer>

                </QuickFormProvider>
                <>
                </>
            </Form>
        </div>
    )
}