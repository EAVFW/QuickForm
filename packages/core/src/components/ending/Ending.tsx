"use client"
import { Paragraph } from "../paragraph/Paragraph";
import React, { useEffect } from "react";
import { Heading } from "..";
import styles from "./Ending.module.css";
import classNames from "classnames";
import { ErrorIcon } from "../icons/ErrorIcon";
import { Checkmark } from "../icons/Checkmark";
import { useQuickForm } from "state/QuickFormContext";

export const Ending: React.FC = () => {
    const { questionState: { submitStatus, currentQuestion: { text, paragraph } } } = useQuickForm();
    //  const { text, paragraph,  } = questionState?.currentQuestion || {};
    useEffect(() => {
        console.log("Ending rendered..", submitStatus, classNames(styles.svgcolor), "test");

    }, [submitStatus]);


    return (
        <>
            {submitStatus.isSubmitError &&
                <>
                    <ErrorIcon classNames={classNames(styles.endingSvg)} />
                    <Heading>Der skete en fejl, prøv igen</Heading>
                </>
            }
            {submitStatus.isSubmitOK &&
                <>
                    <Checkmark classNames={classNames(styles.endingSvg)} />

                    <Heading>
                        Form has been successfully submitted.
                    </Heading>

                    {text &&
                        <Paragraph>
                            <span dangerouslySetInnerHTML={{ __html: text }} ></span>
                        </Paragraph>
                    }

                    {paragraph &&
                        <Paragraph  >
                            <span dangerouslySetInnerHTML={{ __html: paragraph }} ></span>
                        </Paragraph>
                    }
                </>
            }
        </>
    );
}

