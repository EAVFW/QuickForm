import { ReactNode } from "react";
import styles from "./Heading.module.css";
import classNames from "classnames";
import { useQuickFormState } from "../../state/QuickFormContext";
import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../services/QuickFormServices";

type HeadingProps = {
    readonly children: ReactNode;
    readonly className?: string;
    readonly style?: React.CSSProperties;
    questionNum?: number;
};

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    let { currStep, totalSteps } = useQuickFormState();
    console.log("defaultHeadingNumberDisplayProvider", [currStep, totalSteps])
    return currStep > 1 && currStep <= totalSteps + 1;
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
