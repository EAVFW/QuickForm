import { mergeClasses } from "@fluentui/react-components";
import { useViewStyles } from "../Styles/useViewStyles.styles"
import { PageDesignEditor, CraftEditor, CraftViewPort, useEditorChanges } from "@eavfw/designer";
 
import { useEffect, useMemo } from "react";
import { removeNonAlphanumeric } from "@eavfw/utils";
import { SerializedNodes } from "@craftjs/core"
import { QuickFormDesignerDefinition } from "../../Types/QuickFormDefinition";
import { RowColumnsLayout } from "@eavfw/quickform-core/src/model/json-definitions/Layout";



const initial = JSON.stringify(
    {
        "ROOT": {
            "type": { "resolvedName": "Container" },
            "isCanvas": true,
            "props": {
                "flexDirection": "column",
                "alignItems": "flex-start",
                "justifyContent": "flex-start",
                "fillSpace": "no",
                "padding": ["40", "40", "40", "40"],
                "margin": ["0", "0", "0", "0"],
                "background": { "r": 255, "g": 255, "b": 255, "a": 1 },
                "color": { "r": 0, "g": 0, "b": 0, "a": 1 },
                "shadow": 0,
                "radius": 0,
                "width": "800px",
                "height": "auto"
            }, "displayName": "Container", "custom": {
                renderNode: {
                    canAddLeft: false,
                    canAddRight: false,
                    canAddTop: true,
                    canAddBottom: true
                },
                "displayName": "Quotation"
            }, "hidden": false, "nodes": ["GBCxB0dj1x"], "linkedNodes": {}
        },
        "GBCxB0dj1x": {
            "type": { "resolvedName": "GridNode" },
            "isCanvas": true, "props": {},
            "displayName": "Grid",
            "custom": { "displayName": "Content" },
            "parent": "ROOT",
            "hidden": false,
            "nodes": [],
            "linkedNodes": {}
        }
    }
);


export const QuickFormLayoutView = ({ dispatch, slideId, layout }: {
    dispatch: React.Dispatch<React.SetStateAction<QuickFormDesignerDefinition>>,
    slideId?: string,
    layout: QuickFormDesignerDefinition["layout"]
}) => {
    const styles = useViewStyles();

    const { nodes, store, query, actions: { deserialize,history } } = useEditorChanges();


    useEffect(() => {
         
        

        //console.log("CraftEditor11", [slideId, layout, JSON.parse(JSON.stringify(store.history.timeline))]);
        //let last = store.history.timeline[store.history.timeline.length - 1];
        //let lastPatch = last && last.patches[last.patches.length - 1];
        //if (lastPatch && lastPatch.op === "replace" && lastPatch.path[lastPatch.path.length - 1] === "displayName") {
        //    return;
        //}


         {
            const rownodes = slideId && layout?.slides?.[slideId]?.rows ?
                Object.fromEntries(
                    Object.entries(
                        layout.slides[slideId]?.rows ?? {
                        }).sort(([a, aa], [b, bb]) => (aa.order??-1) - (bb.order??-1)).map(([rowid, row]) => {

                            if (row.type !== "row")
                                throw new Error("Only Row is supported currently");

                            const columns = Object.keys(row.columns);

                            if (columns.length !== 1)
                                throw new Error("Only one column rows is supported currently");

                            const column = row?.columns?.[Object.keys(row.columns)[0]];

                            if (column.type !== "question")
                                throw new Error("Only one column rows with a question is supported currently");

                            return [rowid, {
                                "type": { "resolvedName": "Question" },
                                "isCanvas": true, "props": { questionid: column.ref },
                                "displayName": "Question",
                                "custom": { "displayName": "Question" },
                                "parent": "ROOT",
                                "hidden": false,
                                "nodes": [],
                                "linkedNodes": {}
                            }];

                        })) : {
                    "GBCxB0dj1x": {
                        "type": { "resolvedName": "GridNode" },
                        "isCanvas": true, "props": {},
                        "displayName": "Grid",
                        "custom": { "displayName": "Content" },
                        "parent": "ROOT",
                        "hidden": false,
                        "nodes": [],
                        "linkedNodes": {}
                    }
                };

            const data = JSON.stringify({
                "ROOT": {
                    "type": { "resolvedName": "Container" },
                    "isCanvas": true,
                    "props": {
                        "flexDirection": "column",
                        "alignItems": "flex-start",
                        "justifyContent": "flex-start",
                        "fillSpace": "no",
                        "padding": ["40", "40", "40", "40"],
                        "margin": ["0", "0", "0", "0"],
                        "background": { "r": 255, "g": 255, "b": 255, "a": 1 },
                        "color": { "r": 0, "g": 0, "b": 0, "a": 1 },
                        "shadow": 0,
                        "radius": 0,
                        "width": "90%",
                        "height": "auto"
                    },
                    "displayName": "Container",
                    "custom": {
                        renderNode: {
                            canAddLeft: false,
                            canAddRight: false,
                            canAddTop: true,
                            canAddBottom: true
                        },
                        slideId: slideId,
                        "displayName": slideId && layout?.slides && slideId in layout?.slides ? layout?.slides[slideId].title : 'New Slide *'
                    },
                    "hidden": false,
                    "nodes": Object.keys(rownodes),
                    "linkedNodes": {}
                },
                ...rownodes
            });
            console.log("CraftEditor10", [slideId, layout, JSON.parse(data)]);

            deserialize(data);
            history.clear();
        };
    }, [slideId]);

    useEffect(() => {
        console.log("CraftEditor6", [slideId, store.history.timeline, nodes, nodes.ROOT?.custom?.displayName, slideId && layout?.slides?.[slideId]?.title]);


        /**
         * 
         * Timeline indicate if its a new document with changes,
         * if not its a new slide and update should be ignored.
         */
        if (nodes?.ROOT && slideId && store.history.timeline.length) {
            const name = nodes.ROOT.custom.displayName;
            const oldName = layout?.slides?.[slideId]?.title;


            if (oldName !== name) {
                dispatch(old => {
                    const oldslideid = old.__designer.activeSlide!;
                    let title = name;
                    let schemaName = removeNonAlphanumeric(title);
                    let logicalName = schemaName.toLowerCase();
                    if (!old.layout) {
                        old.layout = {
                        };
                    }
                    if (!old.layout.slides)
                        old.layout.slides = {};

                    old.layout.slides[oldslideid] = { ...old.layout.slides[oldslideid], title, schemaName, logicalName };
                     
                    if (!old.__designer)
                        old.__designer = {};

                    old.__designer.activeSlide = oldslideid;
                    return { ...old };
                });
            }
        }

        /**
         * populate the layout based on designer state.
         */

        if (nodes?.ROOT && nodes.ROOT.custom.slideId === slideId) {
            dispatch(quickform => {

                if (!quickform.layout)
                    quickform.layout = {};


                if (!quickform.layout.slides)
                    quickform.layout.slides = {};

                let slide = quickform.layout.slides[quickform.__designer.activeSlide!];
                if (!slide)
                    return quickform;

                slide.rows = Object.fromEntries(nodes?.ROOT.nodes.map((rowid) => {

                    let row = nodes[rowid];
                    if (!row.props.questionid)
                        return [];

                    const type = typeof row.type === "string" ? row.type : row.type.resolvedName;
                    if (type !== "Question")
                        return [];



                    return [[rowid, {
                        ...slide.rows?.[rowid] ?? {},
                        type: "row",
                        order: nodes?.ROOT.nodes.indexOf(rowid),
                        columns: { "column1": { type: "question", ref: row.props.questionid } }
                    } as RowColumnsLayout]];

                }).flat());
                

                return { ...quickform };
            });
        }



    }, [nodes, slideId, layout]);

    

    if (slideId) {
        console.log("CraftEditor9", [layout?.slides, slideId]);
        return (
            <div className={mergeClasses(styles.section)}>
                <CraftViewPort 
                    width="90%"
                    height="auto"
                    background={{ r: 255, g: 255, b: 255, a: 1 }}
                    padding={['40', '40', '40', '40']}
                    custom={{ displayName: layout?.slides && slideId in layout.slides ? layout.slides[slideId].title : 'New Slide *' }}
                    defaultValue={initial} />
            </div>)

    }

    return null;
}