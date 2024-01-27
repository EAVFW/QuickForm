import { Form } from "../model/Form";
import { Slide } from "../model/Slide";

type SubmitType = { isSubmitting: boolean, isSubmitError: boolean, isSubmitOK: boolean };

export type QuickformState = {
    id?: string;
    errorMsg: string;
    slides: Slide[];
    hasNextSlide: boolean;
    hasPrevSlide: boolean;
    currIdx: number;
    currStep: number;
    totalSteps: number;
    progress: number;
    progressText: string;
    showOverview: boolean;
    submitStatus: SubmitType;
    pdfpreviewurl?: string;
}

export const defaultState = (formData: Form): QuickformState => {
    // TODO - Handle Intro, Ending, Submit and Layout
    const slidesDefined = formData.slides.length > 0;

    return {
        id: "",
        errorMsg: "",
        slides: formData.slides,
        hasNextSlide: slidesDefined,
        hasPrevSlide: false,
        currIdx: 0,
        currStep: slidesDefined ? 1 : 0,
        totalSteps: formData.slides.length,
        progress: 0,
        progressText: "",
        submitStatus: { isSubmitting: false, isSubmitError: false, isSubmitOK: false },
        showOverview: false,
    };
};

