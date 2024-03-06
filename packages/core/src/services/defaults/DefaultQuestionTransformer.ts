import { QuestionModel } from "../../model";
import { QuestionJsonModel } from "../../model/json-definitions/JsonDataModels";
import { registerQuickFormService, resolveQuickFormService } from "../QuickFormServices";

function mapJsonQuestionToModelQuestion(questionKey: string, question: QuestionJsonModel, value?: any): QuestionModel {

    const parseInputProperties = resolveQuickFormService("inputTypePropertiesTransformer");
    const logger = resolveQuickFormService("logger");

    if (question.inputType === "dropdown" && question.dataType === "boolean")
        value = value === true ? 'Y' : value === false ? 'N' : '';


    logger.log("Transforming Question {key}: {@question} with value {@value}", questionKey, question, value);

    return {
        questionKey: questionKey,
        logicalName: question.logicalName ?? questionKey,
        inputType: question.inputType,
        dataType: question.dataType ?? "string",
        text: question.text,
        placeholder: question.placeholder ?? '',
        paragraph: question.paragraph,
        answered: typeof (value) !== "undefined" && value !== '' && value !== null,
        inputProperties: parseInputProperties(question),
        output: value ?? '',
        visible: question.visible
    } as QuestionModel;
}
registerQuickFormService("questionTransformer", mapJsonQuestionToModelQuestion);