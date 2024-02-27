// "use client"
// import React, { useCallback, useState } from "react";
// import classNames from "classnames";
// import styles from "./Submit.module.css";
// import { useQuickForm } from "@/components/quickform/context/QuickFormContext";
// import { Heading, Button, Paragraph } from "..";
// import { useDelayedClickListener, useHandleKeypress } from "../../hooks";
// import Spinner from "../spinner/Spinner";
// import validator from '@rjsf/validator-ajv8';
// import Form from '@rjsf/core';
// import { ErrorMessage } from "../error-message/ErrorMessage";
// import { QuickSchemaForm } from "../rjsf/QuickFormRJSFTheme";
// import { mergeClasses } from "@griffel/react";
// import { useTailWind } from "../../../../utils/makeTailWindStyles";
// import type { FormProps } from "@rjsf/core";
// import { assertSubmitModel } from "model/QuestionModel";

import React from "react";
import { SubmitModel } from "../../model";
import { useQuickForm } from "../../state/QuickFormContext";
import { Heading, Paragraph, Button, Spinner, Question } from "../index";
import { SubmitActionHandler } from "../../state/action-handlers/SubmitActionHandler";

// export const Submit: React.FC = () => {

//     const tw = useTailWind();

//     const { questionState: { submitStatus, currentQuestion }, dispatch } = useQuickForm();
//     console.log("SUBMIT", submitStatus);
//     const { submitFields, output } = assertSubmitModel(currentQuestion);
//     const [errorMsg, setErrorMsg] = useState<string>("");

//     //const handleOnSubmitBtnClicked = () => {
//     //    console.log("progress: ", questionState!.progress);
//     //    if (questionState!.progress < 100) {
//     //        setErrorMsg("Du skal besvare alle spørgsmål før du kan indsende");
//     //        return;
//     //    }
//     //    onSubmitBtnClicked();
//     //}

//    // useHandleKeypress(handleOnSubmitBtnClicked);
//     useDelayedClickListener(() => setErrorMsg(""));
//     const onSubmitFieldsChange = useCallback<Required<FormProps<any>>["onChange"]>((data, id) => {
//         console.log("Changing Submit Fields", [data, id]);
//         dispatch({ type: 'SET_OUTPUT', payload: data.formData });
//     }, [dispatch]);

//     if (submitStatus.isSubmitting) {
//         return <Spinner speed="medium" message="Submitting.. Please wait.." />
//     }

//     return (
//         <div className={classNames(styles["submit-box"])}>
//             {!!submitFields && <QuickSchemaForm className={mergeClasses(tw.wFull)} uiSchema={submitFields.uiSchema} schema={submitFields.schema}
//                 formData={output}
//                 validator={validator}
//                 onChange={onSubmitFieldsChange}
//                 onSubmit={() => console.log('submitted')}
//                 onError={() => console.log('errors')}
//             ><></></QuickSchemaForm> }

//             {/* <Button*/}
//             {/*visible={true}*/}
//             {/*showPressEnter={false}*/}
//             {/*>*/}
//             {/*    Preview PDF..*/}
//             {/*</Button>*/}
//             {errorMsg && <ErrorMessage message={errorMsg} />}
//         </div>
//     );
// }


export const Submit: React.FC<SubmitModel> = ({ text, paragraph ,buttonText, submitFields = [] }: SubmitModel) => {
    const { state, dispatch } = useQuickForm();

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
                        return (<>
                            <Question model={sf} />
                            </>                           
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