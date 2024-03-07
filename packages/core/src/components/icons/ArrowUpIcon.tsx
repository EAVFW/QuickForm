import React from "react";
import { IconProps } from "./iconProps";

export const ArrowUpIcon: React.FC<IconProps> = ({ className, color }) => {
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
                    d="M6 15L12 9L18 15"
                    stroke={color}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};