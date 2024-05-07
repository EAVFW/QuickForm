import React, { useState, useEffect } from "react";
import { TreeItem, TreeItemLayout, TreeItemLayoutProps, tokens } from "@fluentui/react-components";
import { ViewNames } from "../../Types/ViewNames";
import { PropsWithChildren } from "react";

type ViewTreeItemProps = {
    viewName: ViewNames;
    title: string;
    setView: (v: ViewNames) => void;
    selectedView: string;
    icon: TreeItemLayoutProps["iconBefore"];
    childName?: string;
};

export const ViewTreeItem: React.FC<PropsWithChildren<ViewTreeItemProps>> = ({ viewName, title, setView, selectedView, children, icon, childName }) => {
    const [isOpen, setIsOpen] = useState<boolean>(typeof childName === "string");
    const isSelected = selectedView === viewName && !(typeof childName === "string");

    useEffect(() => {
        setIsOpen(selectedView === viewName);
    }, [selectedView, viewName]);

    const handleClick = () => {
        if (childName) {
            setIsOpen(!isOpen);
        } else {
            if (isSelected) {
                if (!isOpen) {
                    setIsOpen(true);
                }
                else {
                    setIsOpen(false);
                }
            } else {
                setView(viewName);
            }
        }
    };

    return (
        <TreeItem open={isOpen} itemType={children ? "branch" : "leaf"} aria-selected={isSelected}>
            <TreeItemLayout iconBefore={icon} onClick={handleClick} style={isSelected ? { background: tokens.colorNeutralBackground1Hover } : {}}>
                {title}
            </TreeItemLayout>
            {children}
        </TreeItem>
    );
};
