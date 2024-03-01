export type Layout = {
    style?: React.CSSProperties;
    slides?: { [key: string]: SlideLayout };
}

/**
 * A slide is considered a horizontal list of elements called rows.
 * Rows can be a list of columns, or an leaf node that should be rendered.
 */
export type SlideLayout = {
    title?: string;
    style?: React.CSSProperties;
    rows: SlideElements;
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