"use client";
import { resolveInputComponent, type QuickformState } from "@eavfw/quickform-core";
import type { QuestionModel } from "@eavfw/quickform-core/src/model";
import { VisibilityRuleEngineContext, registerVisibilityEngine } from "@eavfw/quickform-core/src/state/action-handlers/VisibilityHandler";
import type { RuleGroupType, RuleType, defaultOperators } from "react-querybuilder";

type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type operators = ArrayElement<(typeof defaultOperators)>["name"] | "is-visible" | "has-product-option";

function isArrayType<T>(obj: T | T[], isArray: boolean): obj is Array<T> {
    return isArray;
}
function evalRule(rule: RuleType, context: VisibilityRuleEngineContext, currentQuestion: QuestionModel): boolean {
    
    const value = rule.value;
    const targetQuestion = context.questions[rule.field];
    const metadata = resolveInputComponent(targetQuestion.inputType).inputSchema!;
    const type = "type" in metadata.field! ? metadata.field.type : metadata.field!.typeProvider(targetQuestion.inputProperties!);
    const isArray = type === "select" || type === "multiselect";
    const isMultiArray = type === "multiselect";
    const sourceValue = targetQuestion.output;
    console.log("Evaluating Rule " + rule.operator + " " + rule.field, [rule, context, targetQuestion,currentQuestion]);
    /**
     * 
     * OBS == comparison is used to compare values, this is not the same as === in javascript. "1" == 1 is true, "1" === 1 is false
     * OBSOBS - == not working as "" == 0 is true.
     */
    switch (rule.operator as operators) {
        case "!=":
            return !(targetQuestion.answered && isArrayType<string>(sourceValue, isMultiArray) && isArrayType(value, isArray) ? isMultiArray ? sourceValue.every(sv => value.indexOf(sv) !== -1) : sourceValue  === value : value === sourceValue);
        //  case "<": return false;
        //   case "<=": return false;
        case "=":
            console.log("EvalRule", [targetQuestion, metadata, type, sourceValue, isMultiArray, value, isArray]);
            return targetQuestion.answered && isArrayType<string>(sourceValue, isMultiArray) && isArrayType(value, isArray) ?
        
                isMultiArray ? sourceValue.every(sv => value.indexOf(sv) !== -1) : value?.toString() === sourceValue?.toString()
            : value?.toString() === sourceValue?.toString();
        //   case ">": return false;
        //    case ">=": return false;
        //    case "beginsWith": return false;
        //   case "between": return false;
        //    case "contains": return false;
        //   case "doesNotContain": return false;
        //   case "doesNotBeginWith": return false;
        //   case "doesNotEndWith": return false;
        //   case "endsWith": return false;
        case "in": return targetQuestion.answered && isArrayType<string>(sourceValue, isMultiArray) && isArrayType(value, isArray) ? isMultiArray ? sourceValue.some(sv => value.indexOf(sv) !== -1) : sourceValue.some(sv => sv === value[0]) : value === sourceValue;
        case "is-visible": return targetQuestion.visible?.isVisible ?? false;
        case "has-product-option":
            console.log("[visibility handler]", ["has-product-option", rule, context, currentQuestion.inputProperties, JSON.stringify(targetQuestion), sourceValue]);
            const inputProperties = currentQuestion.inputProperties as { products: Array<string> };
            return inputProperties?.products?.some(p => p === sourceValue) ?? false;
        //   case "notBetween": return false;
        //   case "notIn": return false;
        //   case "notNull": return false;
        //  case "null": return false;

        default:
            throw new Error(`Operator ${rule.operator} not implemented`)
    };
    return false;
}

function evalRuleGroup(rule: RuleGroupType, context: VisibilityRuleEngineContext, question: QuestionModel): boolean {
    const rules = rule.rules.map(r => "field" in r ? evalRule(r, context,question) : evalRuleGroup(r, context, question));
    console.log("[visibility handler]", [rule, rules]);
    return rule.combinator === "and" ? rules.every(x => x) : rules.some(x => x);
}

registerVisibilityEngine("react-querybuilder", (rule: RuleGroupType, context: VisibilityRuleEngineContext, question: QuestionModel) => {
    console.log("[visibility handler]", [rule, context]);
    const result = evalRuleGroup(rule, context, question);

    console.log("[visibility handler]", [result]);
    return result;
});