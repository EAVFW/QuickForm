import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";

export const QuickFormSourceView = () => {
    try {
        const { quickformpayload: updateQuickFormPayload } = useQuickFormDefinition();
        const [editorValue, setEditorValue] = useState<string | undefined>(JSON.stringify(updateQuickFormPayload, null, 4));

        const onChangeEditorValue = (value?: string) => {
            setEditorValue(value);
        }

        return (
            <div style={{ height: "80vh", width: "100%" }}>
                {editorValue &&
                    <Editor
                    defaultLanguage='json'
                    defaultValue={editorValue}
                    onChange={onChangeEditorValue!}
                    options={{
                    }}
                    onMount={async (editor) => {
                        setTimeout(() => editor?.getAction('editor.action.formatDocument')?.run(), 100);
                    }}
                    theme="vs-dark"
                />
                }
            </div>
        );
    } finally {
        console.groupEnd();
    }
};
export default QuickFormSourceView;
