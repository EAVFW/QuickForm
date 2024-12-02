export * from "./email/EmailInput";
export * from "./multiline/MultilineInput";
export * from "./phone/PhoneInput";
export * from "./text/TextInput";
export * from "./baseinput/BaseInputComponent";

import { registerEmailInput } from "./email/EmailInput";
import { registerMultilineInput } from "./multiline/MultilineInput";
import { registerPhoneInput } from "./phone/PhoneInput";
import { registerTextInput } from "./text/TextInput";

export const registerCoreInputComponents = () => {

    registerTextInput();
    registerMultilineInput();
    registerPhoneInput();
    registerEmailInput();
}