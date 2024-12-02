import { InputComponentType, registerInputComponent,IconType } from "@eavfw/quickform-core";
import { BaseInputComponent } from "../baseinput/BaseInputComponent";
import { emailInputSchema } from "./EmailInputSchema"; 

export type EmailProperties = {
    inputType: "email";
    defaultValue?: string;
    beforeIcon?: IconType;
    afterIcon?: IconType
}

export const EmailInput: InputComponentType<EmailProperties> = (props) => {
    return <BaseInputComponent type="email" {...props} />
}

/* This property assignment grants QuickformDesigner metadata information about which properties the inputcomponent needs */
EmailInput.inputSchema = emailInputSchema;
registerInputComponent("email", EmailInput);