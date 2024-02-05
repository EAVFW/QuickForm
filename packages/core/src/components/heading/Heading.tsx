import { ReactNode } from "react";

type HeadingProps = {
    readonly style?: React.CSSProperties;
    readonly children: ReactNode;
    readonly className?: string;
};

export function Heading({ children, className, style = {} }: HeadingProps) {
    return (
        <h1 className={className} style={style}        >
            {children}
        </h1>
    );
}
