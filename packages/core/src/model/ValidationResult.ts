export type ValidationResult = {
    isValid: boolean;
    message: string;
    /**
     * The output of the validation process. This property holds the validated value if the output is valid. 
     * For invalid cases, it can either hold the original output or a modified version that represents a 
     * corrected value based on the validation logic. This facilitates not just flagging invalid inputs but also
     * guiding towards correction.
     */
    validatedOutput: any;
};