import { ViewNames } from "./ViewNames";

export type QuickFormElement = {
    type: "question",
    ref: string
}
export type QuickFormColumn = {
    [key: string]: QuickFormElement
}
export type QuickFormRow = {
    columns: {
        [key: string]: QuickFormColumn
    }
};
export type QuickFormSlide = {
    title: string
    logicalName?: string;
    schemaName?: string,
    rows?: {
        [key: string]: QuickFormRow
    }
}
export type QuickFormQuestion = {
    inputType?: string,
    text: string
    logicalName?: string;
    schemaName?: string;
}
export type QuickFormDef = {
    __designer: {
        activeView?: ViewNames;
        activeSlide?: string;
        activeQuestion?: string;

    },
    intro: {

    },
    submit: {

    },
    ending: {

    },
    layout: {
        slides: { [key: string]: QuickFormSlide }

    },
    questions: {
        [key: string]: QuickFormQuestion
    }
}
