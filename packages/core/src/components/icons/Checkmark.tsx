import React from "react";
import { IconProps } from "./iconProps";

export const Checkmark: React.FC<IconProps> = ({ color = "green", size = 100, style }) => {
    return (
        <div style={{ textAlign: 'center', height: size,...style }}>
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke={color}
                    d="M20 6L9 17L4 12"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}