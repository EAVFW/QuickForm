import { ValidationResult } from "../../model/ValidationResult";
import { InputPropertiesTypes, QuestionModel } from "../../model";
import { registerQuickFormService } from "../QuickFormServices";
import { QuickformState } from "../../state";


const formatString = (template: string, ...args: any[]): string => {
    if (!template) return undefined;

    return template.replace(/{}/g, () => args.shift());
};
const validateText = (output: any, props: any, model: any, state: QuickformState): Promise<ValidationResult> => {
    const text = typeof output === 'string' ? output.trim() : '';
    const minLength = 1;
    const valid = text.length >= minLength;
    return Promise.resolve({
        isValid: valid,
        message: valid ? "" : formatString(state.data.validation?.messages?.TEXT_MUST_BE_AT_LEAST_CHARACTERS_LONG, minLength) ?? `Text must be at least ${minLength} characters long.`,
        validatedOutput: output,
    });
};

const validateMultilineText = (output: any, props: any, model: any, state: QuickformState): Promise<ValidationResult> => {
    const text = typeof output === 'string' ? output.trim() : '';
    const minLength = 1;
    const maxLength = 500;
    const valid = text.length >= minLength && text.length <= maxLength;
    return Promise.resolve( {
        isValid: valid,
        message: valid ? "" : formatString(state.data.validation?.messages?.TEXT_MUST_BE_BETWEEN_AND_CHARACTERS_LONG, minLength, maxLength) ?? `Text must be between ${minLength} and ${maxLength} characters long.`,
        validatedOutput: output,
    });
};

const validateEmail = (output: any, props: any, model: any, state: QuickformState): Promise<ValidationResult> => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid = typeof output === 'string' && emailRegex.test(output);
    return Promise.resolve( {
        isValid: valid,
        message: valid ? "" : state.data.validation?.messages?.INVALID_EMAIL_FORMAT ?? "Invalid email format.",
        validatedOutput: output,
    });
};

const validatePhone = async (output: any, props: any, model: any, state: QuickformState): Promise<ValidationResult> => {
    // Wait for 2 seconds to demo
    // await new Promise(resolve => setTimeout(resolve, 2000));

    const phoneRegex = /^[0-9]{8,}$/;
    const valid = typeof output === 'string' && phoneRegex.test(output);

    return Promise.resolve({
        isValid: valid,
        message: valid ? "" : state.data.validation?.messages?.INVALID_PHONE_FORMAT?? "Invalid phone format. Expected a string of digits (at least 8).",
        validatedOutput: output,
    });
};

type ValidatorMap = {
    [inputType: string]: ValidatorFunction<any, any, QuestionModel<any>, QuickformState>;
};

const validatorMap: ValidatorMap = {
    email: validateEmail,
    phone: validatePhone,
    text: validateText,
    multilinetext: validateMultilineText
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

export const withDefaultInputValidator = () =>
    registerQuickFormService("inputValidator", validateQuestionOutput);

