
import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Field, Input, makeStyles } from "@fluentui/react-components"
import { PropsWithChildren, useCallback, useState } from 'react';

import { useQuickFormDefinition } from "@eavfw/quickform-designer";
import { QueryBuilderFluent } from '@react-querybuilder/fluent';
import { QueryBuilder, defaultValidator, defaultOperators, formatQuery, RuleGroupType, RuleType } from 'react-querybuilder';

import { EditRegular } from "@fluentui/react-icons";
import { FieldTypes, InputComponentFieldMetadata, InputComponentMetadata, InputComponentSelectFieldMetadata, QuickformState, resolveInputComponent } from '@eavfw/quickform-core';
import { QuickFormQuestionsDefinition } from '@eavfw/quickform-core/src/model/json-definitions/QuickFormQuestionsDefinition';
import { QuestionJsonModel } from '@eavfw/quickform-core/src/model/json-definitions/JsonDataModels';

import 'react-querybuilder/dist/query-builder.scss';
import { registerVisibilityEngine } from "@eavfw/quickform-core/src/state/action-handlers/VisibilityHandler";
import { QuestionModel } from "@eavfw/quickform-core/src/model";
import React from "react";

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

const QueryBuilderFluentFix = QueryBuilderFluent as React.FC<PropsWithChildren>;

function hasInputType(entry: [string, QuestionJsonModel]): entry is [string, WithRequired<QuestionJsonModel, 'inputType'>] {
    return !!entry[1].inputType;
}
function hasFieldMetadata<T, T1>(entry: [string, T, InputComponentMetadata<T1>]): entry is [string, T, WithRequired<InputComponentMetadata<T1>, 'field'>] {
    return !!entry[2].field;
}

const useVisibilityQueryFieldStyles = makeStyles({
    dialog: {
        maxWidth: "80vw"
    }
})

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

function isSelectField<T>(field: WithRequired<InputComponentMetadata<T>, 'field'>, type: FieldTypes<T>): field is Overwrite<WithRequired<InputComponentMetadata<T>, 'field'>, { field: InputComponentSelectFieldMetadata<T> }> {
    return type === "select" || type === "multiselect";
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode, resetRule: () => void }, { hasError: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        console.error("ERROR", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <h1>Something went wrong.<Button onClick={() => { this.props.resetRule(); this.setState({ hasError: false }); }}>Reset Rule</Button> </h1>;
        }

        return this.props.children;
    }
}


export const VisibilityQueryField = () => {

    const styles = useVisibilityQueryFieldStyles();

    const { view, activeQuestion, activeSlide, quickformpayload: { layout, questions }, updateQuickFormPayload } = useQuickFormDefinition();


    const [{ isOpen, value, query, fields }, setState] = useState(() => ({
        isOpen: false,
        value: formatQuery(questions[activeQuestion!].visible?.engine === "react-querybuilder" && questions[activeQuestion!].visible?.rule ? questions[activeQuestion!].visible?.rule : { combinator: 'and', rules: [] }, 'cel'),
        query: questions[activeQuestion!].visible?.engine === "react-querybuilder" && questions[activeQuestion!].visible?.rule ? questions[activeQuestion!].visible?.rule : { combinator: 'and', rules: [] },
        fields: Object.entries(questions)
            .filter(hasInputType)
            .map(([qkey, q]) => [qkey, q, resolveInputComponent(q.inputType)?.inputSchema] as [string, typeof q, InputComponentMetadata<any>])
            .filter(hasFieldMetadata)
            .map(([qkey, q, metadata]) => {
                const type = "type" in metadata.field ? metadata.field.type : metadata.field.typeProvider(q);
                return ({
                    name: q.logicalName!,
                    label: q.schemaName!,
                    valueEditorType: type,
                    ...(isSelectField(metadata, type) ? { values: metadata.field.listValuesProvider(q) } : {})
                    // label2: `Question ${q.schemaName}`,
                    // tooltip: q.text,
                    // fieldSettings: {
                    //     ... (metadata.field.type === "select" ? { listValues: metadata.field.listValuesProvider(q) } : {})
                    // },
                    // ...metadata.field,
                })
            })

        //  tree: QbUtils.checkTree(QbUtils.loadTree(queryValue), initial_config),
        //config: {
        //    ...InitialConfig,
        //    fields: {
        //        questions: {
        //            type: '!struct', // special keyword for complex fields
        //            label: 'Questions',
        //            subfields: Object.fromEntries(Object.entries(questions)
        //                .filter(hasInputType)
        //                .map(([qkey, q]) => [qkey, q, resolveInputComponent(q.inputType)?.quickform] as [string, typeof q, InputComponentMetadata<any>])
        //                .filter(hasFieldMetadata)
        //                .map(([qkey, q, metadata]) => [qkey, {
        //                    label: q.schemaName,
        //                    label2: `Question ${q.schemaName}`,
        //                    tooltip: q.text,
        //                    fieldSettings: {
        //                        ... (metadata.field.type === "select" ? { listValues: metadata.field.listValuesProvider(q) } : {})
        //                    },
        //                    ...metadata.field,
        //                } as FieldOrGroup])),
        //        },
        //    }

        //} as Config

    }));


    const setOpen = (open: boolean) => setState(old => { old.isOpen = open; return { ...old }; });
    console.log("VisibilityQueryField", [isOpen, value, query, fields]);
    return (<>
        <ErrorBoundary resetRule={() => setState(old => { old.query = { combinator: 'and', rules: [] }; return { ...old } })}>
            <Dialog open={isOpen} onOpenChange={(event, data) => setOpen(data.open)}>

                <DialogSurface className={styles.dialog}>
                    <DialogBody>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogContent>
                            <QueryBuilderFluentFix>
                                <QueryBuilder
                                   // addRuleToNewGroups
                                    listsAsArrays
                                    parseNumbers
                                    showNotToggle
                                    validator={defaultValidator}
                                    operators={[...defaultOperators, { name: "is-visible", value: "is-visible", label: "is visible", arity: "unary" }]}
                                    controlClassnames={{ queryBuilder: 'queryBuilder-branches' }}
                                    fields={fields}
                                    query={query}
                                    onQueryChange={(q) => {
                                        setState(old => { old.query = q; old.value = formatQuery(q, { format: 'cel', parseNumbers: true }); return { ...old }; });
                                        //const json = formatQuery(q, { format: 'json', parseNumbers: true });

                                        //updateQuickFormPayload((old) => {
                                        //    old.questions[activeQuestion!].visible = {
                                        //        engine: "react-querybuilder",
                                        //        rule: JSON.parse(json)
                                        //    };

                                        //    return { ...old };
                                        //});
                                    }
                                    } />

                            </QueryBuilderFluentFix>

                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary" onClick={() => { setOpen(false); } }>Discard</Button>
                            </DialogTrigger>
                            <Button appearance="primary" onClick={() => {

                                const json = formatQuery(query, { format: 'json', parseNumbers: true });

                                updateQuickFormPayload((old) => {
                                    old.questions[activeQuestion!].visible = {
                                        engine: "react-querybuilder",
                                        rule: JSON.parse(json)
                                    };

                                    return { ...old };
                                });
                                setOpen(false);
                            }}>Update</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
            <Field label="Visibility">
                <Input readOnly value={value} contentAfter={<Button onClick={() => setOpen(true)} size="small" appearance="transparent" icon={<EditRegular />}></Button>}></Input>
            </Field>
        </ErrorBoundary>
    </>
    )
}
