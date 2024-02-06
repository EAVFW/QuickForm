import React from "react";

type DividerProps = {
    color: string;
}

export const Divider: React.FC<DividerProps> = ({ color }) => {
    const dividerStyle: React.CSSProperties = {
        height: '1px',
        color: color,
        backgroundColor: color,
    };

    return <hr style={dividerStyle} />;
};

