import { ViewNames } from "../../Types/ViewNames";
import { QuickFormDesignerDefinition } from "../../Types/QuickFormDefinition";
import {
    Button,
    tokens,
    Tree,
    TreeItem,
    TreeItemLayout,
} from "@fluentui/react-components";
import { AddIcon, LayoutViewIcon, TrashCanIcon } from "../Icons/IntroViewIcon";
import { makeid } from "../../Utils/makeid";
import { SerializedNodes } from "@craftjs/core";
import { SetStateAction } from "react";

type SlideTreeItemProps = {
    setView: (view: ViewNames) => void;
    updateQuickFormPayload: (value: SetStateAction<QuickFormDesignerDefinition>) => void;
    quickformpayload: QuickFormDesignerDefinition;
    setActiveSlide: (slide?: string | undefined) => void;
    deserialize: (input: string | SerializedNodes) => void;
    activeSlide: string | undefined;
    newSlideNodes: string | SerializedNodes;
}

const SlideTreeItem: React.FC<SlideTreeItemProps> = ({ setView, setActiveSlide, updateQuickFormPayload, activeSlide, quickformpayload, deserialize, newSlideNodes }) => {
    const handleSlideClick = (key: string) => {
        setActiveSlide(key);
        setView("layout");
    };

    const handleRemoveSlide = (key: string) => {
        updateQuickFormPayload((old) => {
            if (old.layout?.slides) {
                delete old.layout.slides[key];
                setView("layout");
            }
            return { ...old };
        });
    };

    const handleAddSlide = () => {
        const id = makeid(16);

        deserialize(newSlideNodes);
        updateQuickFormPayload((old) => {
            if (!old.layout) {
                old.layout = {
                    slides: {}
                };
            }

            if (!old.layout.slides) {
                old.layout.slides = {};
            }

            old.layout.slides[id] = { title: "New Slide", schemaName: "NewSlide", logicalName: "newslide" };
            old.__designer.activeSlide = id;
            return { ...old };
        });
    };

    return (
        <Tree aria-label="Slides">
            {Object.entries(quickformpayload.layout?.slides ?? {}).map(([key, slide]) => (
                <TreeItem key={key} itemType="leaf" onClick={() => handleSlideClick(key)}>
                    <TreeItemLayout style={activeSlide === key ? { background: tokens.colorNeutralBackground1Hover } : {}} iconBefore={<LayoutViewIcon />} actions={<Button
                        aria-label="Remove item"
                        appearance="subtle"
                        onClick={() => handleRemoveSlide(key)}
                        icon={<TrashCanIcon />}
                    />}>
                        {slide.title}
                    </TreeItemLayout>
                </TreeItem>
            ))}
            <TreeItem itemType="leaf">
                <TreeItemLayout iconBefore={<AddIcon />}  >
                    <Button onClick={handleAddSlide} appearance="transparent" >
                        Add Slide
                    </Button>
                </TreeItemLayout>
            </TreeItem>
        </Tree>
    );
}

export default SlideTreeItem;
