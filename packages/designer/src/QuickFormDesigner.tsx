import { RegistereControl, useModelDrivenApp } from "@eavfw/apps";
import { CraftEditor, PageDesignEditor, PageDesignEditorProps, useEditorChanges } from "@eavfw/designer";
import { SettingsDrawer, registerNode } from "@eavfw/designer-core";
import { useState, useEffect, PropsWithChildren, useMemo, useCallback } from "react";
import { Dismiss24Regular, SlideText24Regular, ChevronRight24Regular, ChevronLeft24Regular, AddSquare24Regular, BookQuestionMark24Regular, ContentSettings24Filled, Send24Regular, ApprovalsApp24Filled, Delete20Regular, ContentSettings24Regular, BookInformation24Regular } from "@fluentui/react-icons";

import { Tree, TreeItemLayoutProps, TreeItem, TreeItemLayout, Tooltip } from "@fluentui/react-components";

import {
    DrawerBody,
    DrawerHeader,
    DrawerHeaderTitle,
    Drawer,
    DrawerProps,
    Button,
    Label,
    Radio,
    RadioGroup,
    makeStyles,
    shorthands,
    tokens,
    useId,
} from "@fluentui/react-components";
import { QuickFormSettingsView } from "./Components/Views/QuickFormSettingsView";
import { QuickFormIntroSettingsView } from "./Components/Views/QuickFormIntroSettingsView";
import { QuickFormSubmitSettingsView } from "./Components/Views/QuickFormSubmitSettingsView";
import { QuickFormEndingSettingsView } from "./Components/Views/QuickFormEndingSettingsView";
import { QuickFormQuestionsView } from "./Components/Views/QuickFormQuestionsView";
import { QuickFormLayoutView } from "./Components/Views/QuickFormLayoutView";
import { QuickFormSettingsViewHeader } from "./Components/Header/QuickFormSettingsViewHeader";

function makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

const useStyles = makeStyles({
    root: {
        ...shorthands.border("2px", "solid", "#ccc"),
        ...shorthands.overflow("hidden"),

        display: "flex",
        minHeight: "480px",
        backgroundColor: tokens.colorNeutralBackground2,
        position: "relative"
    },

    content: {
        ...shorthands.flex(1),
        display: "flex",
        zIndex: 10
    },

    contentView: {
        ...shorthands.flex(1),
        display: "flex",
        flexDirection: "column"

    },


    field: {
        display: "grid",
        gridRowGap: tokens.spacingVerticalS,
    },
});
import { removeNonAlphanumeric } from "@eavfw/utils";
type ViewNames = "settings" | "intro" | "submit" | "ending" | "layout" | "questions";

const ViewTreeItem: React.FC<PropsWithChildren<{ childName?:string, icon: TreeItemLayoutProps["iconBefore"], title: string, setView: (v: ViewNames) => void, viewName: ViewNames, selectedView: string }>> = (
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
export type QuickFormElement = {
    type: "question",
    ref: string
}
export type QuickFormColumn = {
    [key: string]: QuickFormElement
}
export type QuickFormRow = {
    columns: {
        [key: string]: QuickFormColumn
    }
};
export type QuickFormSlide = {
    title: string
    logicalName?: string;
    schemaName?: string,
    rows?: {
        [key: string]: QuickFormRow
    }
}
export type QuickFormQuestion = {
    inputType?: string,
    text: string
    logicalName?: string;
    schemaName?: string;
}
export type QuickFormDef = {
    __designer: {
        activeView?: ViewNames;
        activeSlide?: string;
        activeQuestion?: string;

    },
    intro: {

    },
    submit: {

    },
    ending: {

    },
    layout: {
        slides: { [key: string]: QuickFormSlide }

    },
    questions: {
        [key: string]: QuickFormQuestion
    }
}

import { useEAVForm } from '@eavfw/forms';
import { isLookup } from "@eavfw/manifest";
import { gzip, ungzip } from "pako";
import initial from "@eavfw/designer/src/PageDesigner/defaultPageContent";


const NavDrawer = ({
    setIsOpen, isOpen, setView, view, quickformpayload, activeSlide, updateQuickFormPayload, setActiveSlide, setActiveQuestion, activeQuestion
}: {
        updateQuickFormPayload: React.Dispatch<React.SetStateAction<QuickFormDef>>, setActiveSlide: any, activeSlide?: string,
        isOpen: boolean, setIsOpen: any, setView: any, activeQuestion?:string,
        setActiveQuestion:any,
        view: ViewNames, quickformpayload: QuickFormDef
}) => {

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
                            icon={<Dismiss24Regular />}
                            onClick={() => setIsOpen(false)}
                        />
                    }
                >
                    Quickform
                </DrawerHeaderTitle>
            </DrawerHeader>

            <DrawerBody>
                <Tree>
                    <ViewTreeItem title="Settings" icon={<ContentSettings24Filled />} setView={setView} selectedView={view} viewName="settings" />
                    <ViewTreeItem title="Intro" icon={<BookInformation24Regular />} setView={setView} selectedView={view} viewName="intro" />
                    <ViewTreeItem title="Submit" icon={<Send24Regular />} setView={setView} selectedView={view} viewName="submit" />
                    <ViewTreeItem title="Ending" icon={<ApprovalsApp24Filled />} setView={setView} selectedView={view} viewName="ending" />
                    <ViewTreeItem title="Slides" icon={<SlideText24Regular />} setView={setView} selectedView={view} viewName="layout" childName={activeSlide}>
                        <Tree aria-label="Slides">
                            {Object.entries(quickformpayload.layout?.slides ?? {}).map(([key, slide]) =>
                                <TreeItem key={key} itemType="leaf" onClick={() => { setActiveSlide(key); setView("layout"); }}>
                                    <TreeItemLayout style={activeSlide === key ? { background: tokens.colorNeutralBackground1Hover } : {}} iconBefore={<SlideText24Regular />} actions={<Button
                                        aria-label="Remove item"
                                        appearance="subtle"
                                        onClick={() => {
                                            updateQuickFormPayload((old) => { delete old.layout.slides[key]; return { ...old }; });
                                            setView("layout");
                                        }}
                                        icon={<Delete20Regular />}
                                    />}>
                                        {slide.title}
                                    </TreeItemLayout>
                                </TreeItem>
                            )}
                            <TreeItem itemType="leaf">
                                <TreeItemLayout iconBefore={<AddSquare24Regular />}  >
                                    <Button onClick={() => {
                                        const id = makeid(16);

                                        deserialize(initial);
                                        updateQuickFormPayload((old) => {

                                            if (!old.layout) {
                                                old.layout = {
                                                    slides: {}
                                                };
                                            }


                                            if (!old.layout.slides)
                                                old.layout.slides = {};

                                            old.layout.slides[id] = { title: "New Slide" };
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
                    <ViewTreeItem title="Questions" icon={<BookQuestionMark24Regular />} setView={setView} selectedView={view} viewName="questions" childName={activeQuestion}>


                        <Tree aria-label="Questions">
                            {Object.entries(quickformpayload.questions ?? {}).map(([key, slide]) =>
                                <TreeItem key={key} itemType="leaf" onClick={() => { setActiveQuestion(key); setView("questions"); }}>
                                    <TreeItemLayout style={activeQuestion === key ? { background: tokens.colorNeutralBackground1Hover } : {}} iconBefore={<BookQuestionMark24Regular />} actions={<Button
                                        aria-label="Remove item"
                                        appearance="subtle"
                                        onClick={() => { updateQuickFormPayload((old) => { delete old.questions[key]; return { ...old }; }) }}
                                        icon={<Delete20Regular />}
                                    />}>
                                        {slide.text}
                                    </TreeItemLayout>
                                </TreeItem>
                            )}
                            <TreeItem itemType="leaf">
                                <TreeItemLayout iconBefore={<AddSquare24Regular />}  >
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
import { createContext, useContext } from "react";
const QuickFormDefContext = createContext<QuickFormDef | undefined>(undefined);
const useQuickFormDefinition = () => useContext(QuickFormDefContext)!;
const QuickFormDesigner = ({ entityName, attributeName, ...props }: PageDesignEditorProps) => {


    const [formData, { onChange: onFormDataChange }] = useEAVForm((state) => state.formValues);
    const app = useModelDrivenApp();
    const entity = app.getEntity(entityName);
    const column = entity.attributes[attributeName];

    const old = useMemo(() => {

        // console.log("Resetting from data", [value, formData, ungzip(atob(value), { to: 'string' })]);
        try {
            return isLookup(column.type) ?
                formData[column.logicalName.slice(0, -2)]?.data ? ungzip(new Uint8Array(atob(formData[column.logicalName.slice(0, -2)]?.data as string).split("").map(function (c) {
                    return c.charCodeAt(0);
                })), { to: "string" }) as string : undefined
                : formData[column.logicalName] ? ungzip(new Uint8Array(atob(formData[column.logicalName] as string).split("").map(function (c) {
                    return c.charCodeAt(0);
                })), { to: "string" }) as string : undefined

        } catch (err) {
            console.log(err);
            return undefined;
        }
    }, [formData[column.logicalName]]);

    const [quickformpayload, updateQuickFormPayload] = useState<QuickFormDef>(JSON.parse(old ?? JSON.stringify({
        intro: {

        },
        submit: {

        },
        ending: {

        },
        layout: {
            slides: {
                "slide1": {
                    title: "Slide 1",
                },
                "slide2": {
                    title: "Slide 2",
                }
            }
        },
        questions: {
            "q1": {
                title: "Question 1",
                inputType: "text"
            }
        }
    })));
    console.log("quickformpayload",[quickformpayload]);
    useEffect(() => {
        const json = JSON.stringify(quickformpayload);
        if (old !== json) {
            console.log("Changing PageDesignEditor Content", [formData, JSON.parse(old ?? "{}"), JSON.parse(json)]);
            // console.log([JSON.parse(old ?? "{}"), JSON.parse(json)]);
            const content = { ... (formData[column.logicalName.slice(0, -2)] ?? { path: "page.json", container: "pages", contenttype: "application/json" }) };
            //console.log(gzip(json, { to: "string" }));
            //console.log(btoa(gzip(json, { to: "string" })));
            // var decoder = new TextDecoder('utf-8');
            // var b64encoded = btoa(unescape(lzstring.compressToUTF16(json)));

            //var decoder = new TextDecoder('utf8');
            //var b64encoded = btoa(decoder.decode(gzip(json)));

            content.data = btoa(String.fromCharCode.apply(null, Array.from(gzip(json))));
            onFormDataChange(props => {
                if (isLookup(column.type)) {
                    props[column.logicalName.slice(0, -2)] = content;
                } else {
                    props[column.logicalName] = content.data;
                }

            });
        }
    }, [quickformpayload, old, formData, column.logicalName]);


    const [isOpen, setIsOpen] = useState(true);
    const view = quickformpayload.__designer?.activeView ?? "settings";
    const activeQuestion = quickformpayload.__designer?.activeQuestion;
    const activeSlide = quickformpayload.__designer?.activeSlide;
    const setActiveSlide = (slide?: string) => updateQuickFormPayload(old => { if (!old.__designer) { old.__designer = {} }; old.__designer.activeSlide = slide; return { ...old }; });
    const setActiveQuestion = (question?: string) => updateQuickFormPayload(old => { if (!old.__designer) { old.__designer = {} }; old.__designer.activeQuestion = question; return { ...old }; });
    const setView = (view?: ViewNames) => updateQuickFormPayload(old => { if (!old.__designer) { old.__designer = {} }; old.__designer.activeView = view; return { ...old }; });

  
    


    useEffect(() => {
        if (view !== "layout" && activeSlide)
            setActiveSlide(undefined);
    }, [view, activeSlide]);
    useEffect(() => {
        if (view !== "questions" && activeQuestion)
            setActiveQuestion(undefined);
    }, [view, activeQuestion]);
    const styles = useStyles();
    return <div className={styles.root}>
        <QuickFormDefContext.Provider value={quickformpayload}>
            <CraftEditor  >
            <NavDrawer isOpen={isOpen} quickformpayload={quickformpayload} setActiveQuestion={setActiveQuestion} setActiveSlide={setActiveSlide} setIsOpen={setIsOpen} setView={setView}
                updateQuickFormPayload={updateQuickFormPayload} view={view} activeQuestion={activeQuestion} activeSlide={activeSlide} />
            <div className={styles.content}>
                {!isOpen && <Tooltip content="Large with calendar icon only" relationship="label">
                    <Button onClick={() => setIsOpen(true)} size="large" icon={<ChevronRight24Regular />} />
                </Tooltip>}
                <div className={styles.contentView}>
                    <QuickFormSettingsViewHeader segments={["QuickForm", view, activeQuestion, activeSlide].filter(x => !!x) as string[]} />

                    {view === "settings" && <QuickFormSettingsView />}
                    {view === "intro" && <QuickFormIntroSettingsView />}
                    {view === "submit" && <QuickFormSubmitSettingsView />}
                    {view === "ending" && <QuickFormEndingSettingsView />}
                    {view === "layout" && <QuickFormLayoutView slideId={activeSlide} layout={quickformpayload.layout} dispatch={updateQuickFormPayload} />}
                    {view === "questions" && <QuickFormQuestionsView dispatch={updateQuickFormPayload} questions={quickformpayload.questions} currentQuestion={activeQuestion} />}


                </div>
                {!isOpen && <Tooltip content="Large with calendar icon only" relationship="label">
                    <Button onClick={() => setIsOpen(true)} size="large" icon={<ChevronLeft24Regular />} />
                </Tooltip>}
            </div>
            <SettingsDrawer />
            </CraftEditor>
        </QuickFormDefContext.Provider>
    </div>
}
RegistereControl("QuickFormDesigner", QuickFormDesigner);

import { useNode, useEditor } from "@craftjs/core";
import { Placeholder} from "@eavfw/designer-nodes"

const QuestionCraftNode: React.FC<PropsWithChildren<Partial<{ questionid?: string }>>> & { craft?: any } = ({ questionid }) => {

    
 
    const {
        connectors: { connect }
    } = useNode((node) => ({ selected: node.events.selected }));
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,

    }));
    const { questions } = useQuickFormDefinition();


    if (enabled) {
        return <Placeholder ref={connect as any}>Question {questionid ? questions[questionid]?.text : ''}: click to configure</Placeholder>
    }

    return <div></div>
}
import { Field, Input, Dropdown, Option } from "@fluentui/react-components"
const QuestionCraftNodeSettings = () => {
    const { questions } = useQuickFormDefinition();
    const { setProp, questionid, actions: { } } = useNode(x => ({ questionid: x.data.props.questionid }));
    const { actions: { selectNode } } = useEditor();
    return (
        <Field label="Question">
            <Dropdown selectedOptions={questionid ? [questionid] : []} value={questions[questionid]?.text} onOptionSelect={(e, d) => {
                setProp((p) => p.questionid = d.optionValue);
                selectNode();
            }}>
                {Object.entries(questions).map(([key, question]) => <Option text={question.text} value={key}>{question.text}</Option>)}
            </Dropdown>
        </Field>
    )

}

QuestionCraftNode.craft = {
    displayName: 'Question',
    props: {

    },
    custom: {
        target:"components",
        renderNode: {
            canAddLeft: false,
            canAddRight: false,
            canAddTop: true,
            canAddBottom: true
        }
    },
    related: {
        toolbar: QuestionCraftNodeSettings
    },
    rules: {
        canDrag: () => true,
    },
    
};
registerNode("Question", QuestionCraftNode);