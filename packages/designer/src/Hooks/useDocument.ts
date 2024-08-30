import { useEAVForm } from "@eavfw/forms";
import { AttributeDefinition, isLookup, queryEntitySWR, getRecordSWR } from "@eavfw/manifest";
import { gzip, ungzip } from "pako";
import { useMemo, useEffect, useState } from "react";
import { QuickFormDesignerDefinition } from "../Types/QuickFormDefinition";
import { useModelDrivenApp } from "@eavfw/apps";
import { ViewNames } from "../Types/ViewNames";
import { Locale } from "../Types/Locale";

export const useDocument = (entityName: string, attributeName: string, designerLocale?: Locale) => {

    const app = useModelDrivenApp();
    const entity = app.getEntity(entityName);
    const column = entity.attributes[attributeName];

    const [formData, { onChange: onFormDataChange }] = useEAVForm((state) => state.formValues);


    const serverside = getRecordSWR(entity.collectionSchemaName, formData?.id, "?$select=rowversion", formData?.id, undefined, 30);
    const isChanged = serverside?.record?.rowversion && formData.rowversion !== serverside?.record?.rowversion;
    const { record, mutate } = getRecordSWR(app.getEntityFromKey("Document").collectionSchemaName, formData[column.logicalName], undefined, isChanged);
    console.log("useDocument", [entityName, attributeName, column, formData, record, formData.rowversion, serverside?.record?.rowversion]);
    useEffect(() => {
        console.log("useDocument Refresh", record);
    }, [record]);
    useEffect(() => {
        console.log("useDocument mutate", [formData.rowversion, serverside?.record?.rowversion]);
        if (isChanged) {
            window.location.reload();
            //mutate();
        }
    }, [formData.rowversion,serverside?.record?.rowversion])

    const quickformLocale = designerLocale ?? {
        Title: "QuickForm",
    };
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
    }, [formData[column.logicalName]])


    const [quickformpayload, updateQuickFormPayload] = useState<QuickFormDesignerDefinition>(JSON.parse(old ?? JSON.stringify({
        intro: {
        },
        submit: {
        },
        ending: {
        },
        layout: {
            slides: {
            }
        },
        questions: {
        }
    })));

    console.log("quickformpayload", [quickformpayload]);
    useEffect(() => {
        const json = JSON.stringify(quickformpayload);
        if (old !== json) {
            console.log("Changing PageDesignEditor Content", [formData, JSON.parse(old ?? "{}"), JSON.parse(json)]);
            // console.log([JSON.parse(old ?? "{}"), JSON.parse(json)]);
            const content = { ... (formData[column.logicalName.slice(0, -2)] ?? { path: "page.json", container: "pages", contenttype: "application/json" }) };

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

    const view = quickformpayload.__designer?.activeView ?? "intro";
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

    return useMemo(() => (
        {
            quickformpayload,
            updateQuickFormPayload,
            view,
            setView,
            activeQuestion,
            setActiveQuestion,
            activeSlide,
            setActiveSlide,
            designerLocale: quickformLocale
        }
    ),
        [quickformpayload, updateQuickFormPayload]
    );
};