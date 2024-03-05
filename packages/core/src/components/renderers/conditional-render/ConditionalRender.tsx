"use client";
import { useEffect, useState } from "react";
import { useQuickForm } from "../../../state";

type ConditionalRenderProps = {
    engine: string;
    rule: string;
    children: JSX.Element;
}

export const ConditionalRender = ({ engine, rule, children }: ConditionalRenderProps) => {
    const [visible, setIsVisible] = useState(false);
    const { getCurrentSlide } = useQuickForm();
    // const logger = resolveQuickFormService("logger");
    // logger.log("ConditionalRender for question {@model} InputProps", model);

    useEffect(() => {
        const shouldRender = functionInScope(rule, { getCurrentSlide });
        setIsVisible(shouldRender)
    }, [getCurrentSlide().questions])

    if (!visible) {
        return null;
    }

    return children;
}

interface Context {
    [key: string]: any;
}

function functionInScope(js: string, context: Context): boolean {
    const keys = Object.keys(context);
    const values = keys.map(key => context[key]);

    const func: Function = new Function(...keys, `return ${js};`);

    return (func as (...args: any[]) => any)(...values);
}

// function evalInScope(js: string, contextAsScope: any) {
//     return new Function(`with (this) { return (${js}); }`).call(contextAsScope);
// }