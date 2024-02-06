
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbDivider,
    BreadcrumbButton,
} from "@fluentui/react-components";
import React from "react";
import { useViewStyles } from "../Styles/useViewStyles.styles";

export const QuickFormSettingsViewHeader: React.FC<{ segments: string[] }> = ({ segments }) => {
    const styles = useViewStyles();
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