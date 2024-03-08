
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbDivider,
    BreadcrumbButton,
    Button,
    Dialog,
    DialogSurface,
    DialogBody,
    DialogTitle,
    DialogContent,
    Label,
    makeStyles,
    Field,
    Input,
    DialogActions,
    DialogTrigger,
    useRestoreFocusTarget,
} from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import { useViewStyles } from "../Styles/useViewStyles.styles";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import { SettingsRegular, EditSettingsRegular } from "@fluentui/react-icons"
import { removeNonAlphanumeric } from "@eavfw/utils";
import { QuickFormQuestionsDefinition } from "@eavfw/quickform-core/src/model/json-definitions/QuickFormQuestionsDefinition";
import { QuestionJsonModel } from "@eavfw/quickform-core/src/model/json-definitions/JsonDataModels";


const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});

export const QuickFormSettingsViewHeader: React.FC = () => {
    const styles = useViewStyles();
    const dialogstyles = useStyles();
    const [open, setOpen] = React.useState(false);


    const restoreFocusTargetAttribute = useRestoreFocusTarget();

    const { view, activeQuestion, activeSlide, quickformpayload: { layout, questions }, updateQuickFormPayload } = useQuickFormDefinition();

    const [questionKey, setQuestionKey] = useState(activeQuestion ?? '');
    useEffect(() => { setQuestionKey(activeQuestion ?? ''); }, [activeQuestion])

    const segments = ["QuickForm", view, activeQuestion, activeSlide && layout?.slides?.[activeSlide]?.schemaName].filter(x => !!x) as string[];
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (ev) => {

        if (activeQuestion) {
            updateQuickFormPayload(old => {

                let text = questionKey;
                let schemaName = removeNonAlphanumeric(text);
                let logicalName = schemaName.toLowerCase();

                old.questions[text] = { ...old.questions[activeQuestion], schemaName, logicalName };
                if (text !== activeQuestion)
                    delete old.questions[activeQuestion];

                if (!old.__designer)
                    old.__designer = {};

                old.__designer.activeQuestion = text;

                return { ...old };
            });
            setOpen(false);
        }

    };
    return (
        <div className={styles.section}>
            <Dialog open={open}
                onOpenChange={(event, data) => {
                    // it is the users responsibility to react accordingly to the open state change
                    setOpen(data.open);
                }}>

                <DialogSurface aria-describedby={undefined}>

                    <DialogBody>
                        <DialogTitle>Question Settings</DialogTitle>
                        <DialogContent className={dialogstyles.content}>
                            <Field label="Question Key">
                                <Input value={questionKey} required type="text" id={"question-schema-name"} onChange={(e, d) => setQuestionKey(d.value)} />
                            </Field>
                            {activeQuestion && <Field label="Question Order">
                                <Input
                                    value={(questions[activeQuestion]?.order ?? Object.keys(questions).indexOf(activeQuestion))?.toString()}
                                    required type="number" id={"question-order"}
                                    onChange={(e, d) => updateQuickFormPayload(old => {
                                        old.questions[activeQuestion].order = parseInt(d.value);

                                        old.questions = Object.fromEntries(Object.entries(old.questions).map(([k, q], i) => [k, q, q.order ?? i] as [string, QuestionJsonModel, number]).sort(([k, a, i], [k1, b, j]) => i - j))

                                        return { ...old }
                                    })} />
                            </Field>
                           
                            }
                            <Field label="Visible Rule">
                                <Input value={questions[activeQuestion!]?.visible?.rule ?? ''} required type="text" id={"question-schema-name"} onChange={(e, d) => updateQuickFormPayload(old => { old.questions[activeQuestion!].visible = { engine : "JsEval", rule: d.value }; return { ...old }; })} />
                            </Field>
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Close</Button>
                            </DialogTrigger>
                            <Button type="submit" appearance="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </DialogActions>
                    </DialogBody>

                </DialogSurface>
            </Dialog>
            <Breadcrumb
                aria-label="QuickForm Breadcrums"
                size="large"
            >
                {segments.map((s, i) => (
                    <React.Fragment key={s}>
                        {(i) > 0 && <BreadcrumbDivider />}
                        <BreadcrumbItem>
                            <BreadcrumbButton>{s}</BreadcrumbButton>
                            {(i + 1) === segments.length && activeQuestion && <Button appearance="transparent" icon={<EditSettingsRegular />}{...restoreFocusTargetAttribute} onClick={() => {
                                // it is the user responsibility to open the dialog
                                setOpen(true);
                            }} />}
                        </BreadcrumbItem>

                    </React.Fragment>
                ))}



            </Breadcrumb>
        </div>
    )
}