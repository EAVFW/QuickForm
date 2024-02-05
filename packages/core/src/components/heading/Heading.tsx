import { ReactNode } from "react";
import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../services/QuickFormServices";
import { ImArrowRightIcon } from "../icons/ImArrowRightIcon";
import { useQuickForm } from "../../state/QuickFormContext";

type HeadingProps = {
    readonly style?: React.CSSProperties;
    readonly children: ReactNode;
    readonly className?: string;
    questionNum?: number;
    displayNumber?: boolean;
};

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    const { state } = useQuickForm();
    return state.currStep > 1 && state.currStep <= state.totalSteps + 1;
}

registerQuickFormService("headingNumberDisplayProvider", defaultHeadingNumberDisplayProvider);

export function Heading({ children, className, questionNum, displayNumber = false, style = {} }: HeadingProps) {
    const shouldDisplayNumber = resolveQuickFormService("headingNumberDisplayProvider")();
    console.log("shouldDisplay", shouldDisplayNumber);
    return (
        <h1
            className={className}
            style={style}
        >
            {shouldDisplayNumber &&
                <div className={""}>
                    {questionNum}&nbsp;<ImArrowRightIcon size={"12px"} />
                </div>
            }
            {children}
        </h1>
    );
}
