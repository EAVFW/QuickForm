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
    questions: {
        [key: string]: {
            /**
             * If this question has been generated by some tool/framework and be used in designer if ediable.
             */
            generated?: boolean;

            schemaName?: string;
            displayName?: string;
        }
    }
} & QuickFormDefinition;