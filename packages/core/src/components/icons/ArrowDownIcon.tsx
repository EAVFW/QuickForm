import React from "react";
import type { IconProps } from "./iconProps";

export const ArrowDownIcon: React.FC<IconProps> = ({ className, color }) => {
    return (
        <div className={className}>
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                style={{ backgroundColor: 'transparent' }}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 9L12 15L18 9"
                    stroke={color}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};