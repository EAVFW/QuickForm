import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../services/QuickFormServices";
import { ImArrowRightIcon } from "../icons";
import { useQuickForm } from "../../state/QuickFormContext";
import React from "react";

const defaultHeadingNumberDisplayProvider: HeadingNumberDisplayProvider = () => {
    const { state } = useQuickForm();
    return state.currStep > 1 && state.currStep <= state.totalSteps + 1;
}

registerQuickFormService("headingNumberDisplayProvider", defaultHeadingNumberDisplayProvider);

/**
 * Deprecated: Use QuestionHeading instead
 * @param param0
 * @returns
 */
export const QuestionNumber: React.FC<{ questionNum?: number }> = ({ questionNum }) => {
    const shouldDisplayNumber = resolveQuickFormService("headingNumberDisplayProvider")();
    if (!shouldDisplayNumber) {
        return null
    }

    return (
        <div className={""}>
            {questionNum}&nbsp;<ImArrowRightIcon size={"12px"} />
        </div>
    )
}