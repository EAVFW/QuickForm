import { Field, InfoLabel, Input, InputProps, Label, LabelProps, makeStyles } from '@fluentui/react-components';
import {
    BaseInputTemplateProps,
    FormContextType,
    RJSFSchema,
    StrictRJSFSchema,
    ariaDescribedByIds,
    examplesId,
    getInputProps,
    labelValue
} from '@rjsf/utils';
import { ChangeEvent, FocusEvent } from 'react';
import { useFieldDescription } from './FieldTemplate';

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
    console.log("CraftEditor BaseInput", props);
    const classes = useStyles();
    const inputProps = getInputProps<T, S, F>(schema, type, options);
    // Now we need to pull out the step, min, max into an inner `inputProps` for material-ui
    const _onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>
        onChange(value === '' ? options.emptyValue : value);
    const _onBlur = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onBlur(id, value);
    const _onFocus = ({ target: { value } }: FocusEvent<HTMLInputElement>) => onFocus(id, value);
    const description = useFieldDescription();
    return (
        <>

            <Field
                //@ts-ignore
                label={{
                    // Setting children to a render function allows you to replace the entire slot.
                    // The first param is the component for the slot (Label), which we're ignoring to use InfoLabel instead.
                    // The second param are the props for the slot, which need to be passed to the InfoLabel.
                    children: (_: unknown, slotProps: LabelProps) => (
                        <InfoLabel {...slotProps} info={description}>
                            {labelValue(
                                <Label htmlFor={id} required={required} disabled={disabled} className={classes.label}>
                                    {label}
                                </Label>,
                                hideLabel
                            )}
                        </InfoLabel>
                    )
                }}  >
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
