import { QuickFormTokens } from "../../style/quickFormTokensDefinition";
import { QuickformClassNames } from "../../state/QuickformState";
import { IconType } from "../../components/icons/IconResolver";

export type LayoutDefinition = {
    /**
     * The default text of next button on slides
     */
    defaultNextButtonText?: string;

    defaultEndingSlideIcon?: string;
    classes?: Partial<QuickformClassNames>,
    style?: React.CSSProperties;
    tokens?: Partial<QuickFormTokens>;
    /**
   * If enabled, when all questions for the slide is filled it auto advances to next slide
   */
    autoAdvanceSlides?: boolean;
    /**
     * If enabled, question numbers are shown in the title
     */
    enableQuestionNumbers?: boolean;
    /**
     * If enabled, the user is shown a message to press enter next to the button on the slide
     */
    showPressEnter?: boolean;
    /**
     * The icon used for the slide button
     */
    defaultSlideButtonIcon?: IconType;
    slides?: { [key: string]: SlideLayout };

    /**
     * If enabled, only one question is shown per slide when auto generating slides
     * Defaults to true
     */
    defaultLayoutOneQuestionPerSlide?: boolean;
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
    logicalName?: string;
    buttonText?: string;
    icon?: IconType;
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
    order?: number;
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
    order?: number;
    ref: string;
}