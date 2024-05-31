import { ValidationResult } from "../../model/ValidationResult";
import { InputPropertiesTypes, QuestionModel } from "../../model";
import { registerQuickFormService } from "../QuickFormServices";
import { QuickformState } from "../../state";

const validateText = (output: any): ValidationResult => {
    const text = typeof output === 'string' ? output.trim() : '';
    const minLength = 1;
    const valid = text.length >= minLength;
    return {
        isValid: valid,
        message: valid ? "" : `Text must be at least ${minLength} characters long.`,
        validatedOutput: output,
    };
};

const validateMultilineText = (output: any): ValidationResult => {
    const text = typeof output === 'string' ? output.trim() : '';
    const minLength = 1;
    const maxLength = 500;
    const valid = text.length >= minLength && text.length <= maxLength;
    return {
        isValid: valid,
        message: valid ? "" : `Text must be between ${minLength} and ${maxLength} characters long.`,
        validatedOutput: output,
    };
};

const validateEmail = (output: any): ValidationResult => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = typeof output === 'string' && emailRegex.test(output);
    return {
        isValid: valid,
        message: valid ? "" : "Invalid email format.",
        validatedOutput: output,
    };
};

const validatePhone = async (output: any): Promise<ValidationResult> => {
    // Wait for 2 seconds to demo
    // await new Promise(resolve => setTimeout(resolve, 2000));

    const phoneRegex = /^[0-9]{8,}$/;
    const valid = typeof output === 'string' && phoneRegex.test(output);

    return {
        isValid: valid,
        message: valid ? "" : "Invalid phone format. Expected a string of digits (at least 8).",
        validatedOutput: output,
    };
};

type ValidatorMap = {
    [inputType: string]: ValidatorFunction<any, any, QuestionModel<any>, QuickformState>;
};

const validatorMap: ValidatorMap = {
    email: (output: any) => Promise.resolve(validateEmail(output)),
    phone: (output: any) => Promise.resolve(validatePhone(output)),
    text: (output: any) => Promise.resolve(validateText(output)),
    multilinetext: (output: any) => Promise.resolve(validateMultilineText(output))
};

const validateQuestionOutput = async <TProps extends InputPropertiesTypes>(questionModel: QuestionModel<TProps>, state: QuickformState): Promise<ValidationResult> => {
    const validator = validatorMap[questionModel.inputType];
    if (!validator) {
        // This is to support if no validation is created for inputtype.. defaults to validated..
        return Promise.resolve({
            isValid: true,
            message: "",
            validatedOutput: questionModel.output,
            isValidating: false,
            timestamp: new Date().getTime()
        });
    }

    return await validator(questionModel.output, questionModel.inputProperties, questionModel,state);
};

export type ValidatorFunction<TAnswer, TInputProps, TQuestionModel extends QuestionModel<TInputProps>, TQuickFormState extends QuickformState> = (output: TAnswer, properties: TInputProps, questionModel: TQuestionModel, state: TQuickFormState) => Promise<ValidationResult>;

export const registerInputTypeValidator = <TAnswer, TInputProps, TQuestionModel extends QuestionModel<TInputProps>, TQuickFormState extends QuickformState>(key: string, validator: ValidatorFunction<TAnswer, TInputProps, TQuestionModel, TQuickFormState>) => {
    validatorMap[key] = validator as ValidatorFunction<any, any, QuestionModel<any>, QuickformState>;
};

registerQuickFormService("inputValidator", validateQuestionOutput);