
import React, { FC } from 'react';

interface ArrowDownProps {
    className?: string;
}

export const ArrowDownIcon: FC<ArrowDownProps> = ({ className }) => {
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
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
};
