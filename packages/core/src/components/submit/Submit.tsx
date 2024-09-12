"use client";

import React from "react";
import { SubmitModel } from "../../model";
import { useQuickForm } from "../../state/QuickFormContext";
import { Heading, Paragraph, Button, Spinner, Question } from "../index";
import { SubmitActionHandler } from "../../state/action-handlers/SubmitActionHandler";
import { useHandleEnterKeypress } from "../../hooks";
import { makeStyles, mergeClasses } from "@griffel/react";

type SubmitProps = {
    model: SubmitModel;
    className?: string;
}

const useSubmitStyles = makeStyles({
    submit: {
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s ease-out',
        width: '100%',
    }
});

export const Submit: React.FC<SubmitProps> = ({ model, className }) => {
    const { state, dispatch, onSubmitAsync } = useQuickForm();
    const { text, paragraph, buttonText, submitFields = [] } = model;

    const styles = useSubmitStyles();

   
  

    const handleSubmit = async () => {
        dispatch({ type: "SET_SUBMIT_STATUS", status: { ...state.submitStatus, isSubmitting: true } });

        try {
            await SubmitActionHandler.submit(state, dispatch, onSubmitAsync);
        } catch (error) {
            dispatch({ type: "SET_SUBMIT_STATUS", status: { isSubmitting: false, isSubmitError: true, isSubmitSuccess: false } });
        }
    }

    /* Listens to enter key pressed */
    useHandleEnterKeypress(false, handleSubmit);

    if (state.submitStatus.isSubmitting) {
        return <Spinner speed="medium" message="Submitting.. Please wait.." />
    }


    return (
        <div className={mergeClasses(styles.submit,className,  state.classes.submit)}>
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
                        return (
                            <Question key={sf.logicalName + idx} model={sf} />
                        )
                    })}
                </ul>
            </div>

            <Button
                className={state.classes.slideButtonContainer}
                buttonClassName={ state.classes.slideButton}
                showPressEnter={typeof state.showPressEnter !== "undefined" && state.showPressEnter !== false}
                onClick={handleSubmit}
            >
                {buttonText}
            </Button>

        </div>
    )
};

 