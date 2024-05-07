

import { useNode, useEditor } from "@craftjs/core";
import { Placeholder } from "@eavfw/designer-nodes"
import { PropsWithChildren } from "react";
import { useQuickFormDefinition } from "../Contexts/QuickFormDefContext";
import { QuestionCraftNodeSettings } from "./QuestionCraftNode.settings";
import { registerNode } from "@eavfw/designer-core";

export const QuestionCraftNode: React.FC<PropsWithChildren<Partial<{ questionid?: string }>>> & { craft?: any } = ({ questionid }) => {



    const {
        connectors: { connect }
    } = useNode((node) => ({ selected: node.events.selected }));
    const { enabled } = useEditor((state) => ({
        enabled: state.options.enabled,

    }));
    const { quickformpayload: { questions } } = useQuickFormDefinition();


    if (enabled) {
        return <Placeholder ref={connect as any}>Question {questionid ? questions[questionid]?.text : ''}: click to configure</Placeholder>
    }

    return <div></div>
}

QuestionCraftNode.craft = {
    displayName: 'Question',
    props: {

    },
    custom: {
        target: "components",
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