"use client";
import React, { useEffect, useState } from "react";
import { useQuickForm } from "../state/QuickFormContext";
import { Ending, Submit, Intro, SlideRenderer } from "./index";

export const QuickForm: React.FC = () => {
    const { state, setIntroVisited } = useQuickForm();
    const [component, setComponent] = useState<React.ReactNode>(null);

    useEffect(() => {
        switch (true) {
            case state.isIntroSlide && typeof state.data.intro !== "undefined":
                setComponent(<Intro model={state.data.intro} onBtnClick={setIntroVisited} />);
                break;

            case state.isSubmitSlide:
                setComponent(<Submit model={state.data.submit} />);
                break;

            case state.isEndingSlide:
                setComponent(<Ending model={state.data.ending} />);
                break;

            default:
                setComponent(<SlideRenderer key={state.currIdx} />);
                break;
        }
    }, [state, setIntroVisited]); // dependencies array to re-run the effect when state changes

    return (
        <div style={{ width: "100%" }}>
            {component}
        </div>
    );
};
