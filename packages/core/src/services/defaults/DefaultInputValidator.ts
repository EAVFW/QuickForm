import { ValidationResult } from "../../model/ValidationResult";
import { InputPropertiesTypes, QuestionModel, SliderProperties } from "../../model";
import { registerQuickFormService } from "../QuickFormServices";

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
    // Wait for 4 seconds
    await new Promise(resolve => setTimeout(resolve, 4000));

    const phoneRegex = /^[0-9]{8,}$/;
    const valid = typeof output === 'string' && phoneRegex.test(output);

    return {
        isValid: valid,
        message: valid ? "" : "Invalid phone format. Expected a string of digits (at least 8).",
        validatedOutput: output,
    };
};


const validateSlider = (output: any, properties: SliderProperties): ValidationResult => {
    const valid = typeof output === 'number' && output >= properties.min && output <= properties.max;
    return {
        isValid: valid,
        message: valid ? "" : `Value must be a number between ${properties.min} and ${properties.max}.`,
        validatedOutput: output,
    };
};

type ValidatorMap = {
    [inputType: string]: (output: any, properties?: any) => Promise<ValidationResult>;
};

const validatorMap: ValidatorMap = {
    email: (output: any) => Promise.resolve(validateEmail(output)),
    phone: (output: any) => Promise.resolve(validatePhone(output)),
    slider: (output: any, properties: SliderProperties) => Promise.resolve(validateSlider(output, properties)),
};

const validateQuestionOutput = async <TProps extends InputPropertiesTypes>(questionModel: QuestionModel<TProps>): Promise<ValidationResult> => {
    const validator = validatorMap[questionModel.inputType];
    if (!validator) {
        return Promise.resolve({ isValid: false, message: `No validator available for inputType: ${questionModel.inputType}`, validatedOutput: questionModel.output });
    }

    return await validator(questionModel.output, questionModel.inputProperties);
};

export const registerInputTypeValidator = (key: string, validator: (output: any, properties?: any) => Promise<ValidationResult>) => {
    validatorMap[key] = validator;
};

registerQuickFormService("inputValidator", validateQuestionOutput);