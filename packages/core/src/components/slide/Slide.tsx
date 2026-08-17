"use client";
import React from 'react';
import { SlideModel } from "../../model";
import { RowRenderer } from '../renderers/row-renderer/RowRenderer';
import { resolveViewComponent } from '../../services/ViewComponents';

type SlideProps = {
    model: SlideModel;
    className?: string
}

export const Slide: React.FC<SlideProps> = ({ model, className }: SlideProps) => {
    if (model.view) {
        const View = resolveViewComponent(model.view.type);
        return (
            <div id="Slide" className={className}>
                {View
                    ? <View view={model.view} />
                    : (
                        <p
                            role="status"
                            data-quickform-missing-view={model.view.type}
                        >
                            This view is unavailable.
                        </p>
                    )}
            </div>
        );
    }

    return (
        <div
            id="Slide"
            className={className}
        // style={{ display: 'flex', flexDirection: 'column', width: "100%" }}
        >
            {
                model?.rows?.map((row, rowIndex) => (
                    <div
                        id={"row" + rowIndex}
                        key={rowIndex}
                        style={rowContainerStyling}
                    >
                        <RowRenderer
                            key={"row" + rowIndex}
                            row={row}
                            questions={model.questions}
                        />
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
