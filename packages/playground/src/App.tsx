import React from 'react';
import { useState } from 'react';
import { QuickFormDefinition } from '../../core/src/model';
import { newDummyForm } from "./data/dummydata";
import { QuickFormProvider } from '../../core/src/state';
import { Editor } from '@monaco-editor/react';
import { Button, QuickForm } from '../../core/src/components';

export const App = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<QuickFormDefinition>(newDummyForm);
    const [hackToChangeQuickForm, setHackToChangeQuickForm] = useState(0);
    const [editorValue, setEditorValue] = useState<string>("");

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
                {/* Monaco editor */}
                <Editor
                    defaultLanguage='json'
                    defaultValue={JSON.stringify(selectedTemplate)}
                    onChange={onChangeEditorValue}
                    // value={JSON.stringify(selectedTemplate)}
                    theme="vs-dark"
                />
                <Button onClick={updateQuickForm} style={{ margin: 'auto' }} > Opdater QuickForm </Button>
            </div>

            <div id="QuickForm" style={quickformStyling}>
                {/* Quickform here */}
                <QuickFormProvider key={hackToChangeQuickForm} definition={selectedTemplate} payload={{}} >
                    <QuickForm />
                </QuickFormProvider>
            </div>

        </div>
    );
};

const containerStyling: React.CSSProperties = {
    width: '100%',
    height: '800px',
    padding: '10px',
    display: 'flex',
}

const editorStyling: React.CSSProperties = {
    margin: 'auto',
    width: '50%',
    height: '100%'
}

const quickformStyling: React.CSSProperties = {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%'
}
