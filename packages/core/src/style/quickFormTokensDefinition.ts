/* Color-scheme is inspired by Material Design (https://m2.material.io/design/color/the-color-system.html#color-theme-creation) */

import { log } from "console";
import { resolveQuickFormService } from "../services/QuickFormServices";
import { camelToKebabCase, defineVariables } from "../utils/quickformUtils";
import { defaultQuickFormTokens } from "./defaultQuickFormTokens";

type Color = string;
type FontSize = string;
type Gap = string;
type NuancedColor<T extends string> = `${T}${'Darker' | 'Lighter'}${'' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`;
type QuickFormStructuredColorProperties = 'primary' | 'onPrimary' | 'secondary' | 'onSecondary' | 'background' | 'onBackground' | 'surface' | 'onSurface' | 'error' | 'onError';

type QuickFormTokensBase = {
    /* Pure colors */
    white: Color,
    black: Color,
    warning: Color,
    success: Color,
    info: Color,
    questionPlaceholderColor: Color,

    /* Structured colors */
    primary: Color,
    onPrimary: Color,
    secondary: Color,
    onSecondary: Color,
    background: Color,
    onBackground: Color,
    surface: Color,
    onSurface: Color,
    error: Color,
    onError: Color,

    /* Typography */
    fontFamily: string,
    headlineFontSize: FontSize;
    subtitleFontSize: FontSize;
    paragraphFontSize: FontSize;
    paragraphMobileFontSize: FontSize;
    btnFontSize: FontSize,
    btnEnterKeyTextFontSize: FontSize,
    btnFontWeight: number,
    multilineTextFontSize: FontSize,
    multilineTextMobileFontSize: FontSize,

    questionHeadlineFontSize: FontSize,
    questionHeadlineFontWeight: number,
    questionParagraphFontSize: FontSize,
    questionNumberFontSize: FontSize,
    questionInputFontSize: FontSize,

    /* Structural properties */
    gap1: Gap,
    gap2: Gap,
    gap4: Gap,
    disabledOpacity: number;
    dividerOpacity: number;
    lowEmphasisOpacity: number;
    mediumEmphasisOpacity: number;
    highEmphasisOpacity: number;

    // Question
    questionBorderRadius: string;
    questionTopMargin: string;
    questionBottomMargin: string;
    questionPadding: string;
    questionInputGap: Gap,
    questionPaddingBottom: string;

    slideButtonIconSize: string;
};

export type QuickFormTokens = QuickFormTokensBase & {
    [Property in NuancedColor<QuickFormStructuredColorProperties>]?: Color;
};

/**
 * Defines and returns the CSS variables for the Quick Form based on provided tokens.
 * This function merges user-defined tokens with the default tokens, ensuring that
 * any customizations are applied on top of the defaults. The result is a flat object
 * where keys are CSS variable names in camel-case, suitable for direct use in styling objects that use React.CSSProperties.
 * 
 * @param tokens - An array of token objects. Each object can partially override the default tokens.
 * @returns A flat object with CSS camel-case variable names as keys and their corresponding values.
 */
export const defineQuickFormTokens = (...tokens: Array<Partial<QuickFormTokens>>) => {
    const logger = resolveQuickFormService("logger");
    logger.log("Merging Quick Form tokens.", tokens);
    // Merges and overrides default tokens with provided ones in reverse order for precedence.
    const mergedTokens = tokens.reduce((prevTokens, currentTokens) => {
        logger.log("Merging currentTokens into prevTokens", prevTokens, currentTokens);
        return ({
            ...prevTokens,
            ...currentTokens,
        })
    }, defaultQuickFormTokens);

    // Ensures merged tokens are camelCase CSS variables that React.CSSProperties can use and return.
    return defineVariables(mergedTokens);
};




/**
 * Provides QuickForm with css tokens to be passed around in the components so they refer to the same css variables that are loaded into the QuickFormProvider upon application instantiation.
 * @returns A flat object with CSS variables in camelCase that have corresponding values provided as kebab-case tokens variable names that map to globally defined colors.
 * See example: quickformtokens = { onPrimary: "var(--on-primary)"; onSecondary: "var(--on-secondary)" } and so on. You get the idea.
 * 
 */

//export const quickformtokens1 = camelToKebabCase(defaultQuickFormTokens);
export type QuickFormTokenVars = {
    [key in keyof QuickFormTokens]: string
}
export const quickformtokens: QuickFormTokenVars  = {
    "white": "var(--white)",
    "black": "var(--black)",
    "warning": "var(--warning)",
    "success": "var(--success)",
    "info": "var(--info)",
    "primary": "var(--primary)",
    "primaryLighter": "var(--primary-lighter)",
    "secondary": "var(--secondary)",
    "background": "var(--background)",
    "onBackground": "var(--on-background)",
    "onBackgroundDarker100": "var(--on-background-darker100)",
    "onBackgroundDarker200": "var(--on-background-darker200)",
    "onBackgroundDarker300": "var(--on-background-darker300)",
    "onBackgroundDarker400": "var(--on-background-darker400)",
    "onBackgroundDarker500": "var(--on-background-darker500)",
    "onBackgroundDarker600": "var(--on-background-darker600)",
    "onBackgroundDarker700": "var(--on-background-darker700)",
    "onBackgroundDarker800": "var(--on-background-darker800)",
    "onBackgroundDarker900": "var(--on-background-darker900)",
    "onBackgroundLighter": "var(--on-background-lighter)",
    "surface": "var(--surface)",
    "onSurface": "var(--on-surface)",
    "error": "var(--error)",
    "onError": "var(--on-error)",
    "onErrorDarker100": "var(--on-error-darker100)",
    "onErrorDarker200": "var(--on-error-darker200)",
    "onErrorDarker300": "var(--on-error-darker300)",
    "onErrorDarker400": "var(--on-error-darker400)",
    "onErrorDarker500": "var(--on-error-darker500)",
    "onErrorDarker600": "var(--on-error-darker600)",
    "onErrorDarker700": "var(--on-error-darker700)",
    "onErrorDarker800": "var(--on-error-darker800)",
    "onErrorDarker900": "var(--on-error-darker900)",
    "onPrimary": "var(--on-primary)",
    "onSecondary": "var(--on-secondary)",
    "fontFamily": "var(--font-family)",
    "headlineFontSize": "var(--headline-font-size)",
    "subtitleFontSize": "var(--subtitle-font-size)",
    "paragraphFontSize": "var(--paragraph-font-size)",
    "paragraphMobileFontSize": "var(--paragraph-mobile-font-size)",
    "btnFontSize": "var(--btn-font-size)",
    "btnFontWeight": "var(--btn-font-weight)",
    "btnEnterKeyTextFontSize": "var(--btn-enter-key-text-font-size)",
    "multilineTextFontSize": "var(--multiline-text-font-size)",
    "multilineTextMobileFontSize": "var(--multiline-text-mobile-font-size)",
    "questionHeadlineFontSize": "var(--question-headline-font-size)",
    "questionParagraphFontSize": "var(--question-paragraph-font-size)",
    "questionNumberFontSize": "var(--question-number-font-size)",
    "questionInputFontSize": "var(--question-input-font-size)",
    "questionInputGap": "var(--question-input-gap)",
    "questionPlaceholderColor": "var(--question-placeholder-color)",
    "questionHeadlineFontWeight": "var(--question-headline-font-weight)",
    "questionBottomMargin": "var(--question-bottom-margin)",
    "questionTopMargin": "var(--question-top-margin)",
    "questionBorderRadius": "var(--question-border-radius)",
    "questionPadding": "var(--question-padding)",
    "questionPaddingBottom": "var(--question-padding-bottom)",
    "gap1": "var(--gap1)",
    "gap2": "var(--gap2)",
    "gap4": "var(--gap4)",
    "disabledOpacity": "var(--disabled-opacity)",
    "dividerOpacity": "var(--divider-opacity)",
    "lowEmphasisOpacity": "var(--low-emphasis-opacity)",
    "mediumEmphasisOpacity": "var(--medium-emphasis-opacity)",
    "highEmphasisOpacity": "var(--high-emphasis-opacity)",
    "slideButtonIconSize": "var(--slide-button-icon-size)" 
}