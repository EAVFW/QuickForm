import React from 'react';
import { useState } from 'react';
import { QuickFormDefinition } from '../../core/src/model';
import carpenterTestData from "./data/carpenterTestData.json";
import { QuickFormProvider } from '../../core/src/state';
import { Editor } from '@monaco-editor/react';
import { Button, QuickForm } from '../../core/src/components';
import "./components/slider/Slider";

export const App = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<QuickFormDefinition>(carpenterTestData as QuickFormDefinition);
    const [hackToChangeQuickForm, setHackToChangeQuickForm] = useState(0);
    const [editorValue, setEditorValue] = useState<string>(JSON.stringify(carpenterTestData));

    const onChangeEditorValue = (value: string) => {
        console.log("Editor input changed");
        setEditorValue(value);
    }

    const updateQuickForm = () => {
        console.log("QuickForm updated.");
        setSelectedTemplate(() => JSON.parse(editorValue));
        setHackToChangeQuickForm(() => hackToChangeQuickForm + 1);
    }



    return (
        <div id="Container" style={containerStyling}>

            <div id="Editor" style={editorStyling}>
                <Editor
                    defaultLanguage='json'
                    defaultValue={JSON.stringify(selectedTemplate)}
                    onChange={onChangeEditorValue}
                    options={{
                    }}
                    onMount={async (editor) => {
                        setTimeout(() => editor.getAction('editor.action.formatDocument').run(), 100);
                    }}
                    theme="vs-dark"
                />
                <Button onClick={updateQuickForm} style={{ margin: 'auto' }} > Opdater QuickForm </Button>
            </div>

            <div id="QuickForm" style={quickformStyling}>
                <QuickFormProvider key={hackToChangeQuickForm} definition={selectedTemplate} payload={{}} >
                    <QuickForm />
                </QuickFormProvider>
            </div>

        </div>
    );
};

const containerStyling: React.CSSProperties = {
    width: '100%',
    minHeight: '1200px',
    padding: '10px',
    display: 'flex',
}

const editorStyling: React.CSSProperties = {
    margin: 'auto',
    width: '50%',
    height: '80vh'
}

const quickformStyling: React.CSSProperties = {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
}
