import { useCallback, useEffect, useRef, useState } from "react";
import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";
import Editor, { OnMount, useMonaco, } from "@monaco-editor/react";
import type { editor } from 'monaco-editor';
import { sourceViewSchema } from "../../Utils/SourceViewSchema";

export const QuickFormSourceView = () => {
    try {
        const { quickformpayload, updateQuickFormPayload } = useQuickFormDefinition();
        const [height, setHeight] = useState<number>(0);

        const data = JSON.stringify(quickformpayload, null, 4);
        const editorRef = useRef<editor.IStandaloneCodeEditor>();
        const div = useCallback((node: HTMLDivElement) => { }, []);
        const handleEditorDidMount: OnMount = (editor, monaco) => {
            editorRef.current = editor;
            editor.onDidContentSizeChange(() => {
                setHeight(Math.max(100, editor.getContentHeight()));
                editor.layout();
            });
        };
        const monaco = useMonaco();
        useEffect(() => {
            if (monaco) {
                monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                    validate: true, allowComments: true,
                    //schemas: sourceViewSchema,
                    schemaValidation: "error",
                });
            }
        }, [monaco]);

        return (
            <div style={{ height: "100%", width: "100%" }} ref={div}>
                {data &&
                    <Editor
                        options={{
                            automaticLayout: true,
                            scrollBeyondLastLine: false
                    }}
                    onChange={(value) => { updateQuickFormPayload(old => { try { if (!value) return;  return JSON.parse(value); } catch (error) {  } return old }); }}
                        onMount={handleEditorDidMount}
                        defaultLanguage="json"
                        value={data}
                    />
                }
            </div>
        );
    } finally {
        console.groupEnd();
    }
};
export default QuickFormSourceView;
