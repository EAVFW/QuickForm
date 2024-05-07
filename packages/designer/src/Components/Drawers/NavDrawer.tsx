import { useEditorChanges } from "@eavfw/designer";
import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    Drawer,
    Button,
    Tree,
} from "@fluentui/react-components";
import { DrawerCloseIcon } from "../Icons/DrawerCloseIcon";
import { SettingsViewIcon } from "../Icons/SettingsViewIcon";
import { EndingViewIcon, IntroViewIcon, LayoutViewIcon, QuestionIcon, SubmitViewIcon } from "../Icons/IntroViewIcon";
import { ViewTreeItem } from "./ViewTreeItem";
import { SerializedNodes } from "@craftjs/core";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import SlideTreeItem from "./SlideTreeItem";
import QuestionTreeItem from "./QuestionTreeItem";

type NavDrawerProps = {
    isOpen: boolean;
    setIsOpen: any;
    newSlideNodes: string | SerializedNodes;
}

export const NavDrawer = ({ setIsOpen, isOpen, newSlideNodes }: NavDrawerProps) => {

    const { setView, view, setActiveSlide, activeSlide, quickformpayload, updateQuickFormPayload, setActiveQuestion, activeQuestion, designerLocale } = useQuickFormDefinition();
    const { actions: { history, deserialize } } = useEditorChanges();

    return (
        <Drawer
            type="inline"
            separator
            open={isOpen}
            onOpenChange={(_, { open }) => setIsOpen(open)}
        >
            <DrawerHeader>
                <DrawerHeaderTitle
                    action={
                        <Button
                            appearance="subtle"
                            aria-label="Close"
                            icon={<DrawerCloseIcon />}
                            onClick={() => setIsOpen(false)}
                        />
                    }
                >
                    {designerLocale.Title}
                </DrawerHeaderTitle>
            </DrawerHeader>

            <DrawerBody>
                <Tree>
                    <ViewTreeItem title="Intro" icon={<IntroViewIcon />} setView={setView} selectedView={view} viewName="intro" />
                    <ViewTreeItem title="Slides" icon={<LayoutViewIcon />} setView={setView} selectedView={view} viewName="layout" childName={activeSlide}>
                        <SlideTreeItem
                            activeSlide={activeSlide}
                            deserialize={deserialize}
                            quickformpayload={quickformpayload}
                            setActiveSlide={setActiveSlide}
                            setView={setView}
                            updateQuickFormPayload={updateQuickFormPayload}
                            newSlideNodes={newSlideNodes}
                        />
                    </ViewTreeItem>
                    <ViewTreeItem title="Questions" icon={<QuestionIcon />} setView={setView} selectedView={view} viewName="questions" childName={activeQuestion}>
                        <QuestionTreeItem
                            activeQuestion={activeQuestion}
                            quickformpayload={quickformpayload}
                            setView={setView}
                            setActiveQuestion={setActiveQuestion}
                            updateQuickFormPayload={updateQuickFormPayload}
                        />
                        <ViewTreeItem title="Submit" icon={<SubmitViewIcon />} setView={setView} selectedView={view} viewName="submit" />
                        <ViewTreeItem title="Ending" icon={<EndingViewIcon />} setView={setView} selectedView={view} viewName="ending" />
                    </ViewTreeItem>
                    <ViewTreeItem title="Settings" icon={<SettingsViewIcon />} setView={setView} selectedView={view} viewName="settings" />
                </Tree>
            </DrawerBody>
        </Drawer>
    )
}