export type Layout = {
    style?: React.CSSProperties;
    slides?: { [key: string]: SlideLayout };
}

export type Column = {
    style?: React.CSSProperties;
    rows: Row[];
}

export type Row = {
    style?: React.CSSProperties;
    columns?: Column[];
    questionRefLogicalName: string;
}

export type SlideLayout = {
    columns: { [key: string]: Column };
}