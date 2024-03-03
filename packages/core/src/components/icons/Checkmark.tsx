import React from "react";
import { IconProps } from "./iconProps";

export const Checkmark: React.FC<IconProps> = ({ color = "green" }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <svg
                width="100"
                height="100"
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