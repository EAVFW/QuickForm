import React from "react";
import { ReactNode } from "react";

type HeadingProps = {
    readonly children: ReactNode;
    readonly style?: React.CSSProperties;
    readonly className?: string;
};

const headingStyles: React.CSSProperties = {
    fontSize: '2.4rem',
    fontWeight: 'unset',
    color: 'var(--on-surface)',
}

export function Heading({ children, className, style = {} }: HeadingProps) {
    return (
        <h1 className={className + " heading"} style={{ ...style, ...headingStyles }} >
            {children}
        </h1>
    );
}
