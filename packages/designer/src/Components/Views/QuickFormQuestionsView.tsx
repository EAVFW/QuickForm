
import { removeNonAlphanumeric } from "@eavfw/utils";
import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { Dropdown, DropdownProps, Option, shorthands, mergeClasses, Field, Input } from '@fluentui/react-components';
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { QuickFormDesignerDefinition } from "../../Types/QuickFormDefinition";
import { ariaDescribedByIds } from "@rjsf/utils";
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";

import { InputComponentMetadata, resolveInputComponentSchemas } from "@eavfw/quickform-core";





const default_schemas = {
    "text": {
        label: "Text",
        uiSchema: {
            paragraph: {
                "ui:widget": "textarea"
            }
        },
        schema: {
            type: "object",

            properties: {
                text: {
                    title:"Text",
                    type: "string"
                },
                placeholder: {
                    title: "Placeholder",
                    type: "string"
                },
                paragraph: {
                    title:"Paragraph",
                    type: "string"
                }
            }
        }
    },
    "multilinetext": {
        label: "Multiline Text",
        uiSchema: {
            paragraph: {
                "ui:widget": "textarea"
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
                }
            }
        }
    },
    
} as { [key: string]: InputComponentMetadata };



export const QuickFormQuestionsView: React.FC<{
    dispatch: React.Dispatch<React.SetStateAction<QuickFormDesignerDefinition>>,
    currentQuestion?: string,
    questions: QuickFormDesignerDefinition["questions"]
}> = ({ currentQuestion, questions, dispatch }) => {

    const styles = useViewStyles();

    const schemas = { ...default_schemas, ...resolveInputComponentSchemas() };

    console.log("QuickFormQuestionsView", [currentQuestion, questions]);
    if (currentQuestion && currentQuestion in questions) {
        const question = questions[currentQuestion];
        const _onChange: DropdownProps["onOptionSelect"] = (e, d) => {
            dispatch(old => {
                if (d.optionValue) {
                    old.questions[currentQuestion].inputType = d.optionValue;
                    return { ...old };
                }
                return old;
            });
            console.log("onOptionSelect", [e, d]);
        }

        return (
            <div className={mergeClasses(styles.section, styles.sectionSlim)}>


                <Field
                    label="Question Title"
                    orientation="horizontal"
                    required={true} style={{ marginBottom: '25px' }}
                >
                    <Input
                        id="question-field-name"
                        name="question-field-name"
                        className='form-control'
                        value={question?.text??''}
                        onChange={(ev, data) => {
                            dispatch(old => {
                                let text = data.value;
                                let schemaName = removeNonAlphanumeric(text);
                                let logicalName = schemaName.toLowerCase();
                               
                                old.questions[logicalName] = { ...old.questions[currentQuestion], text, schemaName, logicalName };
                                delete old.questions[currentQuestion];

                                if (!old.__designer)
                                    old.__designer = {};

                                old.__designer.activeQuestion = logicalName;
                                return { ...old };
                            });
                        } }
                    />
                </Field>

                <Field
                    label="Type"
                    orientation="horizontal"
                    required={true} style={{ marginBottom: '25px' }}
                >
                    <Dropdown
                        id="question-input-type"
                        name="question-input-type"                        
                        className='form-control'
                        value={question.inputType ? schemas[question.inputType].label : ''}
                        
                        onOptionSelect={_onChange}
                        selectedOptions={question.inputType ?[question.inputType]:[]}
                        aria-describedby={ariaDescribedByIds<any>("question-input-type")}
                    >
                        {
                            Object.entries(schemas).map(([key,type], i) => {
                               
                                return (
                                    <Option text={type.label} key={key} value={key} >
                                        {type.label}
                                    </Option>
                                );
                            })}
                    </Dropdown>
                </Field>

                {question.inputType &&
                    <Form tagName="div" key={currentQuestion + question.inputType}
                        templates={{ FieldTemplate: FieldTemplate, BaseInputTemplate: BaseInputTemplate }}
                        validator={validator}
                        {...schemas[question.inputType]}
                        formData={questions[currentQuestion]}
                        onChange={(a, b) => {
                            console.log("change", [a, b]);

                            dispatch(old => {
                                old.questions[currentQuestion] = { ...old.questions[currentQuestion], ...a.formData };
                                return { ...old };
                            });
                        }}
                    >
                        <>
                        </>
                    </Form>
                }
            </div>
        )

        
    }

    return <div>QuickFormQuestionsView</div>;
}