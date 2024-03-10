"use client";
import { resolveInputComponent, type QuickformState } from "@eavfw/quickform-core";
import type { QuestionModel } from "@eavfw/quickform-core/src/model";
import { registerVisibilityEngine } from "@eavfw/quickform-core/src/state/action-handlers/VisibilityHandler";
import type { RuleGroupType, RuleType, defaultOperators } from "react-querybuilder";

type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

type operators = ArrayElement<(typeof defaultOperators)>["name"] | "is-visible";

function isArrayType<T>(obj: T | T[], isArray: boolean): obj is Array<T> {
    return isArray;
}
function evalRule(rule: RuleType, context: QuickformState & { questions: { [logicalName: string]: QuestionModel } }): boolean {
    const value = rule.value;
    const question = context.questions[rule.field];
    const metadata = resolveInputComponent(question.inputType).quickform!;
    const type = "type" in metadata.field! ? metadata.field.type : metadata.field!.typeProvider(question.inputProperties!);
    const isArray = type === "select" || type === "multiselect";
    const isMultiArray = type === "multiselect";
    const sourceValue = question.output;

    switch (rule.operator as operators) {
        case "!=":
            return !(question.answered && isArrayType<string>(sourceValue, isMultiArray) && isArrayType(value, isArray) ? isMultiArray ? sourceValue.every(sv => value.indexOf(sv) !== -1) : sourceValue  === value : value === sourceValue);
        //  case "<": return false;
        //   case "<=": return false;
        case "=":
            console.log("EvalRule", [question, metadata, type, sourceValue, isMultiArray, value, isArray]);
            return question.answered && isArrayType<string>(sourceValue, isMultiArray) && isArrayType(value, isArray) ?
        
            isMultiArray ? sourceValue.every(sv => value.indexOf(sv) !== -1) : sourceValue === value
            : value === sourceValue;
        //   case ">": return false;
        //    case ">=": return false;
        //    case "beginsWith": return false;
        //   case "between": return false;
        //    case "contains": return false;
        //   case "doesNotContain": return false;
        //   case "doesNotBeginWith": return false;
        //   case "doesNotEndWith": return false;
        //   case "endsWith": return false;
        case "in": return question.answered && isArrayType<string>(sourceValue, isMultiArray) && isArrayType(value, isArray) ? isMultiArray ? sourceValue.some(sv => value.indexOf(sv) !== -1) : sourceValue.some(sv => sv === value[0]) : value === sourceValue;
        case "is-visible": return question.visible?.isVisible ?? false;
        //   case "notBetween": return false;
        //   case "notIn": return false;
        //   case "notNull": return false;
        //  case "null": return false;

        default:
            throw new Error(`Operator ${rule.operator} not implemented`)
    };
    return false;
}

function evalRuleGroup(rule: RuleGroupType, context: any): boolean {
    const rules = rule.rules.map(r => "field" in r ? evalRule(r, context) : evalRuleGroup(r, context));

    return rule.combinator === "and" ? rules.every(x => x) : rules.some(x => x);
}

registerVisibilityEngine("react-querybuilder", (rule: RuleGroupType, context: any) => {

    return evalRuleGroup(rule, context);
});