import { log } from "console";
import { resolveQuickFormService } from "../../services";
import { allQuestionsMap, getAllQuestions, getAllQuestionsWithVisibilityRule } from "../../utils/quickformUtils";
import { QuickformState } from "../QuickformState";

const engines = {} as any;

export const registerVisibilityEngine = (type: string, engine: any) => {
    engines[type] = engine;
};


export class VisibilityHandler {

    // Handles the update of questions.visible.. this causes rendering of questions that have visibleRules.
    static updateVisibleState = (state: QuickformState) => {
        const logger = resolveQuickFormService("logger");
        const context = {
            questions: allQuestionsMap(state.slides),
            ...state
        }

        /**
         * Will loop over rules until no further changes happens.
         * 
         * Would be good if engine could be smarter to know only to update 
         * those that has rules that depends on visible from other fields.
         */
        let hasChanges = true;
        while (hasChanges) {
            hasChanges = false;

            for (let question of getAllQuestionsWithVisibilityRule(state.slides)) {

                let result = false;
                logger.log("[visibility handler] [{@engines}] for {question}: {@visibility}", Object.keys(engines), question.questionKey, question.visible, context);
                try {

                    if (question.visible.engine in engines) {

                        result = engines[question.visible.engine](question.visible.rule, context)
                    } else {
                        result = functionInScope(question.visible?.rule, context);

                    }
                    logger.log("[visibility handler] Result for {question} is {result}", question.logicalName, result);

                } catch (err) {
                    logger.warn("[visibility handler] Failed to run visible engine: {err}", err, question.visible, context);
                }
                hasChanges = hasChanges || question.visible.isVisible !== result;
                question.visible.isVisible = result;

                


            }
        }
        return state;
    }
}

interface Context {
    [key: string]: any;
}

/**
 * 
 * The functions takes a dynamic string (javascript) that is evaluated with the given context.
 * 
 * args = 'a, b';
 * body = 'return(a + b);';
 * 
 * myFunc = new Function(args, body);
 * 
 * ten = myFunc(5,5);
 * 
 * assert(ten,10)
 * 
 * First argument is the input arguments (names) for the function,
 * Second argument is the javascript string
 * 
 * A function is then defined that can be called.
 * 
 * @param js
 * @param context
 * @returns
 */
function functionInScope(js: string, context: Context): boolean {
    const keys = Object.keys(context);
    const values = keys.map(key => context[key]);
    const func: Function = new Function(...keys, `return ${js};`);
    return (func as (...args: any[]) => any)(...values)
}

// function evalInScope(js: string, contextAsScope: any) {
//     return new Function(`with (this) { return (${js}); }`).call(contextAsScope);
// }
