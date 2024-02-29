import { ReactNode, useEffect, useState } from "react";
import React from "react";
import { Paragraph, Heading } from "..";
import { QuestionModel } from "../../model/QuestionModel";
import { useQuickForm } from "../../state/QuickFormContext";
import { resolveQuickFormService } from "../../services/QuickFormServices";
import { resolveInputComponent } from "../../services";

type QuestionProps = {
    model: QuestionModel;
    className?: string,
    icon?: ReactNode
}

const questionStyling: React.CSSProperties = {
    maxWidth: '72rem',
    transition: "transform 0.3s ease-out",
    minHeight: '100px',
    margin: '20px'
}

export const Question: React.FC<QuestionProps> = ({ className, model }) => {
    const InputType = resolveInputComponent(model.inputType);
    const logger = resolveQuickFormService("logger");
    const [visible, setIsVisible] = useState(true);
    const { state, getCurrentSlide } = useQuickForm();
    logger.log("QuestionRender for question {@model} InputProps", model);

    function evalInScope(js: string, contextAsScope: any) {
        return new Function(`with (this) { return (${js}); }`).call(contextAsScope);
    }


    useEffect(() => {
        if (model.visible && model.visible?.rule) {
            const shouldRender = evalInScope(model.visible.rule, { getCurrentSlide });
            setIsVisible(shouldRender)
        }
    }, [getCurrentSlide().questions])

    if (!visible) {
        return null;
    }

    const ql = state.slides[state.currIdx].questions.length === 1 ? '' : `.${String.fromCharCode('A'.charCodeAt(0) + state.slides[state.currIdx].questions.indexOf(model))}`;
    const label = state.isSubmitSlide ? '' : `${state.currIdx + 1}${ql}`;


    if (!InputType || typeof InputType === "undefined") {
        return <div
            className={className}
            style={questionStyling}
        >
            Attempted to use inputtype {model.inputType} but was not able to find a matching input for question: {model.logicalName}
        </div>
    }

    return (
        <div
            className={className}
            style={questionStyling}
        >
            <Heading label={label} >
                {model.text}
            </Heading>

            <Paragraph >
                {model.paragraph}
            </Paragraph>

            <InputType
                key={"input" + model.logicalName}
                questionModel={model}
            />
        </div>
    );
}
