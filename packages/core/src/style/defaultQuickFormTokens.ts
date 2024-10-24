import { QuickFormTokens } from "./quickFormTokensDefinition";

export const defaultQuickFormTokens: QuickFormTokens = {
    white: '#ffffff',
    black: '#000',
    warning: '#FFCA28',
    success: '#0F9D58',
    info: '#4285F4',

    primary: '#154068',
    primaryLighter: 'color-mix(in srgb, var(--primary) 90%, white)',
    secondary: '#24517b',

    background: '#ffffff',
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

    surface: '#c9c9c9',
    onSurface: '#000000',

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

    fontFamily: 'var(--chivo), Monaco, Consolas',
    headlineFontSize: '2rem',
    paragraphFontSize: '1.3rem',
    paragraphMobileFontSize: '1.9rem',
    btnFontSize: '2rem',
    btnFontWeight: 700,
    btnEnterKeyTextFontSize: '1.25rem',
    multilineTextFontSize: '2rem',
    multilineTextMobileFontSize: '2.9rem',
    questionHeadlineFontSize: '2.4rem',
    questionParagraphFontSize: '2rem',
    questionNumberFontSize: '1.6rem',
    questionInputFontSize: "3rem",
    questionInputGap: "3.6rem",
    questionPlaceholderColor: 'color-mix(in srgb, var(--on-surface) 80%, black)',
    questionHeadlineFontWeight:400,
    questionBottomMargin: '15px',
    questionTopMargin: '15px',
    questionBorderRadius: '15px',
    questionPadding: '0px',
    gap1: '0.5rem',
    gap2: '1rem',
    gap4: '2rem',
    disabledOpacity: 0.38,
    dividerOpacity: 0.12,
    lowEmphasisOpacity: 0.38,
    mediumEmphasisOpacity: 0.60,
    highEmphasisOpacity: 0.87,
};
