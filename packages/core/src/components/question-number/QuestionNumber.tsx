import { HeadingNumberDisplayProvider, registerQuickFormService, resolveQuickFormService } from "../../services/QuickFormServices";
import { ImArrowRightIcon } from "../icons";
import { useQuickForm } from "../../state/QuickFormContext";
import React from "react";

 

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