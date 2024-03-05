import { defaultQuickFormTokens } from "../model/json-definitions/Layout";

function camelToVariables<T extends {}>(obj: T) {
    return Object.fromEntries(Object.entries(obj).map(([k, value]) =>
        [k, `var(--${k.replace(/[A-Z]/g, m => "-" + m.toLowerCase())})`])) as { [P in keyof T]: string }
};

export const quickformtokens = camelToVariables(defaultQuickFormTokens);