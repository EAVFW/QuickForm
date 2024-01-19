import React, { FC, CSSProperties } from 'react';

type DividerProps = {
    color: string;
}

export const Divider: FC<DividerProps> = ({ color }) => {
    const dividerStyle: CSSProperties = {
        height: '1px',
        color: color,
        backgroundColor: color,
    };

    return <hr style={dividerStyle} />;
};

