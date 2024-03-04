
import { Field, Textarea } from "@fluentui/react-components";
import { FieldProps, ObjectFieldTemplatePropertyType, ObjectFieldTemplateProps, WidgetProps, getUiOptions } from "@rjsf/utils";
import { RJSFSchema } from "@rjsf/utils/lib/types";


export const JsonWidget = function (props: WidgetProps) {
    const json = JSON.stringify(props.value);
    return (
        <textarea id={`json-field-${props.id}`} onClick={() => props.onChange(JSON.parse(props.value))}>
            {json}
        </textarea>
    );
};

export const JsonField: React.FC<FieldProps> = ({ uiSchema = {}, schema: rawSchema, required ,formData, registry, title, name, ...props }) => {

    const { fields, formContext, schemaUtils, translateString, globalUiOptions } = registry;
    const schema= schemaUtils.retrieveSchema(rawSchema, formData);

    const json = JSON.stringify(props.formData);
    const uiOptions = getUiOptions(uiSchema, globalUiOptions);

    const templateTitle = uiOptions.title ?? schema.title ?? title ?? name;
    const description = uiOptions.description ?? schema.description;
    return (<>
        <Field label={uiOptions.label === false ? '' : templateTitle} required={required} hint={description} >
            <Textarea id={`json-field-${props.id}`} value={json} onChange={(x, data) => props.onChange(JSON.parse(data.value))} />
        </Field>

    </>);
};


 

