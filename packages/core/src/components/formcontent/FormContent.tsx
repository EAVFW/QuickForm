import React from "react";
import { useQuickForm } from "../../context/QuickFormContext";
import { Overview, Question } from "..";
import { Ending } from "../ending/Ending";
import { Submit } from "../submit/Submit";
import classNames from "classnames";
import styles from "./FormContent.module.css";

export const FormContent: React.FC = () => {
    const { questionState } = useQuickForm();
    const currentQuestion = questionState?.currentQuestion;

    if (!currentQuestion) {
        return null;
    }

    let content;
    if (questionState.showOverview) {
        return (<Overview />)
    } else {

        switch (currentQuestion.logicalName) {
            case "submit":
                content = <Submit  />;
                break;
            case "ending":
                content = <Ending />;
                break;
            default:
                content = <Question  />;
        }

        return (
            <div className={classNames(styles.formContent)}        >
                {content}
            </div>
        );
    }
};
