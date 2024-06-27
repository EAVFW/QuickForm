 


import Form from "@rjsf/fluentui-rc";
import validator from '@rjsf/validator-ajv8';
import { FieldTemplate } from "./rjsf/FieldTemplate";
import { BaseInputTemplate } from "./rjsf/BaseInputTemplate";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { mergeClasses } from "@fluentui/react-components";
import { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { JsonField, JsonWidget } from "./rjsf/Widgets/JsonWidget";
import { RegistryFieldsType } from "@rjsf/utils";
import { QuickformDesignerFields } from "./QuickFormQuestionsView";

export const QuickFormSourceView = () => {

    const { quickformpayload: { submit }, updateQuickFormPayload: dispatch } = useQuickFormDefinition();
    return (
        <pre>
            {JSON.stringify(updateQuickFormPayload, null, 4)}
        </pre>
    )

}