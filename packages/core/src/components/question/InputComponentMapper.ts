import React from "react";
import {
  // EmailInput,
  // FirstNameInput,
  DropDownInput,
  // IndustryInput,
  // LastNameInput,
  // RoleInput,
  // CPRInput,
  // BankAccountInput,
  TextInput,
  MultilineInput,
  // PhoneInput,
  // Ending,
  Submit,

} from "./input-types/index";


export const inputTypeComponentMap = {
  intro: Submit,
  submit: Submit,
  ending: Submit,
  // firstName: FirstNameInput, 
  text: TextInput,
  multilinetext: MultilineInput,
  // lastName: LastNameInput,
  // industry: IndustryInput,
  // role: RoleInput,
  // goal: DropDownInput,
  // email: EmailInput,
  dropdown: DropDownInput,
  none: Submit,
  // phone: PhoneInput,
  // cpr: CPRInput,
  // bankaccount: BankAccountInput,
};


export type InputComponentDictionary = {
  [key: string]: React.ReactNode;
}

export let inputComponents: InputComponentDictionary = {};

const RegisterComponent = (key: string, component: React.ReactNode) => {
  inputComponents[key] = component;
}
