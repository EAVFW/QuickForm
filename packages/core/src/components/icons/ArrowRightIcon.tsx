import React from "react";
import type { IconProps } from "./iconProps";

export const ArrowRightIcon: React.FC<IconProps> = ({ className, color }) => {
    return (

        <div className={className}>
            <svg transform="matrix(1.8369701987210297e-16,1,1,-1.8369701987210297e-16,0,0)"
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