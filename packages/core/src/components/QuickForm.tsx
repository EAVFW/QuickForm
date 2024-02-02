import "../style/QuickForm.css";
import { useQuickForm } from "../state/QuickFormContext";
import React from "react";
import { Ending, ErrorMessage, SlideComponent, Submit } from "../components";
import { Intro } from "./intro/Intro";

export const QuickForm: React.FC = () => {
    const { state, setIntroVisited } = useQuickForm();
    const currentSlide = state.slides[state.currIdx];

    if (state.isIntroSlide) {
        return <Intro data={state.data.intro} errorMsg={state.errorMsg} onBtnClick={setIntroVisited} />
    }

    if (state.isSubmitSlide)
        return <Submit {...state.data.submit} />

    if (state.isEndingSlide) {
        return <Ending data={state.data.ending} />
    }

    return (
        <div>
            {state.errorMsg && state.errorMsg !== "" && <ErrorMessage message={state.errorMsg} />}
            <SlideComponent model={currentSlide} />
        </div>
    );
}

