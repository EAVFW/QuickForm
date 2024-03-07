import React from 'react';
import { SlideModel } from "../../model";
import { RowRenderer } from '../renderers/row-renderer/RowRenderer';

type SlideProps = {
    model: SlideModel;
}

export const Slide: React.FC<SlideProps> = ({ model }: SlideProps) => {

    return (
        <div id="Slide" style={{ display: 'flex', flexDirection: 'column' }}>
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
    width: '100%',
    //margin: '10px' //PKS - i dont think we want margin here, 
    //alignment of question rows with button at the slide level. 
    //Atleast we then need to compute margin for button also to the same, and then if overriden it gives problems.
}