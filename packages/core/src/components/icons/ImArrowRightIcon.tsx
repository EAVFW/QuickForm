import React from "react";
import { IconProps } from "./iconProps";
import { quickformtokens } from "../../style/quickFormTokensDefinition";

export const ImArrowRightIcon: React.FC<IconProps> = ({ size = '20px', style }) => {
    return (
        <svg style={{ fill: quickformtokens.onSurface, ... style }} width={size} stroke="currentColor" fill="currentColor" strokeWidth="0" version="1.1" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5 8l-7.5-7.5v4.5h-8v6h8v4.5z"></path>
        </svg>
        //<> 
        //    <svg viewBox="0 0 448 512" height={size} width={size} style={{ fill: quickformtokens.onSurface  }}>
        //    <path stroke={quickformtokens.onSurface} d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        //    </svg>
        //</>
    );
};