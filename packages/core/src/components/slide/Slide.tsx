"use client";
import React from 'react';
import { SlideModel } from "../../model";
import { RowRenderer } from '../renderers/row-renderer/RowRenderer';

type SlideProps = {
    model: SlideModel;
    className?: string
}

export const Slide: React.FC<SlideProps> = ({ model, className }: SlideProps) => {

    return (
        <div className={className} id="Slide" style={{ display: 'flex', flexDirection: 'column', width: "100%" }}>
            {
                model.rows.map((row, rowIndex) => (
                    <div key={rowIndex} style={rowContainerStyling}>
                        <RowRenderer key={"row" + rowIndex} row={row} questions={model.questions} />
                    </div>
                ))
            }
        </div>
    );
};

const rowContainerStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
}