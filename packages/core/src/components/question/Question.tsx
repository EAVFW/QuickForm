"use client";
import classNames from "classnames";
import styles from "./Question.module.css";
import { ReactNode, useEffect, useState } from "react";
import { inputTypeComponentMap } from "./InputComponentMapper";
import React from "react";
import { useQuickForm } from "../../state/QuickFormContext";
import { Paragraph, Heading, ErrorMessage, Button } from "..";
import { useDelayedClickListener, useHandleKeypress } from "../../hooks";
import PreviewPDFButton from "../preview-pdf-button/PreviewPDFButton";
import { shouldValidateInputType } from "model/QuestionModel";

type QuestionProps = {
    className?: string,
    icon?: ReactNode
    nextButton?: ReactNode
    headline?: ReactNode;
}
enum ViewStatus {
    InView,
    TransitioningOut,
    OutOfView,
    TransitioningIn
}

const animationTimerSetting = 300;
const useTransitionState = () => {
    const [viewStatus, setViewStatus] = useState(ViewStatus.OutOfView);
    // const { questionNumber } = useCurrentQuestion();
    const questionBoxClasses = classNames(styles['question-box'], {
        [styles['slide-out']]: viewStatus === ViewStatus.TransitioningOut,
        [styles['slide-in']]: viewStatus === ViewStatus.TransitioningIn,
        [styles['rendered']]: viewStatus === ViewStatus.InView,

    });

    useEffect(() => {

        setViewStatus(ViewStatus.TransitioningIn);
        setTimeout(() => {

            setViewStatus(ViewStatus.InView);
        }, animationTimerSetting);
    }, []);
    // }, [questionNumber]);

    return {
        questionBoxClasses,
        transitionOut: (onComplete?: () => void) => {
            setViewStatus(ViewStatus.TransitioningOut);
            if (onComplete) {
                setTimeout(() => {
                    onComplete();
                }, animationTimerSetting);
            }
        }
    }
}
/**
 * I popose that we consider changing the name here.
 * Yes its questions, but its also more i think.
 * 
 * Right now it able to render Intro and Ending also.
 * So maybe we just keep this as the main rendering component, making FormContent obsolete. 
 * I see FormContent as "Full QuickForm with overview" example, it makes sense to have in the library for quick use.
 * 
 * */

export const Question: React.FC<QuestionProps> = ({ headline, className }) => {

    const { state: { currentQuestion, progress }, onQuestionBtnClicked, dispatch } = useQuickForm();

    /**
     * inputType could be SlideType if we go with a change of Questin=>Slide
     * Maybe we want to keep kaspers original idea <FormContent/> and make <Slider /> which will have IntroSlide, QuestionSlide, SubmitSlide and EndingSlide
     * */
    const { text, paragraph: para, inputType, buttonText, placeholder, questionNumber, lang } = currentQuestion;
    const InputType = inputTypeComponentMap[inputType];

    const [errorMsg, setErrorMsg] = useState<string>("");

    const btnText = buttonText ? buttonText : "OK";

    const { transitionOut, questionBoxClasses } = useTransitionState();

    /**
     * We wont validate intro and ending <see shouldValidateInputType />, 
     * question if submit should be handled the submit validation here or somewhere else.
     * 
     * It makes sense to do it here because we are on rending of submit
     * */

    const handleQuestionNextBtnClick = () => {

        /**
         * If this is the submit part and we are progress 100 (completed)
         * TODO: Make the progress === 100 a method returned from quickform 
         * 'isQuestionsComplete()'
         * 
         * Such the logic on if its complete (the progress===100) is actually somewhere
         * else than in the rendering part.
         * */
        if (inputType === "submit") {
            console.log("progress: ", progress);
            if (progress === 100) {

                /**
                 * If its complete, we simply click the onSubmitBtnClicked()
                 * 
                 * I think it makes sense to add some ValidateForSubmission.
                 * 
                 * */
                transitionOut(onQuestionBtnClicked);


            }
        }

        /**
         * If its not submit, we will ask quickform if the input type should be validated
         * */
        if (shouldValidateInputType(inputType)) {

            /**
             * The actualy validateinput should be on usequickform i think.
             * 
             * Basically library users should be able to plug in validation
             * */
            const isValid = validateInput();
            if (!isValid) return;
        }
        transitionOut(onQuestionBtnClicked)
    };

    /* TODO - Decide how to implement validation of Input 
     * Lets explorer what RJSF does: https://rjsf-team.github.io/react-jsonschema-form/docs/usage/validation/
     * I dont know if thats overcomplicating it, however they properly been thinking about it
     * */
    const validateInput = () => {

        console.log("validating input for ", currentQuestion);
        if (currentQuestion.inputType === "dropdown") {
            return true
        }

        if (!currentQuestion || !currentQuestion.output || currentQuestion.output === "") {
            console.log("error", currentQuestion, currentQuestion?.output);
            setErrorMsg("Du skal besvare spørgsmålet før du kan gå videre");
            return false;
        }
        setErrorMsg("");
        return true;
    };
    useHandleKeypress(inputType, handleQuestionNextBtnClick);
    useDelayedClickListener(() => setErrorMsg(""));

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
        dispatch({ type: 'SET_OUTPUT', payload: newOutput });
    };


    return (
        <div className={classNames(className, questionBoxClasses)}>
            <Heading questionNum={questionNumber}>
                {headline ?? text}
            </Heading>

            <Paragraph>
                <span dangerouslySetInnerHTML={{ __html: para ? para : "" }} ></span>
            </Paragraph>

            {
                InputType &&
                <InputType
                    inputType={inputType}
                    text={text}
                    paragraph={para ? para : ""}
                    lang={lang ? lang : ""}
                    placeholder={placeholder}
                    output={currentQuestion.output ? currentQuestion.output : ""}
                    onOutputChange={handleOutputChange}
                    onAnswered={handleQuestionNextBtnClick}
                />
            }

            <Button
                className={classNames(styles["btn-container"], styles["ok"])}
                onClick={handleQuestionNextBtnClick}
                visible={errorMsg === "" && !(inputType === "dropdown" || inputType === "ending")}
                showPressEnter={inputType !== "multilinetext" ? true : false}
                disabled={false}
            >
                {btnText}
            </Button>
            {inputType === "ending" && <PreviewPDFButton />}
            {errorMsg && <ErrorMessage message={errorMsg} />}
        </div>
    );
}
