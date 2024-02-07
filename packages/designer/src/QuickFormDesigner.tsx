import { RegistereControl } from "@eavfw/apps";
import { CraftEditor, PageDesignEditorProps } from "@eavfw/designer";
import { SettingsDrawer } from "@eavfw/designer-core";
import { ChevronLeft24Regular, ChevronRight24Regular } from "@fluentui/react-icons";
import { useState } from "react";
import { NavDrawer } from "./Components/Drawers/NavDrawer";
import { QuickFormSettingsViewHeader } from "./Components/Header/QuickFormSettingsViewHeader";
import { QuickFormDesignerProvider } from "./Contexts/QuickFormDefContext";
import { useQuickFormDesignerStyles } from "./QuickFormDesigner.styles";

import initial from "@eavfw/designer/src/PageDesigner/defaultPageContent";
import { Button, Tooltip } from "@fluentui/react-components";
import { DesignerViews } from "./Components/Views/DesignerViews";



const QuickFormDesigner = ({ entityName, attributeName, ...props }: PageDesignEditorProps) => {


    const styles = useQuickFormDesignerStyles();
    const [isOpen, setIsOpen] = useState(true);
     
    return <div className={styles.root}>
        <QuickFormDesignerProvider entityName={entityName} attributeName={attributeName}>
            <CraftEditor  >
                <NavDrawer newSlideNodes={initial} isOpen={isOpen} setIsOpen={setIsOpen} />
                <div className={styles.content}>
                    {!isOpen && <Tooltip content="Large with calendar icon only" relationship="label">
                        <Button onClick={() => setIsOpen(true)} size="large" icon={<ChevronRight24Regular />} />
                    </Tooltip>}
                    <div className={styles.contentView}>

                        <QuickFormSettingsViewHeader />

                        <DesignerViews /> 

                    </div>
                    {!isOpen && <Tooltip content="Large with calendar icon only" relationship="label">
                        <Button onClick={() => setIsOpen(true)} size="large" icon={<ChevronLeft24Regular />} />
                    </Tooltip>}
                </div>
                <SettingsDrawer />
            </CraftEditor>
        </QuickFormDesignerProvider>
    </div>
}
RegistereControl("QuickFormDesigner", QuickFormDesigner);


