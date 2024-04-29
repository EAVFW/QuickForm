import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { Button, mergeClasses } from "@fluentui/react-components";
import { useEffect, useState } from "react";


const introSlideSchema = {
    label: "Intro Settings",
    uiSchema: {
        text: {
            "ui:widget": "textarea"
        },
        paragraph: {
            "ui:widget": "textarea"
        }
    },
    schema: {
        type: "object",
        required: ["text"],
        properties: {
            text: {
                title: "Text",
                description: "The headline displayed to the end user when first loading the form",
                type: "string"
            },
            paragraph: {
                title: "Paragraph",
                description: "The text displayed to the end user when first loading the form",
                type: "string"
            },
            buttonText: {
                title: "Start Button Text",
                type: "string"
            },
        }
    }
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
            <div style={{ display: "flex", justifyContent: "center", alignItems: "end", marginTop: "10px" }}>
                <Button style={{ marginLeft: 'auto' }} onClick={handleToggleIntroClicked} > {enableIntro ? "Disable intro" : "Enable intro"} </Button>
            </div>
            {enableIntro && (
                <Form
                    templates={{ FieldTemplate, BaseInputTemplate }}
                    validator={validator}
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