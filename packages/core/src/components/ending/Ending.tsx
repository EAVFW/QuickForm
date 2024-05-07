"use client";
import React from "react";
import { Heading, Paragraph } from "../index";
import { ErrorIcon, Checkmark } from "../icons/index";
import { useQuickForm } from "../../state/QuickFormContext";
import { EndingModel } from "../../model";
import { quickformtokens } from "../../style/quickFormTokensDefinition";

type EndingProps = {
    model: EndingModel;
}

const endingStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
}

export const Ending: React.FC<EndingProps> = ({ model }) => {
    const { state } = useQuickForm();
    const { text, paragraph } = model;
    const submitStatus = state.submitStatus;

    return (
        <div style={endingStyles}>
            {submitStatus.isSubmitError &&
                <>
                    <ErrorIcon color={quickformtokens.onSurface} />
                    <Heading>Der skete en fejl, prøv igen</Heading>
                </>
            }
            {submitStatus.isSubmitSuccess &&
                <>
                    <Checkmark color={quickformtokens.onSurface} />
                    {text &&
                        <Heading style={{ marginTop: '10px' }}>
                            {text}
                        </Heading>
                    }

                    {paragraph &&
                        <Paragraph style={{ marginTop: '10px' }}>
                            {paragraph}
                        </Paragraph>
                    }
                </>
            }
        </div>
    );
}