
import { QuestionModel } from "../../../model/QuestionModel";
import { useEffect, useState } from "react";
import React from "react";
import { resolveQuickFormService } from "../../../services/QuickFormServices";
import { useQuickForm } from "../../../state";
import { Question } from "../../../components/question/Question";

type ConditionalRenderProps = {
    model: QuestionModel;
    style?: React.CSSProperties;
}

export const ConditionalRender: React.FC<ConditionalRenderProps> = ({ model, style }) => {
    const logger = resolveQuickFormService("logger");
    const [visible, setIsVisible] = useState(false);
    const { getCurrentSlide } = useQuickForm();
    logger.log("ConditionalRender for question {@model} InputProps", model);

    // function evalInScope(js: string, contextAsScope: any) {
    //     return new Function(`with (this) { return (${js}); }`).call(contextAsScope);
    // }

    interface Context {
        [key: string]: any;
    }

    function functionInScope(js: string, context: Context): boolean {
        const keys = Object.keys(context);
        const values = keys.map(key => context[key]);

        const func: Function = new Function(...keys, `return ${js};`);

        return (func as (...args: any[]) => any)(...values);
    }

    useEffect(() => {
        if (model.visible && model.visible?.rule) {
            const shouldRender = functionInScope(model.visible.rule, { getCurrentSlide });
            setIsVisible(shouldRender)
        }
    }, [getCurrentSlide().questions])

    if (!visible) {
        return null;
    }

    return (
        <Question key={model.logicalName} style={style} model={model} />
    )
}