
import { Field, Textarea } from "@fluentui/react-components";
import { FieldProps, ObjectFieldTemplatePropertyType, ObjectFieldTemplateProps, WidgetProps, getUiOptions } from "@rjsf/utils";
import { RJSFSchema } from "@rjsf/utils/lib/types";

import { RichTextEditor } from "@eavfw/rich-text-editor";


export const RichTextField: React.FC<FieldProps> = ({ uiSchema = {}, schema: rawSchema, required, formData, registry, title, name, ...props }) => {

    const { fields, formContext, schemaUtils, translateString, globalUiOptions } = registry;
    const schema = schemaUtils.retrieveSchema(rawSchema, formData);

   
    const uiOptions = getUiOptions(uiSchema, globalUiOptions);

    const templateTitle = uiOptions.title ?? schema.title ?? title ?? name;
    const description = uiOptions.description ?? schema.description;
    return (<>
        <Field label={uiOptions.label === false ? '' : templateTitle} required={required} hint={description} >
            <RichTextEditor value={formData} onChange={(data) => props.onChange(data)} />
        </Field>

    </>);
};




