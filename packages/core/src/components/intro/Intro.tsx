import React from "react";
import { Button, Heading } from "../index";
import { Paragraph } from "../../components/paragraph/Paragraph";
import { IntroModel } from "../../model";
import { useHandleEnterKeypress } from "../../hooks";
import { useQuickForm } from "../../state";

type IntroProps = {
    className?: string;
    model: IntroModel;
    onBtnClick: React.Dispatch<void>;
}

export const Intro: React.FC<IntroProps> = ({ model, onBtnClick, className }) => {
    const { text, paragraph, buttonText, paragraphIsHtml,textIsHtml } = model;
    const { state } = useQuickForm();

    /* Listens to enter key pressed */
    useHandleEnterKeypress(false, onBtnClick);

    return (
        <div className={className} style={introStyling}>
            <Heading className={state.classes.slideHeadline} isHtml={textIsHtml} >
                {text}
            </Heading>
            <Paragraph className={state.classes.slideParagraph} isHtml={paragraphIsHtml} style={{ marginTop: '12px' }}>
                {paragraph}
            </Paragraph>
            <Button
                onClick={() => onBtnClick()}
                className={state.classes.slideButtonContainer}
                buttonClassName={state.classes.slideButton}
                showPressEnter={typeof state.showPressEnter !== "undefined" && state.showPressEnter !== false}                 
            >
                {buttonText}
            </Button>
        </div>
    )
}

const introStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'start',
    alignItems: 'start'
}