"use client";
import React from 'react';
import { useQuickForm } from "../state/QuickFormContext";
import { Ending, Submit, Intro, SlideRenderer } from "./index";

export const QuickForm: React.FC = () => {
    const { state, setIntroVisited } = useQuickForm();

    const renderComponent = () => {
        if (state.isIntroSlide && typeof state.data.intro !== "undefined") {
            return <Intro model={state.data.intro} onBtnClick={setIntroVisited} />;
        } else if (state.isSubmitSlide) {
            return <Submit model={state.data.submit} />;
        } else if (state.isEndingSlide) {
            return <Ending model={state.data.ending} />;
        } else {
            return <SlideRenderer key={state.currIdx} />;
        }
    };

    return (
         <>
            {renderComponent()}
        </>
    );
};
