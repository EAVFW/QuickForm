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
    warning: Color;
    success: Color;
    info: Color;
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

    error: string,
    onError: Color,

    /* Font-sizes and family */
    fontFamily: string,
    btnFontSize: FontSize,
    questionTextFontSize: FontSize,
    questionParagraphFontSize: FontSize,
    questionQuestionNumberFontSize: FontSize,
    questionInputFontSize: FontSize,

    /* Structural properties */
    questionInputGap: Gap,
    gap1: Gap,
    gap2: Gap,
    gap4: Gap,
    borderColor: string
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
    // Merges and overrides default tokens with provided ones in reverse order for precedence.
    const mergedTokens = tokens.reduceRight((newTokens, currentToken) => ({
        ...currentToken,
        ...newTokens,
    }), defaultQuickFormTokens);

    // Ensures merged tokens are camelCase CSS variables that React.CSSProperties can use and return.
    return defineVariables(mergedTokens);
};




/**
 * Provides QuickForm with css tokens to be passed around in the components so they refer to the same css variables that are loaded into the QuickFormProvider upon application instantiation.
 * @returns A flat object with CSS variables in camelCase that have corresponding values provided as kebab-case tokens variable names that map to globally defined colors.
 * See example: quickformtokens = { onPrimary: "var(--on-primary)"; onSecondary: "var(--on-secondary)" } and so on. You get the idea.
 */
export const quickformtokens = camelToKebabCase(defaultQuickFormTokens);