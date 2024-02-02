// "intro" | "submit" | "ending"| "text" ;
// | "phone" | "email" | "dropdown" | "cpr" | "bankaccount"
// |  "firstName" | "lastName" | "industry" | "role" | "goal" | "email";

export type InputTypes =
    "text" |
    "multilinetext" |
    "dropdown"
    // "radio" |
    // "slider" |
    // "select";
    ;

export type InputType = {
    type: InputTypes;
    output: any;
}

export type DropDownProperties = {
    readonly maxItems?: string;
    readonly minItems?: string;
    readonly options?: {
        [key: string]: string;
    }
}

export type RadioProperties = {
    // TODO
}

export type SliderProperties = {
    // TODO
}