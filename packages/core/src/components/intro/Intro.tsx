import { Button, Heading } from "../index";
import { Paragraph } from "../../components/paragraph/Paragraph";
import { IntroModel } from "../../model";
import { useHandleEnterKeypress } from "../../hooks";

type IntroProps = {
    data: IntroModel;
    errorMsg: string;
    onBtnClick: React.Dispatch<void>;
}

export const Intro: React.FC<IntroProps> = ({ data, errorMsg, onBtnClick }) => {

    /* Listens to enter key pressed */
    useHandleEnterKeypress("intro", false, onBtnClick);

    return (
        <div style={introStyling}>
            <Heading >
                {data.text}
            </Heading>
            <Paragraph>
                {data.paragraph}
            </Paragraph>
            <Button
                onClick={() => onBtnClick()}
                visible={errorMsg === ""}
                showPressEnter={true}
            >
                {data.buttonText}
            </Button>
        </div>
    )
}

const introStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
}