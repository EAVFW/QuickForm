import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { Button, mergeClasses } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { JSONSchema7TypeName, JSONSchema7 } from "json-schema";
import React from "react";
import { RichTextField } from "./rjsf/Widgets/RichTextWidget";
import { QuickformDesignerFields } from "./QuickFormQuestionsView";

const introSlideSchema = {
    label: "Intro Settings",
    uiSchema: {
        text: {
             
            ... "QF_IntroSideTextField" in QuickformDesignerFields ? ({
                "ui:field": "QF_IntroSideTextField"
            }) : ({}),
            "ui:help": "The headline displayed to the end user when first loading the form"
        },
        paragraph: {
            ... "QF_IntroSideParagraphField" in QuickformDesignerFields ? ({
                "ui:field": "QF_IntroSideParagraphField"
            }) : ({}),
            "ui:help": "The text displayed to the end user when first loading the form"
        },
        buttonText: {
            "ui:widget": "text"
        }
    },
    schema: {
        type: "object",
        required: ["text"],
        properties: {
            text: {
                title: "Text",
                description: "The headline displayed to the end user when first loading the form",
                type: "string" as JSONSchema7TypeName
            },
            paragraph: {
                title: "Paragraph",
                description: "The text displayed to the end user when first loading the form",
                type: "string" as JSONSchema7TypeName
            },
            buttonText: {
                title: "Start Button Text",
                description: "The text displayed on the button to start the form",
                type: "string" as JSONSchema7TypeName
            },
        }
    } as JSONSchema7
};

export const QuickFormIntroSettingsView = () => {
    const { quickformpayload: { intro }, updateQuickFormPayload: dispatch } = useQuickFormDefinition();
    const styles = useViewStyles();
    const [enableIntro, setEnableIntro] = useState(intro != null);

    const handleToggleIntroClicked = () => {
        const currentEnableIntro = enableIntro;
        setEnableIntro(!enableIntro);
        dispatch(old => {
            if (old.intro && currentEnableIntro === true) {
                delete old.intro;
            }

            return { ...old }

        })
    }

    useEffect(() => {
        dispatch(old => {
            if (!enableIntro) {
                delete old.intro;
            }
            return { ...old };
        });
    }, [enableIntro, dispatch]);

    return (
        <div className={mergeClasses(styles.section, styles.sectionSlim)}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: enableIntro ? "" : "end", marginTop: "10px" }}>
                <Button style={{ marginLeft: enableIntro ? "auto" : "", marginRight: enableIntro ? "" : "auto", marginBottom: '10px' }} onClick={handleToggleIntroClicked} > {enableIntro ? "Disable intro" : "Enable intro"} </Button>
            </div>
            {enableIntro && (
                <Form
                    templates={{ FieldTemplate, BaseInputTemplate }}
                    validator={validator}
                    fields={{  ...QuickformDesignerFields }}
                    {...introSlideSchema}
                    formData={intro}
                    onChange={(a) => {
                        dispatch(old => {
                            return { ...old, intro: { ...old.intro, ...a.formData } };
                        });
                    }}
                >
                </Form>
            )}
        </div>
    );
};