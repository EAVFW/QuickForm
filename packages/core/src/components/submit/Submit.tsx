import React from "react";
import { SubmitModel } from "../../model";
import { useQuickForm } from "../../state/QuickFormContext";
import { Heading, Paragraph, Button, Spinner, Question } from "../index";
import { SubmitActionHandler } from "../../state/action-handlers/SubmitActionHandler";
import { ConditionalRender } from "../renderers/conditional-render/ConditionalRender";

type SubmitProps = {
    model: SubmitModel;
}

export const Submit: React.FC<SubmitProps> = ({ model }) => {
    const { state, dispatch } = useQuickForm();
    const { text, paragraph, buttonText, submitFields = [] } = model;

    if (state.submitStatus.isSubmitting) {
        return <Spinner speed="medium" message="Submitting.. Please wait.." />
    }

    const handleSubmit = async () => {
        dispatch({ type: "SET_SUBMIT_STATUS", status: { ...state.submitStatus, isSubmitting: true } });

        try {
            await SubmitActionHandler.submit(state, dispatch);
        } catch (error) {
            dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitError: true, isSubmitSuccess: false } });
        }
    }

    return (
        <div style={submitStyling}>
            <Heading >
                {text}
            </Heading>

            <Paragraph>
                {paragraph}
            </Paragraph>

            {/*{*/}
            {/*    paragraphs && paragraphs.length > 0 &&*/}
            {/*    paragraphs.map((p, idx) => (*/}
            {/*        <Paragraph key={idx} style={{ fontSize: '1rem', marginTop: '10px' }}>*/}
            {/*            {p}*/}
            {/*        </Paragraph>*/}
            {/*    ))*/}
            {/*}*/}

            <div style={{ marginTop: '10px' }}>
                <ul>
                    {submitFields.map((sf, idx) => {
                        if (sf.visible && sf.visible?.rule) {
                            return <ConditionalRender key={sf.logicalName} model={sf} />
                        }
                        return (
                            <Question key={sf.logicalName} model={sf} />
                        )
                    })}
                </ul>
            </div>

            <Button
                showPressEnter={true}
                onClick={handleSubmit}
            >
                {buttonText}
            </Button>

        </div>
    )
};

const submitStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '72rem',
    transition: 'transform 0.3s ease-out',
}