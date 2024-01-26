import React from "react";
import { useQuickForm } from "../../state/QuickFormContext";
import { Overview } from "..";
import classNames from "classnames";
import styles from "./FormContent.module.css";
import { SlideComponent } from "../../components/slide/Slide";

export const FormContent: React.FC = () => {
    const { state } = useQuickForm();
    const currentSlide = state.slides[state.currIdx];

    if (!currentSlide) {
        return null;
    }

    let content;
    if (state.showOverview) {
        return (<Overview />)
    } else {

        // switch (currentSlide.logicalName) {
        //     case "submit":
        //         content = <Submit />;
        //         break;
        //     case "ending":
        //         content = <Ending />;
        //         break;
        //     default:
        //         content = <Question />;
        // }

        return (
            <div className={classNames(styles.formContent)}        >
                <SlideComponent model={currentSlide} />
                {content}
            </div>
        );
    }
};
