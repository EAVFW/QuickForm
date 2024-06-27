import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext"
import { ViewNames } from "../../Types/ViewNames"
import { QuickFormEndingSettingsView } from "./QuickFormEndingSettingsView"
import { QuickFormIntroSettingsView } from "./QuickFormIntroSettingsView"
import { QuickFormLayoutView } from "./QuickFormLayoutView"
import { QuickFormQuestionsView } from "./QuickFormQuestionsView"
import { QuickFormSettingsView } from "./QuickFormSettingsView"
import { QuickFormSubmitSettingsView } from "./QuickFormSubmitSettingsView"


export const DesignerViews = () => {

    const { updateQuickFormPayload, quickformpayload, activeQuestion, activeSlide, view } = useQuickFormDefinition();

    return <>
        {view === "settings" && <QuickFormSettingsView />}
        {view === "intro" && <QuickFormIntroSettingsView />}
        {view === "submit" && <QuickFormSubmitSettingsView />}
        {view === "ending" && <QuickFormEndingSettingsView />}
        {view === "layout" && <QuickFormLayoutView slideId={activeSlide} layout={quickformpayload.layout} dispatch={updateQuickFormPayload} />}
        {view === "questions" && <QuickFormQuestionsView dispatch={updateQuickFormPayload} questions={quickformpayload.questions} currentQuestion={activeQuestion} />}
        {view === "sourceView" && <QuickFormQuestionsView dispatch={updateQuickFormPayload} questions={quickformpayload.questions} currentQuestion={activeQuestion} />}
    </>
}