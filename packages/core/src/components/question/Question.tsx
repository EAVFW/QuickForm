"use client";
import React from "react";
import { Paragraph, Heading, ErrorMessage } from "..";
import { QuestionModel } from "../../model/QuestionModel";
import { useQuickForm } from "../../state/QuickFormContext";
import { resolveInputComponent, resolveQuickFormService } from "../../services";
import { quickformtokens } from "../../style/quickformtokens";

type QuestionProps = {
    model: QuestionModel;
    style?: React.CSSProperties;
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
        return (
            <div style={{ ...questionStyling, ...style }} >
                Unable to find a matching input for "{model.logicalName}" using input type "{model.inputType}".
            </div>
        )
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
            <InputType
                key={"input-" + model.logicalName}
                style={
                    {
                        marginTop: quickformtokens.questionInputGap,
                        fontSize: quickformtokens.questionInputFontSize,
                        fontFamily: quickformtokens.fontFamily
                    }
                }
                questionModel={model}
                {...model.inputProperties ?? {}}
            />
            {model.validationResult?.message !== "" && <ErrorMessage message={model.validationResult?.message} />}
        </div>
    );
}