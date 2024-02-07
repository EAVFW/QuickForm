import "../style/QuickForm.css";
import React from "react";
import { useQuickForm } from "../state/QuickFormContext";
import { Ending, ErrorMessage, Submit } from "./index";
import { Intro } from "./intro/Intro";
import { SlideRenderer } from "./slide-renderer/SlideRenderer";

export const QuickForm: React.FC = () => {
    const { state, setIntroVisited } = useQuickForm();

    if (state.isIntroSlide && typeof state.data.intro !== "undefined") {
        return <Intro data={state.data.intro} errorMsg={state.errorMsg} onBtnClick={setIntroVisited} />
    }

    if (state.isSubmitSlide)
        return <Submit {...state.data.submit} />

    if (state.isEndingSlide) {
        return <Ending data={state.data.ending} />
    }

    return (
        <div className="container">
            {state.errorMsg && state.errorMsg !== "" && <ErrorMessage message={state.errorMsg} />}
            <SlideRenderer />
        </div>
    );
}

