import { TreeItem, TreeItemLayout, TreeItemLayoutProps, tokens } from "@fluentui/react-components";
import { ViewNames } from "../../Types/ViewNames";

import { PropsWithChildren } from "react";

export const ViewTreeItem: React.FC<PropsWithChildren<{ childName?: string, icon: TreeItemLayoutProps["iconBefore"], title: string, setView: (v: ViewNames) => void, viewName: ViewNames, selectedView: string }>> = (
    { viewName, title, setView, selectedView, children, icon, childName }) => {
    const isOpen = typeof childName === "string";
    const selected = selectedView === viewName && !isOpen;
    return (<TreeItem open={selectedView === viewName} itemType={children ? "branch" : "leaf"} aria-selected={selected} >
        <TreeItemLayout iconBefore={icon} onClick={() => setView(viewName)} style={selected ? { background: tokens.colorNeutralBackground1Hover } : {}}>
            {title}
        </TreeItemLayout>
        {children}
    </TreeItem>)
}