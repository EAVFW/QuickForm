import { Locale } from "./Locale";
import { ViewNames } from "./ViewNames";
import { QuickFormDefinition } from "@eavfw/quickform-core";

export type QuickFormDesignerDefinition = {
    __designer: {
        activeView?: ViewNames;
        activeSlide?: string;
        activeQuestion?: string;
    },
    designerLocale?: Locale,
} & QuickFormDefinition;