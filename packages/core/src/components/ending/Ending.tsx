"use client";
import React from "react";
import { Heading, Paragraph } from "../index";
import { ErrorIcon, Checkmark } from "../icons/index";
import { useQuickForm } from "../../state/QuickFormContext";
import { EndingModel } from "../../model";
import { quickformtokens } from "../../style/quickFormTokensDefinition";
import { makeStyles, mergeClasses } from "@griffel/react";

type EndingProps = {
    model: EndingModel;
    className?: string;
}
 
const useEndingStyles = makeStyles({
    ending: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        width:"100%",
    }
});

export const Ending: React.FC<EndingProps> = ({ model, className }) => {
    const { state } = useQuickForm(); 

 
    const { text, paragraph } = model;
    const submitStatus = state.submitStatus;
    const styles = useEndingStyles();
    return (
        <div className={mergeClasses(styles.ending, className, state.classes.ending)}>
            {submitStatus.isSubmitError &&
                <>
                    <ErrorIcon color={quickformtokens.onSurface} />
                    <Heading>Der skete en fejl, prøv igen</Heading>
                </>
            }
            {submitStatus.isSubmitSuccess &&
                <>
                    {state.defaultEndingSlideIcon !== "none" && <Checkmark color={quickformtokens.onSurface} />}
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