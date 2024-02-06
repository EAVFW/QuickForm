
import { removeNonAlphanumeric } from "@eavfw/utils";
import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { ChangeEvent, FocusEvent } from 'react';

import { Field, Text, makeStyles, tokens } from '@fluentui/react-components';
import {
    FieldTemplateProps,
    FormContextType,
    RJSFSchema,
    StrictRJSFSchema,
    getTemplate,
    getUiOptions,
} from '@rjsf/utils';

/** The `FieldTemplate` component is the template used by `SchemaField` to render any field. It renders the field
 * content, (label, description, children, errors and help) inside of a `WrapIfAdditional` component.
 *
 * @param props - The `FieldTemplateProps` for this component
 */
export function FieldTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>(props: FieldTemplateProps<T, S, F>) {
    const {
        id,
        children,
        classNames,
        style,
        disabled,
        displayLabel,
        hidden,
        label,
        onDropPropertyClick,
        onKeyChange,
        readonly,
        required,
        rawErrors = [],
        errors,
        help,
        description,
        rawDescription,
        schema,
        uiSchema,
        registry,
    } = props;
    const uiOptions = getUiOptions<T, S, F>(uiSchema);
    const WrapIfAdditionalTemplate = getTemplate<'WrapIfAdditionalTemplate', T, S, F>(
        'WrapIfAdditionalTemplate',
        registry,
        uiOptions
    );

    if (hidden) {
        return <div style={{ display: 'none' }}>{children}</div>;
    }
    return (
        <WrapIfAdditionalTemplate
            classNames={classNames}
            style={style}
            disabled={disabled}
            id={id}
            label={label}
            onDropPropertyClick={onDropPropertyClick}
            onKeyChange={onKeyChange}
            readonly={readonly}
            required={required}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
        >
            <Field validationState={rawErrors.length ? 'error' : undefined} required={required}>
                {children}
                {displayLabel && rawDescription ? (
                    <Text as='p' block style={{ marginTop: 0, marginBottom: 0 }}>
                        {description}
                    </Text>
                ) : null}
                {errors}
                {help}
            </Field>
        </WrapIfAdditionalTemplate>
    );
}

import { Input, InputProps, Label } from '@fluentui/react-components';
import {
    ariaDescribedByIds,
    BaseInputTemplateProps,
    examplesId,
    getInputProps,
    labelValue,
} from '@rjsf/utils';

const useStyles = makeStyles({
    input: {
        width: '100%',
    },
    label: {
        paddingTop: '2px',
        paddingBottom: '2px',
        marginBottom: '2px',
    },
});

/** The `BaseInputTemplate` is the template to use to render the basic `<input>` component for the `core` theme.
 * It is used as the template for rendering many of the <input> based widgets that differ by `type` and callbacks only.
 * It can be customized/overridden for other themes or individual implementations as needed.
 *
 * @param props - The `WidgetProps` for this template
 */
export function BaseInputTemplate<
    T = any,
    S extends StrictRJSFSchema = RJSFSchema,
    F extends FormContextType = any
>(props: BaseInputTemplateProps<T, S, F>) {
    const {
        id,
        placeholder,
        required,
        readonly,
        disabled,
        type,
        value,
        label,
        hideLabel,
        onChange,
        onChangeOverride,
        onBlur,
        onFocus,
        autofocus,
        options,
        schema,
    } = props;
    const classes = useStyles();
    const inputProps = getInputProps<T, S, F>(schema, type, options);
    // Now we need to pull out the step, min, max into an inner `inputProps` for material-ui
    const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
        onChange(value === '' ? options.emptyValue : value);
    const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onBlur(id, value);
    const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onFocus(id, value);
    return (
        <>

            <Field label={labelValue(
                <Label htmlFor={id} required={required} disabled={disabled} className={classes.label}>
                    {label}
                </Label>,
                hideLabel
            )} orientation="horizontal">
                <Input
                    id={id}
                    name={id}
                    placeholder={placeholder}
                    autoFocus={autofocus}
                    required={required}
                    disabled={disabled || readonly}
                    {...(inputProps as InputProps)}
                    input={{
                        className: classes.input,
                        // Due to Fluent UI this does not work correctly
                        list: schema.examples ? examplesId<T>(id) : undefined,
                    }}
                    value={value || value === 0 ? value : ''}
                    onChange={onChangeOverride || _onChange}
                    onFocus={_onFocus}
                    onBlur={_onBlur}
                    aria-describedby={ariaDescribedByIds<T>(id, !!schema.examples)}
                />
                {Array.isArray(schema.examples) && (
                    <datalist id={examplesId<T>(id)}>
                        {(schema.examples as string[])
                            .concat(schema.default && !schema.examples.includes(schema.default) ? ([schema.default] as string[]) : [])
                            .map((example: any) => {
                                return <option key={example} value={example} />;
                            })}
                    </datalist>
                )}
            </Field>
        </>
    );
}


const schemas = {
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
    }
} as { [key: string]: { label: string, uiSchema: any, schema: JSONSchema7 } };
import { Dropdown, DropdownProps, Option, shorthands, mergeClasses } from '@fluentui/react-components';
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { QuickFormDef } from "../../QuickFormDesigner";



export const QuickFormQuestionsView: React.FC<{
    dispatch: React.Dispatch<React.SetStateAction<QuickFormDef>>,
    currentQuestion?: string,
    questions: QuickFormDef["questions"]
}> = ({ currentQuestion, questions, dispatch }) => {

    const styles = useViewStyles();
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
                    <Form key={currentQuestion + question.inputType}
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