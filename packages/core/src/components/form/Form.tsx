import React, { useState } from "react";
import { useQuickForm } from "../../state/QuickFormContext";
import { Ending, Overview, Submit } from "..";
import classNames from "classnames";
import styles from "./FormContent.module.css";
import { SlideComponent } from "../slide/Slide";

export const Form: React.FC = () => {
    const { state } = useQuickForm();
    const currentSlide = state.slides[state.currIdx];
    const [introVisited, setIntroVisited] = useState<boolean>(false);

    /* If Intro exists -> Display intro */
    // TODO - Finish intro slide
    if (state.form.intro)
        if (!currentSlide)
            return null;

    /* If all slides/questions are answered -> Display submit */
    if (state.progress === 100)
        return <Submit {...state.form.submit} />

    /* Submit was successful, return Ending */
    if (state.submitStatus.isSubmitSuccess) {
        return <Ending />
    }

    return (
        <div className={classNames(styles.formContent)} >
            <SlideComponent model={currentSlide} />
        </div>
    );
};
