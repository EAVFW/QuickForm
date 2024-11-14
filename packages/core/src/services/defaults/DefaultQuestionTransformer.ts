import { QuestionModel } from "../../model";
import { QuestionJsonModel } from "../../model/json-definitions/JsonDataModels";
import { registerQuickFormService, resolveQuickFormService } from "../QuickFormServices";

function mapJsonQuestionToModelQuestion(questionKey: string, question: QuestionJsonModel, value?: any): QuestionModel {
    const logger = resolveQuickFormService("logger");
    const parseInputProperties = resolveQuickFormService("inputTypePropertiesTransformer");

    if (question.inputType === "dropdown" && question.dataType === "boolean") {
        value = value === true ? 'Y' : value === false ? 'N' : '';
    }
    // Payload value is prioritized over defaultValue
    if (!value || typeof value === "undefined") {
        value = question.defaultValue;
    }

    const hasDefaultValueOrPayload = typeof (value) !== "undefined" && value !== '' && value !== null;

    logger.log("Transforming Question {key}: {@question} with value {@value}", questionKey, question, value);

    return {
        answered: hasDefaultValueOrPayload,
        isRequired: question.isRequired ?? false,
        dataType: question.dataType ?? "string",
        inputProperties: parseInputProperties(question),
        inputType: question.inputType ?? "text",
        intermediate: false,
        logicalName: question.logicalName ?? questionKey,
        output: value ?? '',
        paragraph: question.paragraph,
        placeholder: question.placeholder ?? '',
        questionKey: questionKey,
        text: question.text,
        visited: false,
        visible: question.visible ? {
            isVisible: question.visible.isVisible ?? false,
            ...question.visible
        } : undefined,
        validationResult: {
            isValid: hasDefaultValueOrPayload ?? false,
            message: "",
            validatedOutput: value ?? '',
            isValidating: false,
            timestamp: 0
        }
    };
}

registerQuickFormService("questionTransformer", mapJsonQuestionToModelQuestion);