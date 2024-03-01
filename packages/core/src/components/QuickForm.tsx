import "../style/QuickForm.css";
import React from "react";
import { useQuickForm } from "../state/QuickFormContext";
import { Ending, Submit } from "./index";
import { Intro } from "./intro/Intro";
import { SlideRenderer } from "./renderers/slide-renderer/SlideRenderer";

export const QuickForm: React.FC = () => {
    const { state, setIntroVisited } = useQuickForm();

    if (state.isIntroSlide && typeof state.data.intro !== "undefined") {
        return <Intro model={state.data.intro} onBtnClick={setIntroVisited} />
    }

    if (state.isSubmitSlide)
        return <Submit model={state.data.submit} />

    if (state.isEndingSlide) {
        return <Ending model={state.data.ending} />
    }

    return (
        <div className="container">
            <SlideRenderer />
        </div>
    );
}