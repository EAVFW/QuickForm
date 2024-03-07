import { allQuestionsMap, getAllQuestions } from "../../utils/quickformUtils";
import { QuickformState } from "../QuickformState";

export class VisibilityHandler {

    // Handles the update of questions.visible.. this causes rendering of questions that have visibleRules.
    static updateVisibleState = (state: QuickformState) => {

        for (let questionArray of getAllQuestions(state.slides)) {
            for (let question of questionArray) {
                if (question.visible && question.visible?.engine && question.visible?.rule) {
                    const result = functionInScope(question.visible?.rule, allQuestionsMap(state.slides));
                    console.log(`Result for ${question.logicalName} is ${result} `)
                    question.visible.isVisible = result;
                }
            }
        }
        return state;
    }
}

interface Context {
    [key: string]: any;
}

function functionInScope(js: string, context: Context): boolean {
    const keys = Object.keys(context);
    const values = keys.map(key => context[key]);
    const func: Function = new Function(...keys, `return ${js};`);
    return (func as (...args: any[]) => any)(...values)
}

// function evalInScope(js: string, contextAsScope: any) {
//     return new Function(`with (this) { return (${js}); }`).call(contextAsScope);
// }
