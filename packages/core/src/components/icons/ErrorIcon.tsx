import React from "react";
import { IconProps } from "./iconProps";

export const ErrorIcon: React.FC<IconProps> = ({ style, color = "red", size = 100 }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={style}
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke={color}
                    strokeWidth="2"
                />
                <line
                    x1="6"
                    y1="6"
                    x2="18"
                    y2="18"
                    stroke={color}
                    strokeWidth="2"
                />
                <line
                    x1="18"
                    y1="6"
                    x2="6"
                    y2="18"
                    stroke={color}
                    strokeWidth="2"
                />
            </svg>
        </div>
    );
}
