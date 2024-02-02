export type Layout = {
    style?: React.CSSProperties;
    slides?: { [key: string]: SlideLayout };
}

export type SlideLayout = {
    style?: React.CSSProperties;
    rows: { [key: string]: RowLayout };
}

export type RowLayout = {
    style?: React.CSSProperties;
    columns?: { [key: string]: ColumnLayout };
    questionRefLogicalName?: string;
}

export type ColumnLayout = {
    style?: React.CSSProperties;
    rows?: { [key: string]: RowLayout }
}

