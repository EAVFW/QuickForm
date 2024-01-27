// "intro" | "submit" | "ending"| "text" ;
// | "phone" | "email" | "dropdown" | "cpr" | "bankaccount"
// |  "firstName" | "lastName" | "industry" | "role" | "goal" | "email";

export type InputTypes =
    "text" |
    "multilinetext" |
    "dropdown" |
    "radio" |
    "slider" |
    "select";

export type InputType = {
    type: InputTypes;
    output: any;

}