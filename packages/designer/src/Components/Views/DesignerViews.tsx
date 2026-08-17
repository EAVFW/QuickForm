import React, { ReactNode } from "react"
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext"
import { ViewNames } from "../../Types/ViewNames"
import { QuickFormEndingSettingsView } from "./QuickFormEndingSettingsView"
import { QuickFormIntroSettingsView } from "./QuickFormIntroSettingsView"
import { QuickFormLayoutView } from "./QuickFormLayoutView"
import { QuickFormQuestionsView } from "./QuickFormQuestionsView"
import { QuickFormSettingsView } from "./QuickFormSettingsView"
import { QuickFormSourceView } from "./QuickFormSourceView"
import { QuickFormSubmitSettingsView } from "./QuickFormSubmitSettingsView"
import { TreeItemLayoutProps } from "@fluentui/react-components"


export type QuickFormView = {

    view: React.FC;
    nav?: React.FC;
    title: string;
    navKey: string;
    icon: TreeItemLayoutProps["iconBefore"]
}

export type QuickFormViews = {

    [key: string]: QuickFormView;
  
}

declare global {
    var __eav_qf_views: QuickFormViews | undefined;
}

export function getOrCreateQuickFormViewContainer(): QuickFormViews {
    if (!globalThis.__eav_qf_views) {
        
        globalThis.__eav_qf_views = {};
        ;
    }
    return globalThis.__eav_qf_views;
}

export function registerQuickformView<Key extends keyof QuickFormViews>(name: Key, instance: (QuickFormViews)[Key]) {
    let services = getOrCreateQuickFormViewContainer();
    services[name] = instance;
}

export const DesignerViews = () => {

    const { updateQuickFormPayload, quickformpayload, activeQuestion, activeSlide, view } = useQuickFormDefinition();
    const views = getOrCreateQuickFormViewContainer();
    if (view in views) {

        const View = views[view]?.view;
        return <View />
    }

    return <>
        {view === "settings" && <QuickFormSettingsView />}
        {view === "intro" && <QuickFormIntroSettingsView />}
        {view === "submit" && <QuickFormSubmitSettingsView />}
        {view === "ending" && <QuickFormEndingSettingsView />}
        {view === "layout" && <QuickFormLayoutView slideId={activeSlide} layout={quickformpayload.layout} dispatch={updateQuickFormPayload} />}
        {view === "questions" && <QuickFormQuestionsView dispatch={updateQuickFormPayload} questions={quickformpayload.questions} currentQuestion={activeQuestion} />}
        {view === "sourceView" && <QuickFormSourceView/>}
    </>
}