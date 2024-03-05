import { useEditorChanges } from "@eavfw/designer";
import { QuickFormDesignerDefinition } from "../../Types/QuickFormDefinition";
import { ViewNames } from "../../Types/ViewNames";


import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    Drawer,
    Button,
    tokens,
    Tree,
    TreeItem,
    TreeItemLayout,
    makeStyles,
} from "@fluentui/react-components";
import { DrawerCloseIcon } from "../Icons/DrawerCloseIcon";
import { SettingsViewIcon } from "../Icons/SettingsViewIcon";
import { AddIcon, EndingViewIcon, IntroViewIcon, LayoutViewIcon, QuestionIcon, SubmitViewIcon, TrashCanIcon } from "../Icons/IntroViewIcon";
import { ViewTreeItem } from "./ViewTreeItem";
import { makeid } from "../../Utils/makeid";
import { SerializedNodes } from "@craftjs/core";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { useMemo } from "react";
import { QuestionJsonModel } from "@eavfw/quickform-core/src/model/json-definitions/JsonDataModels";
import { CaretUpFilled, CaretDownFilled } from "@fluentui/react-icons"
const useNavDrawerStyles = makeStyles({
    actions: {
        backgroundColor: tokens.colorNeutralBackground1Hover,
        position: "absolute",
        right:0
    }
})
export const NavDrawer = ({
    setIsOpen, isOpen, newSlideNodes
}: {

    isOpen: boolean, setIsOpen: any,
    newSlideNodes: string | SerializedNodes
}) => {
    const { setView, view, setActiveSlide, activeSlide, quickformpayload, updateQuickFormPayload, setActiveQuestion, activeQuestion } = useQuickFormDefinition();
    const { actions: { history, deserialize } } = useEditorChanges();
    const styles = useNavDrawerStyles();
    const sortedQuestions = useMemo(() => {

        return Object.entries(quickformpayload.questions ?? {}).map(([key, question], index) => [key, question, index] as [string, QuestionJsonModel, number])
            .sort(([_, qa, ai], [__, qb, bi]) => (qa.order ?? ai) - (qb.order ?? bi));

    }, [quickformpayload])

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
                    Quickform
                </DrawerHeaderTitle>
            </DrawerHeader>

            <DrawerBody>
                <Tree>
                    <ViewTreeItem title="Settings" icon={<SettingsViewIcon />} setView={setView} selectedView={view} viewName="settings" />
                    <ViewTreeItem title="Intro" icon={<IntroViewIcon />} setView={setView} selectedView={view} viewName="intro" />
                    <ViewTreeItem title="Submit" icon={<SubmitViewIcon />} setView={setView} selectedView={view} viewName="submit" />
                    <ViewTreeItem title="Ending" icon={<EndingViewIcon />} setView={setView} selectedView={view} viewName="ending" />
                    <ViewTreeItem title="Slides" icon={<LayoutViewIcon />} setView={setView} selectedView={view} viewName="layout" childName={activeSlide}>
                        <Tree aria-label="Slides">
                            {Object.entries(quickformpayload.layout?.slides ?? {}).map(([key, slide]) =>
                                <TreeItem key={key} itemType="leaf" onClick={() => { setActiveSlide(key); setView("layout"); }}>
                                    <TreeItemLayout style={activeSlide === key ? { background: tokens.colorNeutralBackground1Hover } : {}} iconBefore={<LayoutViewIcon />} actions={<Button
                                        aria-label="Remove item"
                                        appearance="subtle"
                                        onClick={() => {
                                            updateQuickFormPayload((old) => { if (old.layout?.slides) delete old.layout.slides[key]; return { ...old }; });
                                            setView("layout");
                                        }}
                                        icon={<TrashCanIcon />}
                                    />}>
                                        {slide.title}
                                    </TreeItemLayout>
                                </TreeItem>
                            )}
                            <TreeItem itemType="leaf">
                                <TreeItemLayout iconBefore={<AddIcon />}  >
                                    <Button onClick={() => {
                                        const id = makeid(16);

                                        deserialize(newSlideNodes);
                                        updateQuickFormPayload((old) => {

                                            if (!old.layout) {
                                                old.layout = {
                                                    slides: {}
                                                };
                                            }


                                            if (!old.layout.slides)
                                                old.layout.slides = {};

                                            old.layout.slides[id] = { title: "New Slide", schemaName: "NewSlide", logicalName: "newslide" };
                                            old.__designer.activeSlide = id;
                                            return { ...old };
                                        });
                                        // setActiveSlide(id);
                                    }}
                                        appearance="transparent" >
                                        Add Slide
                                    </Button>
                                </TreeItemLayout>
                            </TreeItem>
                        </Tree>
                    </ViewTreeItem>
                    <ViewTreeItem title="Questions" icon={<QuestionIcon />} setView={setView} selectedView={view} viewName="questions" childName={activeQuestion}>


                        <Tree aria-label="Questions">
                            {sortedQuestions.map(([key, question], index) =>
                                <TreeItem key={key} itemType="leaf" onClick={() => { setActiveQuestion(key); setView("questions"); }}>
                                    <TreeItemLayout style={activeQuestion === key ? { background: tokens.colorNeutralBackground1Hover } : {}} iconBefore={<QuestionIcon />}
                                        actions={{
                                             className: styles.actions,
                                            children: <>
                                                <Button
                                                    aria-label="Move Up"
                                                    appearance="subtle"
                                                    onClick={() => {
                                                        updateQuickFormPayload((old) => {
                                                            const oq = Object.values(old.questions).find(x => x.order === index - 1)
                                                                ?? old.questions[Object.keys(old.questions)[index - 1]];
                                                            oq.order = index;
                                                            const q = old.questions[key]; q.order = index - 1;

                                                            old.questions = Object.fromEntries(Object.entries(old.questions).map(([k, q], i) => [k, q, q.order ?? i] as [string, QuestionJsonModel, number]).sort(([k, a, i], [k1, b, j]) => i - j))

                                                            return { ...old };
                                                        })
                                                    }}
                                                    icon={<CaretUpFilled />}
                                                />
                                                <Button
                                                    aria-label="Move Down"
                                                    appearance="subtle"
                                                    onClick={() => {
                                                        updateQuickFormPayload((old) => {
                                                            const oq = Object.values(old.questions).find(x => x.order === index + 1)
                                                                ?? old.questions[Object.keys(old.questions)[index + 1]];
                                                            oq.order = index;
                                                            const q = old.questions[key]; q.order = index + 1;

                                                            old.questions = Object.fromEntries(Object.entries(old.questions).map(([k, q], i) => [k, q, q.order ?? i] as [string, QuestionJsonModel, number]).sort(([k, a, i], [k1, b, j]) => i - j))


                                                            return { ...old };
                                                        })
                                                    }}
                                                    icon={<CaretDownFilled />}
                                                />
                                                <Button
                                                    aria-label="Remove item"
                                                    appearance="subtle"
                                                    onClick={() => { updateQuickFormPayload((old) => { delete old.questions[key]; return { ...old }; }) }}
                                                    icon={<TrashCanIcon />}
                                                />
                                            </>
                                        }}>
                                        {question.logicalName ? key : question.text}
                                    </TreeItemLayout>
                                </TreeItem>
                            )}
                            <TreeItem itemType="leaf">
                                <TreeItemLayout iconBefore={<AddIcon />}  >
                                    <Button onClick={() => {
                                        const id = makeid(16);
                                        updateQuickFormPayload((old) => {
                                            if (!old.questions)
                                                old.questions = {};

                                            old.questions[id] = { text: "New Question" };

                                            return { ...old };
                                        });
                                        setActiveQuestion(id);
                                    }}
                                        appearance="transparent"  >
                                        Add Question
                                    </Button>
                                </TreeItemLayout>
                            </TreeItem>
                        </Tree>
                    </ViewTreeItem>
                </Tree>
            </DrawerBody>
        </Drawer>
    )
}