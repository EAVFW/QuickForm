import { Field, InfoLabel, LabelProps, Text } from '@fluentui/react-components';
import {
    FieldTemplateProps,
    FormContextType,
    RJSFSchema,
    StrictRJSFSchema,
    getTemplate,
    getUiOptions,
} from '@rjsf/utils';
import { createContext, useContext } from 'react';

const FieldTemplateDescription = createContext<string | undefined>(undefined);
export const useFieldDescription = ()=> useContext(FieldTemplateDescription);
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
    console.log("CraftEditor FieldTemplate", props);
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
        ><FieldTemplateDescription.Provider value={description}>
            <Field  validationState={rawErrors.length ? 'error' : undefined} required={required}>
                {children}
                
                {/*{displayLabel && rawDescription ? (*/}
                {/*    <div style={{display:"grid","gridTemplateColumns":"33% 1fr"} }>*/}

                {/*        <Text as='p' block style={{ marginTop: 0, marginBottom: 0, gridColumnStart: uiSchema?.['ui:widget'] === 'textarea' ? 1 : 2, gridColumnEnd: uiSchema?.['ui:widget'] === 'textarea' ? -1 : -1 }}>*/}
                {/*        {description}*/}
                {/*        </Text>*/}
                {/*    </div>*/}
                {/*) : null}*/}
                {errors}
                {help}
                </Field>
            </FieldTemplateDescription.Provider>
        </WrapIfAdditionalTemplate>
    );
}
