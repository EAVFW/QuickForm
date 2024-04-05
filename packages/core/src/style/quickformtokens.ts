import { camelToKebabCase, defineVariables } from "../utils/quickformUtils";

type Color = string;
type FontSize = string;
type Gap = string;
type NuancedColor<T extends string> = `${T}${'Darker' | 'Lighter'}${'' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900}`;
type QuickFormStructuredColorProperties = 'primary' | 'onPrimary' | 'secondary' | 'onSecondary' | 'background' | 'onBackground' | 'surface' | 'onSurface' | 'error' | 'onError';

type QuickFormTokensBase = {
    /* Pure colors */
    white: Color,
    black: Color,
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


export const defaultQuickFormTokens: QuickFormTokens = {

    white: '#ffffff',
    black: '#000',
    primary: '#154068',
    primaryLighter: 'color-mix(in srgb, var(--primary) 90%, white)',
    secondary: '#24517b',
    background: '#ffffff',
    surface: '#c9c9c9',

    error: 'var(--surface)',
    onError: '#ff0000',
    onErrorDarker100: 'color-mix(in srgb, var(--on-error) 90%, black)',
    onErrorDarker200: 'color-mix(in srgb, var(--on-error) 80%, black)',
    onErrorDarker300: 'color-mix(in srgb, var(--on-error) 70%, black)',
    onErrorDarker400: 'color-mix(in srgb, var(--on-error) 60%, black)',
    onErrorDarker500: 'color-mix(in srgb, var(--on-error) 50%, black)',
    onErrorDarker600: 'color-mix(in srgb, var(--on-error) 40%, black)',
    onErrorDarker700: 'color-mix(in srgb, var(--on-error) 30%, black)',
    onErrorDarker800: 'color-mix(in srgb, var(--on-error) 20%, black)',
    onErrorDarker900: 'color-mix(in srgb, var(--on-error) 10%, black)',

    onPrimary: '#ffffff',
    onSecondary: '#000000',
    onBackground: '#000000',
    onBackgroundDarker100: 'color-mix(in srgb, var(--on-background) 90%, black)',
    onBackgroundDarker200: 'color-mix(in srgb, var(--on-background) 80%, black)',
    onBackgroundDarker300: 'color-mix(in srgb, var(--on-background) 70%, black)',
    onBackgroundDarker400: 'color-mix(in srgb, var(--on-background) 60%, black)',
    onBackgroundDarker500: 'color-mix(in srgb, var(--on-background) 50%, black)',
    onBackgroundDarker600: 'color-mix(in srgb, var(--on-background) 40%, black)',
    onBackgroundDarker700: 'color-mix(in srgb, var(--on-background) 30%, black)',
    onBackgroundDarker800: 'color-mix(in srgb, var(--on-background) 20%, black)',
    onBackgroundDarker900: 'color-mix(in srgb, var(--on-background) 10%, black)',
    onBackgroundLighter: 'color-mix(in srgb, var(--on-background) 80%, white)',
    onSurface: '#000000',


    btnFontSize: '2rem',
    questionTextFontSize: '2.4rem',
    questionParagraphFontSize: '2rem',
    questionQuestionNumberFontSize: '1.6rem',
    questionInputGap: "3.6rem",
    questionInputFontSize: "3rem",
    questionPlaceholderColor: 'color-mix(in srgb, var(--on-surface) 80%, black)',

    fontFamily: 'var(--chivo), Monaco, Consolas',

    gap1: '0.5rem',
    gap2: '1rem',
    gap4: '2rem',

    borderColor: 'var(--primary)'
}



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