
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
import { EditSettingsRegular } from "@fluentui/react-icons"
import { removeNonAlphanumeric } from "@eavfw/utils";
import { QuestionJsonModel } from "@eavfw/quickform-core/src/model/json-definitions/JsonDataModels";
import { VisibilityQueryField } from "@eavfw/quickform-querybuilder";

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
    const { view, activeQuestion, activeSlide, quickformpayload: { layout, questions }, updateQuickFormPayload, designerLocale } = useQuickFormDefinition();

    const [questionKey, setQuestionKey] = useState(activeQuestion ?? '');
    const [displayName, setDisplayName] = useState(questions[activeQuestion!]?.displayName ?? questions[activeQuestion!]?.text);
   


    useEffect(() => { setQuestionKey(activeQuestion ?? ''); }, [activeQuestion])

    const segments = [designerLocale.Title, view, questions[activeQuestion!]?.displayName?? activeQuestion, activeSlide && layout?.slides?.[activeSlide]?.schemaName].filter(x => !!x) as string[];
    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (ev) => {

        if (activeQuestion) {
            updateQuickFormPayload(old => {

                let text = displayName;
                let schemaName = removeNonAlphanumeric(text);
                let logicalName = schemaName.toLowerCase();

                old.questions[activeQuestion] = { ...old.questions[activeQuestion], schemaName, logicalName, displayName  };
               // if (text !== activeQuestion)
               //     delete old.questions[activeQuestion];

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
                            <Field label="Question Key" aria-readonly>
                                <Input readOnly value={questionKey} required type="text" id={"question-key"} onChange={(e, d) => setQuestionKey(d.value)} />
                            </Field>
                            <Field label="Display Name" aria-readonly>
                                <Input readOnly value={displayName ?? questions[activeQuestion!]?.text} required type="text" id={"question-display-name"} onChange={(e, d) => setDisplayName(d.value)} />
                            </Field>
                            {activeQuestion &&
                                <Field label="Question Order">
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
                            <VisibilityQueryField />
                            {/*<Field label="Visible Rule">*/}
                            {/*    <Input value={JSON.stringify( questions[activeQuestion!]?.visible?.rule ?? '')} required type="text" id={"question-schema-name"} onChange={(e, d) => updateQuickFormPayload(old => { old.questions[activeQuestion!].visible = { engine: "JsEval", rule: d.value }; return { ...old }; })} />*/}
                            {/*</Field>*/}
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Discard</Button>
                            </DialogTrigger>
                            <Button type="submit" appearance="primary" onClick={handleSubmit}>
                                Update
                            </Button>
                        </DialogActions>
                    </DialogBody>

                </DialogSurface>
            </Dialog>
            <Breadcrumb
                aria-label={designerLocale.Title + " Breadcrums"}
                size="large"
            >
                {segments.map((s, i) => (
                    <React.Fragment key={s.capitalize()}>
                        {(i) > 0 && <BreadcrumbDivider />}
                        <BreadcrumbItem>
                            <BreadcrumbButton>{s.capitalize()}</BreadcrumbButton>
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