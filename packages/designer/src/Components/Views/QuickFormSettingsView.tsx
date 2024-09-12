
import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { makeStyles, mergeClasses } from "@fluentui/react-components";
import { JSONSchema7 } from "json-schema";
import { defaultQuickFormTokens } from "@eavfw/quickform-core";
import { Controls } from "@eavfw/apps";
import { IconEnum } from "@eavfw/quickform-core/src/components/icons/IconResolver";

const inputSlideSchema = {
    label: "QuickForm Feature Flags",
    uiSchema: {
        tokens: {
        },
        defaultSlideButtonIcon: {
            "ui:widget": "select"
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
            showPressEnter: {
                title: "Show Press Enter",
                description: "Enable to show a message to press enter next to the button on the slide",
                type: "boolean"
            },
            defaultSlideButtonIcon: {
                title: "Default Slide Button Icon",
                description: "The icon used for the slide button",
                type: "string",
                enum: Object.values(IconEnum),
            },
            tokens: {
                title: "Tokens (Variables)",
                type: "object",
                properties: {

                }
            }
        }
    }
} as { label: string, uiSchema: any, schema: JSONSchema7 };

function registerToken(key: keyof typeof defaultQuickFormTokens, title: string, description: string, widget: string) {

    const tokensSchema = inputSlideSchema.schema.properties?.tokens! as JSONSchema7;
    const uiSchema = inputSlideSchema.uiSchema.tokens;
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

// Typography
registerToken("fontFamily", "Font Used", "The font used", "text");
registerToken("headlineFontSize", "Headline Font Size", "The size of the headline...", "text");
registerToken("subtitleFontSize", "Subtitle Font Size", "The size of the subtitle...", "text");
registerToken("questionHeadlineFontSize", "Question Headline Font Size", "The size of the question headline...", "text");
registerToken("questionParagraphFontSize", "Question Paragraph Font Size", "The size of question paragraph...", "text");
registerToken("slideButtonIconSize", "Slide Button Icon Size", "The size of icon on slidebuttons...", "text");


// Colors
registerToken("primary", "Primary Color", "The primary color used. This is the color used for primary buttons and other important elements. Also considered the brand colour", "color");
registerToken("onPrimary", "On Primary Color", "The color used for text on top of primary color....", "color");
registerToken("secondary", "Secondary Color", "The secondary color used. This is default color for buttons, sliders and components used in input controls", "color");
registerToken("onSecondary", "On Secondary Color", "The color used for text on top of secondary color....", "color");
registerToken("error", "Error Color", "The colour used for containers with errors, aka background colour.", "color");
registerToken("onError", "On Error Color", "The color used for text on top of error color....", "color");
registerToken("surface", "Surface Color", "The surface color....", "color");
registerToken("onSurface", "On Surface Color", "The color used on the surface....", "color");
registerToken("background", "Background Color", "The background color used on the webplace where the quickform is used...", "color");
registerToken("onBackground", "On Background Color", "The color used for text on top of background color....", "color");

const useQuickformSettingsStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: 'row',
    },
    previewContainer: {
        overflow: 'scroll'
    }
});

export const QuickFormSettingsView = () => {
    const { quickformpayload, updateQuickFormPayload: dispatch } = useQuickFormDefinition();
    const styles = useViewStyles();
    const quickformSettingsStyles = useQuickformSettingsStyles();
    const PreviewComponent = Controls["QuickFormSettingsViewPreviewComponent"];
    console.log("quickformpayloadV1", JSON.stringify(quickformpayload.layout));
    console.log("ENUM", Object.values(IconEnum));
    return (
        <div className={mergeClasses(styles.section, quickformSettingsStyles.container)}>
            <div className={mergeClasses(styles.sectionSlim, styles.section)}>
                <Form templates={{ FieldTemplate, BaseInputTemplate }}
                    validator={validator}
                    {...inputSlideSchema}
                    formData={quickformpayload.layout}
                    onChange={(a, b) => {
                        console.log("change", [a, b]);
                        dispatch(old => {
                            if (!old.layout) old.layout = {};
                            old.layout.autoAdvanceSlides = a.formData.autoAdvanceSlides;
                            old.layout.showPressEnter = a.formData.showPressEnter;
                            old.layout.tokens = { ...a.formData.tokens };
                            old.layout.defaultSlideButtonIcon = a.formData.defaultSlideButtonIcon;
                            console.log("quickformpayload_old", { ...old, layout: { ...old.layout } });
                            return { ...old, layout: { ...old.layout } };
                        });
                    }}
                >
                    <></>
                </Form>
            </div>
            {PreviewComponent &&
                <div className={mergeClasses(styles.section, quickformSettingsStyles.previewContainer)}>
                    <PreviewComponent />
                </div>
            }
        </div>
    );
};