import React from "react";
import { Button, Heading } from "../index";
import { Paragraph } from "../../components/paragraph/Paragraph";
import { IntroModel } from "../../model";
import { useHandleEnterKeypress } from "../../hooks";

type IntroProps = {
    model: IntroModel;
    onBtnClick: React.Dispatch<void>;
}

export const Intro: React.FC<IntroProps> = ({ model, onBtnClick }) => {
    const { text, paragraph, buttonText } = model;

    /* Listens to enter key pressed */
    useHandleEnterKeypress("intro", false, onBtnClick);

    return (
        <div style={introStyling}>
            <Heading >
                {text}
            </Heading>
            <Paragraph style={{ marginTop: '10px' }}>
                {paragraph}
            </Paragraph>
            <Button
                onClick={() => onBtnClick()}
                showPressEnter={true}
                style={{
                    fontSize: '1.8rem',
                    fontWeight: '500',
                    padding: '10px 14px'
                }}
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