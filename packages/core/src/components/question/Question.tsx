import { ReactNode } from "react";
import { inputTypeComponentMap } from "./InputComponentMapper";
import React from "react";
import { useQuickForm } from "../../state/QuickFormContext";
import { Paragraph, Heading } from "..";
import { QuestionModel } from "../../model/QuestionModel";
import { InputTypes } from "../../model";

type QuestionProps = {
    questionNumber: number;
    model: QuestionModel;
    className?: string,
    icon?: ReactNode
    nextButton?: ReactNode
    headline?: ReactNode;
}

const questionStyling: React.CSSProperties = {
    maxWidth: '72rem',
    transition: "transform 0.3s ease-out",
    minHeight: '100px'
}

const headingStyle: React.CSSProperties = { fontSize: '1.5rem' };
const paragraphStyle: React.CSSProperties = { fontSize: '1rem' }

/**
 * I popose that we consider changing the name here.
 * Yes its questions, but its also more i think.
 * 
 * Right now it able to render Intro and Ending also.
 * So maybe we just keep this as the main rendering component, making FormContent obsolete. 
 * I see FormContent as "Full QuickForm with overview" example, it makes sense to have in the library for quick use.
 * 
 * */

export const Question: React.FC<QuestionProps> = ({ headline, className, model, questionNumber }) => {

    const { text, paragraph, inputType, placeholder, output } = model;
    const InputType = inputTypeComponentMap[inputType as InputTypes];

    if (!InputType || typeof InputType === "undefined") {
        return <div
            className={className}
            style={questionStyling}
        >
            Not able to find inputtype for question: {model.logicalName}
        </div>
    }

    /* TODO - Decide how to implement validation of Input 
     * Lets explorer what RJSF does: https://rjsf-team.github.io/react-jsonschema-form/docs/usage/validation/
     * I dont know if thats overcomplicating it, however they properly been thinking about it
     * */
    const validateInput = () => {
        // console.log("validating input for ", currentQuestion);
        // if (currentQuestion.inputType === "dropdown") {
        //     return true
        // }

        // if (!currentQuestion || !currentQuestion.output || currentQuestion.output === "") {
        //     console.log("error", currentQuestion, currentQuestion?.output);
        //     setErrorMsg("Du skal besvare spørgsmålet før du kan gå videre");
        //     return false;
        // }
        // setErrorMsg("");
        // return true;
    };

    /**
     * Does it make sense to add this method to useQuickform so logic is there?
     * 
     * Also could expose it as const handleOutputChange = useOutputChangeHandler();
     * export useOutputChangeHandler = () => (newOutput: string) => {
     *           dispatch({ type: 'SET_OUTPUT', payload: newOutput });
     *        };
     * 
     * similar to the use methods above, and if someone want to make there own <Question /> component
     * the methods are easily consumable like that and does not need to know internal dispatch calls?
     * 
     * 
     */
    const handleOutputChange = (newOutput: string) => {

        // dispatch({ type: 'SET_OUTPUT', payload: newOutput });
    };


    return (
        <div
            className={className}
            style={questionStyling}
        >
            <Heading questionNum={questionNumber} style={headingStyle}>
                {headline ?? text}
            </Heading>

            <Paragraph
                style={paragraphStyle}
            >
                {paragraph ?? ""}
            </Paragraph>

            <InputType
                inputType={inputType as InputTypes}
                inputProps={model.inputProperties}
                placeholder={placeholder}
                output={output}
                onOutputChange={handleOutputChange}
            />
        </div>
    );
}
