"use client";
import React from "react";
import { Paragraph, ErrorMessage } from "..";
import { QuestionModel } from "../../model/QuestionModel";
import { useQuickForm } from "../../state/QuickFormContext";
import { resolveInputComponent, resolveQuickFormService } from "../../services";
import { quickformtokens } from "../../style/quickFormTokensDefinition";
import { QuestionHeading } from "./components/QuestionHeading";

type QuestionProps = {
    model: QuestionModel;
    style?: React.CSSProperties;
    className?: string;
}

const questionStyling: React.CSSProperties = {
    margin: `${quickformtokens.questionTopMargin} 0 ${quickformtokens.questionBottomMargin} 0`,
    transition: "transform 0.3s ease-out",
    minHeight: '100px',
    color: quickformtokens.onSurface,
    borderRadius: quickformtokens.questionBorderRadius,
    padding: `${quickformtokens.questionPadding}, ${quickformtokens.questionPadding}, ${quickformtokens.questionPaddingBottom}, ${quickformtokens.questionPadding}`,
}

export const Question: React.FC<QuestionProps> = ({ model, style, className }) => {

    const InputType = resolveInputComponent(model.inputType);
    const logger = resolveQuickFormService("logger");
    const { state } = useQuickForm();
    logger.log("QuestionRender for question {logicalName} {@model} InputProps", model.logicalName, model);

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
        <div className={className}
            style={{ ...questionStyling, ...style }}
        >
            {model.text &&
                <QuestionHeading required={model.isRequired} label={label} >
                    {model.text}
                </QuestionHeading>
            }

            {model.paragraph &&
                <Paragraph >
                    {model.paragraph}
                </Paragraph>
            }

            <InputType
                key={"input-" + model.logicalName}
                style={
                    {
                        marginTop: quickformtokens.questionInputGap,
                        fontSize: quickformtokens.questionInputFontSize,
                    }
                }
                questionModel={model}
                {...model.inputProperties ?? {}}
            />
            {typeof (model.validationResult?.message) !== "undefined" && model.validationResult?.message !== "" && !model.validationResult.isValid && <ErrorMessage message={model.validationResult?.message} />}
        </div>
    );
}