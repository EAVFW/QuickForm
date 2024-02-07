import { useEditor, useNode } from "@craftjs/core";
import { useQuickFormDefinition } from "../Contexts/QuickFormDefContext";
import { Dropdown, Field, Option } from "@fluentui/react-components";


export const QuestionCraftNodeSettings = () => {
    const { quickformpayload: { questions } } = useQuickFormDefinition();
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