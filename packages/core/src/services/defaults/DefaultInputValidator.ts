import { InputPropertiesTypes, QuestionModel, SliderProperties } from "../../model";
import { registerQuickFormService } from "../QuickFormServices";

export type ValidationResult = {
    isValid: boolean;
    message: string;
};

const validateEmail = (output: any): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = typeof output === 'string' && emailRegex.test(output);
    return {
        isValid: valid,
        message: valid ? "" : "Invalid email format.",
    };
};

const validatePhone = (output: any): ValidationResult => {
    const phoneRegex = /^[0-9]{10,}$/;
    const valid = typeof output === 'string' && phoneRegex.test(output);
    return {
        isValid: valid,
        message: valid ? "" : "Invalid phone format. Expected a string of digits (at least 10).",
    };
};

const validateSlider = (output: any, properties: SliderProperties): ValidationResult => {
    const valid = typeof output === 'number' && output >= properties.min && output <= properties.max;
    return {
        isValid: valid,
        message: valid ? "" : `Value must be a number between ${properties.min} and ${properties.max}.`,
    };
};

type ValidatorMap = {
    [inputType: string]: (output: any, properties?: any) => ValidationResult;
};

const validators: ValidatorMap = {
    email: validateEmail,
    phone: validatePhone,
    slider: validateSlider,
};

const validateQuestionOutput = <TProps extends InputPropertiesTypes>(questionModel: QuestionModel<TProps>): ValidationResult => {

    const validator = validators[questionModel.inputType];
    if (!validator) {
        return { isValid: false, message: `No validator available for inputType: ${questionModel.inputType}` };
    }

    return validator(questionModel.output, questionModel);
};

export const registerInputTypeValidator = (key: string, validator: (output: any, properties?: any) => ValidationResult) => {
    validators[key] = validator;
};

export { validateQuestionOutput };

registerQuickFormService("inputValidator", validateQuestionOutput);
