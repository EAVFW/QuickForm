import { ReactNode } from "react";
import styles from "./Heading.module.css";
import classNames from "classnames";
import { useQuickFormState } from "../../state/QuickFormContext";
import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../services/QuickFormServices";
import { ImArrowRightIcon } from "../../components/icons/ImArrowRight";

type HeadingProps = {
    readonly children: ReactNode;
    readonly className?: string;
    readonly style?: React.CSSProperties;
    questionNum?: number;
};

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    let { currStep, totalSteps } = useQuickFormState();
    return currStep > 1 && currStep <= totalSteps + 1;
}

registerQuickFormService("headingNumberDisplayProvider", defaultHeadingNumberDisplayProvider);

export function Heading({ children, className, questionNum, style = {} }: HeadingProps) {
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
