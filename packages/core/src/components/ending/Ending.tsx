import React, { useEffect } from "react";
import { Heading, Paragraph } from "../index";
import { ErrorIcon, Checkmark } from "../icons/index";
import styles from "./Ending.module.css";
import classNames from "classnames";
import { useQuickForm } from "../../state/QuickFormContext";
import { EndingModel } from "../../model";

type EndingProps = {
    data: EndingModel;
}

export const Ending: React.FC<EndingProps> = ({ data }) => {
    const { state } = useQuickForm();
    const submitStatus = state.submitStatus;

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
            {submitStatus.isSubmitSuccess &&
                <>
                    <Checkmark classNames={classNames(styles.endingSvg)} />

                    <Heading>
                        Form has been successfully submitted.
                    </Heading>

                    {data.text &&
                        <Paragraph>
                            {data.text}
                        </Paragraph>
                    }

                    {data.paragraph &&
                        <Paragraph  >
                            {data.paragraph}
                        </Paragraph>
                    }
                </>
            }
        </>
    );
}

