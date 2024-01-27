// TODO - Define layout model

import { Slide } from "./Slide";

export type Layout = {
    style?: React.CSSProperties;
    [key: string]: {};
    slides: Slide[];
}

export type Column = {
    style?: React.CSSProperties;
    // A column can contain multiple rows
    rows?: { [key: string]: Row };
};

export type Row = {
    style?: React.CSSProperties;
    // A row can contain columns
    columns?: { [key: string]: Column };
    questionRefLogicalName: string;
};