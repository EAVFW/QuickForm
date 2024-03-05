"use client"
import { ReactNode } from "react";
import React from "react";
import { Paragraph, Heading } from "..";
import { QuestionModel } from "../../model/QuestionModel";
import { useQuickForm } from "../../state/QuickFormContext";
import { resolveQuickFormService } from "../../services/QuickFormServices";
import { resolveInputComponent } from "../../services";
import { quickformtokens } from "../../style/quickformtokens";



type QuestionProps = {
    model: QuestionModel;
    style?: React.CSSProperties;
    icon?: ReactNode
}

const questionStyling: React.CSSProperties = {
    maxWidth: '72rem',
    transition: "transform 0.3s ease-out",
    minHeight: '100px',
    color: quickformtokens.onSurface
  //  margin: '20px'
}

export const Question: React.FC<QuestionProps> = ({ model, style }) => {
    const InputType = resolveInputComponent(model.inputType);
    const logger = resolveQuickFormService("logger");
    const { state } = useQuickForm();
    logger.log("QuestionRender for question {@model} InputProps", model);

    const ql = state.slides[state.currIdx].questions.length === 1 ? '' : `.${String.fromCharCode('A'.charCodeAt(0) + state.slides[state.currIdx].questions.indexOf(model))}`;
    const label = state.isSubmitSlide ? '' : `${state.currIdx + 1}${ql}`;

    if (!InputType || typeof InputType === "undefined") {
        return <div
            style={{ ...questionStyling, ...style }}
        >
            Attempted to use inputtype {model.inputType} but was not able to find a matching input for question: {model.logicalName}
        </div>
    }

    return (
        <div
            style={{ ...questionStyling, ...style }}
        >
            <Heading
                label={label}
            >
                {model.text}
            </Heading>

            <Paragraph >
                {model.paragraph}
            </Paragraph>

            <InputType style={{ marginTop: quickformtokens.questionInputGap, fontSize: quickformtokens.questionInputFontSize, fontFamily: quickformtokens.fontFamily }}
                key={"input" + model.logicalName}
                questionModel={model}
                {...model.inputProperties ?? {}}
            />
        </div>
    );
}