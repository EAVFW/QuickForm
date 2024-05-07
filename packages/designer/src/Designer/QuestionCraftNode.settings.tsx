import { useEditor, useNode } from "@craftjs/core";
import { useQuickFormDefinition } from "../Contexts/QuickFormDefContext";
import { Dropdown, Field, Option, OptionGroup } from "@fluentui/react-components";
import { useMemo } from "react";


function findQuestionRefs(object:any) : string[] {

    if (Array.isArray(object)) {
        const childs = object.map(child => findQuestionRefs(child)).flat();

        return childs;
    }

    if (typeof object === "object" && object !== null) {

        if ("type" in object && object["type"] === "question") {
            return [object["ref"]];
        }

        const childs = Object.values(object).map(child => findQuestionRefs(child)).flat();

        return childs;
    }

    return [];

}

export const QuestionCraftNodeSettings = () => {
    const { quickformpayload: { questions, layout } } = useQuickFormDefinition();
  
    const { setProp, questionid, actions: { } } = useNode(x => ({ questionid: x.data.props.questionid }));
    const { actions: { selectNode } } = useEditor();

    const selected = useMemo(() => findQuestionRefs(layout), [layout]);
   
    const unused = useMemo(() => Object.entries(questions).filter(([key, question]) => selected.indexOf(question.logicalName ?? key) === -1), []);
    const used = useMemo(() => Object.entries(questions).filter(([key, question]) => selected.indexOf(question.logicalName ?? key) !== -1), []);

    console.log("QuickForm Question used", [selected, unused, used]);
    return (
        <Field label="Question">
            <Dropdown selectedOptions={questionid ? [questionid] : []} value={questions[questionid]?.text} onOptionSelect={(e, d) => {
                setProp((p) => p.questionid = d.optionValue);
                selectNode();
            }}>
                {unused.length > 0 && <OptionGroup label="Unused">
                    {unused.map(([key, question]) => <Option key={key} text={question.text} value={key}>{question.text}</Option>)}
                </OptionGroup>
                }
                {used.length > 0 && <OptionGroup label="Used">
                    {used.map(([key, question]) => <Option key={key} disabled={selected.indexOf(question.logicalName ?? key) !== -1} text={question.text} value={key}>{question.text}</Option>)}
                </OptionGroup>
                }
               
            </Dropdown>
        </Field>
    )

}