"use client";
import React, { useMemo, useRef, useEffect, useState } from 'react';
import { useQuickForm } from "../state/QuickFormContext";
import { Ending, Submit, Intro, SlideRenderer } from "./index";
import { mergeClasses } from '@griffel/react';

export type QuickFormProps = {
    className?: string;
}
export const QuickForm: React.FC<QuickFormProps> = ({ className}) => {
    const { state, setIntroVisited } = useQuickForm();

    const [slideEffectClassName, setSlideEffectClassName] = useState<string>();

    const classes = useMemo(() => mergeClasses(className, state.classes.slide, slideEffectClassName), [className, state.classes?.slide, slideEffectClassName]);


    let nextAllowedEffectTime = useRef(new Date().getTime());
    useEffect(() => {
        const timeout = setTimeout(() => {

            setSlideEffectClassName(mergeClasses(state.classes.slideIsIn));

        }, Math.max(150, nextAllowedEffectTime.current - new Date().getTime() + 150));

        return () => {
            clearTimeout(timeout);
            setSlideEffectClassName(mergeClasses(state.classes.slideIsOut));
            nextAllowedEffectTime.current = new Date().getTime() + 10;
        }
    }, [state.currIdx, state.data.submit, state.data.ending, state.data.ending]);

    const renderComponent = () => {
        if (state.isIntroSlide && typeof state.data.intro !== "undefined") {
            return <Intro className={classes} model={state.data.intro} onBtnClick={setIntroVisited} />;
        } else if (state.isSubmitSlide) {
            return <Submit className={classes} model={state.data.submit} />;
        } else if (state.isEndingSlide) {
            return <Ending className={classes} model={state.data.ending} />;
        } else {
            return <SlideRenderer className={classes} key={state.currIdx} />;
        }
    };

    return (
         <>
            {renderComponent()}
        </>
    );
};

