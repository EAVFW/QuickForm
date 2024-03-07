import { QuestionModel } from "../../model";
import { QuestionJsonModel } from "../../model/json-definitions/JsonDataModels";
import { registerQuickFormService, resolveQuickFormService } from "../QuickFormServices";

function mapJsonQuestionToModelQuestion(questionKey: string, question: QuestionJsonModel, value?: any): QuestionModel {

    const parseInputProperties = resolveQuickFormService("inputTypePropertiesTransformer");
    const logger = resolveQuickFormService("logger");

    if (question.inputType === "dropdown" && question.dataType === "boolean") value = value === true ? 'Y' : value === false ? 'N' : '';

    logger.log("Transforming Question {key}: {@question} with value {@value}", questionKey, question, value);

    return {
        answered: typeof (value) !== "undefined" && value !== '' && value !== null,
        dataType: question.dataType ?? "string",
        inputProperties: parseInputProperties(question),
        inputType: question.inputType,
        logicalName: question.logicalName ?? questionKey,
        output: value ?? '',
        paragraph: question.paragraph,
        placeholder: question.placeholder ?? '',
        questionKey: questionKey,
        text: question.text,
        visible: question.visible ? {
            ...question.visible,
            isVisible: question.visible.isVisible ?? false
        } : undefined
    };
}
registerQuickFormService("questionTransformer", mapJsonQuestionToModelQuestion);