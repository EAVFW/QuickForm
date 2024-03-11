import { QuickformClassNames } from "../../state/QuickformState";

export const defaultQuickFormTokens = {

   

    white: '#ffffff',
    black: '#000',
    primary: '#154068',
    primaryLighter: 'color-mix(in srgb, var(--primary) 90%, white)',
    primaryVariant: '#112D4D',
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
    questionQuestionNumberFontSiez: '1.6rem',
    questionInputGap: "3.6rem",
    questionInputFontSize: "3rem",
    questionPlaceholderColor: 'color-mix(in srgb, var(--on-surface) 80%, black)',

    fontFamily: 'var(--chivo), Monaco, Consolas',

    gap1: '0.5rem',
    gap2: '1rem',
    gap4: '2rem',

    borderColor:'var(--primary)'
}

export type LayoutDefinition = {
    classes?: Partial<QuickformClassNames>,
    style?: React.CSSProperties;
    tokens?: Partial<typeof defaultQuickFormTokens>;
    autoAdvanceSlides?: boolean;
    slides?: { [key: string]: SlideLayout };
}

/**
 * A slide is considered a horizontal list of elements called rows.
 * Rows can be a list of columns, or an leaf node that should be rendered.
 */
export type SlideLayout = {
    title?: string;
    style?: React.CSSProperties;
    rows?: SlideElements;
    schemaName?: string;
    logicalName?: string
}

/**
 * SlideElements - a collection of elements that should be rendered within a slide.
 */
export type SlideElements = {
    [key: string]: SlideElement
}

/**
 * A slideElement can be either a set of columns or a question
 */
export type SlideElement = RowColumnsLayout | QuestionRef;

/**
 * The RowColumnsLayout is a row with columns
 * If the type property is unset its assumed to be a row
 */

export type RowColumnsLayout = {
    style?: React.CSSProperties;
    /**
     * If type is unspecified we know its a set of columns.
     */
    type?: "row";
    columns: ColumnsLayoutDefinition;
}

export type ColumnsLayoutDefinition = {
    [key: string]: ColumnLayout | QuestionRef
}

export type ColumnLayout = {
    style?: React.CSSProperties;
    type?: "column"
    rows: SlideElements
}

/**
 * The Question Layout is a reference to a question
 */
export type QuestionRef = {
    style?: React.CSSProperties;
    type: "question";
    ref: string;
}