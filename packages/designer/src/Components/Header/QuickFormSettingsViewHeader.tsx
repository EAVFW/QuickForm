
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbDivider,
    BreadcrumbButton,
} from "@fluentui/react-components";
import React from "react";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";

export const QuickFormSettingsViewHeader: React.FC = () => {
    const styles = useViewStyles();
    const { view, activeQuestion, activeSlide, quickformpayload: { layout } } = useQuickFormDefinition();

    const segments = ["QuickForm", view, activeQuestion, activeSlide && layout.slides?.[activeSlide]?.schemaName].filter(x => !!x) as string[];
    return (
        <div className={styles.section}>
        <Breadcrumb
            aria-label="Large breadcrumb example with buttons"
            size="large"
        >
            {segments.map((s, i) => (
                <React.Fragment key={s}>
                    {(i)>0 && <BreadcrumbDivider />}
                    <BreadcrumbItem>
                        <BreadcrumbButton>{s}</BreadcrumbButton>
                    </BreadcrumbItem>
                   
                </React.Fragment>
            ))}
            
            
            
            </Breadcrumb>
        </div>
    )
}