import { ReactNode } from "react";
import { inputTypeComponentMap } from "./InputComponentMapper";
import React from "react";
import { Paragraph, Heading } from "..";
import { QuestionModel } from "../../model/QuestionModel";
import { InputTypes } from "../../model/json/JsonDataModels";
import { useQuickForm } from "../../state/QuickFormContext";

type QuestionProps = {
    model: QuestionModel;
    className?: string,
    icon?: ReactNode
}

const questionStyling: React.CSSProperties = {
    maxWidth: '72rem',
    transition: "transform 0.3s ease-out",
    minHeight: '100px',
    margin: '20px'
}

const headingStyle: React.CSSProperties = { fontSize: '1.5rem' };
const paragraphStyle: React.CSSProperties = { fontSize: '1.3rem' }

export const Question: React.FC<QuestionProps> = ({ className, model }) => {
    const InputType = inputTypeComponentMap[model.inputType as InputTypes];

    const { state } = useQuickForm();
    const ql = state.slides[state.currIdx].questions.length === 1 ? '' : `.${String.fromCharCode('A'.charCodeAt(0) + state.slides[state.currIdx].questions.indexOf(model))}`;
    const label = state.isSubmitSlide ? '' : `${state.currIdx + 1}${ql}`;


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
        model.output = newOutput;
        // dispatch({ type: 'SET_OUTPUT', payload: newOutput });
    };

    console.log("rendering question", model);
    return (
        <div
            className={className}
            style={questionStyling}
        >
            <Heading label={label} style={headingStyle} >
                {model.text}
            </Heading>

            <Paragraph style={paragraphStyle}>
                {model.paragraph}
            </Paragraph>

            <InputType
                key={"input" + model.logicalName}
                questionModel={model}
                onOutputChange={handleOutputChange}
            />
        </div>
    );
}
