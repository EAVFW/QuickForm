import { ViewNames } from "./ViewNames";
import { QuickFormDefinition } from "@eavfw/quickform-core"
//export type QuickFormElement = {
//    type: "question",
//    ref: string
//}
//export type QuickFormColumn = {
//    rows: {
//        [key: string]: QuickFormElement
//    }
//}
//export type QuickFormRow = {
//    columns: {
//        [key: string]: QuickFormElement /* | QuickFormColumn this is not supported in designer yet */
//    }
//};
//export type QuickFormSlide = {
//    title: string
//    logicalName?: string;
//    schemaName?: string,
//    rows?: {
//        [key: string]: QuickFormRow
//    }
//}
//export type QuickFormQuestion = {
//    inputType?: string,
//    text: string
//    logicalName?: string;
//    schemaName?: string;
//}
export type QuickFormDesignerDefinition = {
    __designer: {
        activeView?: ViewNames;
        activeSlide?: string;
        activeQuestion?: string;

    },
    //intro: {

    //},
    //submit: {

    //},
    //ending: {

    //},
    //layout: {
    //    slides: { [key: string]: QuickFormSlide }

    //},
    //questions: {
    //    [key: string]: QuickFormQuestion
    //}
} & QuickFormDefinition
