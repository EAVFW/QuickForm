"use client";
import React, { useMemo } from 'react';
import { useQuickForm } from "../state/QuickFormContext";
import { Ending, Submit, Intro, SlideRenderer } from "./index";
import { mergeClasses } from '@griffel/react';

export type QuickFormProps = {
    className?: string;
}
export const QuickForm: React.FC<QuickFormProps> = ({ className}) => {
    const { state, setIntroVisited } = useQuickForm();
    const classes = useMemo(() => mergeClasses(className, state.classes.slide), [className, state.classes?.slide]);

    const renderComponent = () => {
        if (state.isIntroSlide && typeof state.data.intro !== "undefined") {
            return <Intro className={classes} model={state.data.intro} onBtnClick={setIntroVisited} />;
        } else if (state.isSubmitSlide) {
            return <Submit className={classes} model={state.data.submit} />;
        } else if (state.isEndingSlide) {
            return <Ending className={classes} model={state.data.ending} />;
        } else {
            return <SlideRenderer className={className} key={state.currIdx} />;
        }
    };

    return (
         <>
            {renderComponent()}
        </>
    );
};

