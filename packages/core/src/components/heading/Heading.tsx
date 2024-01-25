import { ReactNode } from "react";
import styles from "./Heading.module.css";
import classNames from "classnames";
import { useQuickFormState } from "../../state/QuickFormContext";
import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../state/QuickFormServices";

type HeadingProps = {
    readonly children: ReactNode;
    readonly className?: string;
    readonly style?: React.CSSProperties;
    questionNum?: number;
};

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    let { currentStep, totalSteps } = useQuickFormState();
    console.log("defaultHeadingNumberDisplayProvider", [currentStep, totalSteps])
    return currentStep > 1 && currentStep <= totalSteps + 1;
}

registerQuickFormService("headingNumberDisplayProvider", defaultHeadingNumberDisplayProvider);

export function Heading({ children, className, questionNum, style }: HeadingProps) {
    const { } = useQuickFormState();


    const shouldDisplayNumber = resolveQuickFormService("headingNumberDisplayProvider")();

    return (
        <h1
            className={classNames(styles["heading"], className, questionNum ? ["num"] : "")}
            style={style ? style : {}}
        >
            {shouldDisplayNumber &&
                <div className={""}>
                    {/* TODO - Fix ImArrowRight ICON!! */}
                    {/* {questionNum}&nbsp;<ImArrowRight size={"12px"}/> */}
                </div>
            }
            {children}
        </h1>
    );
}
