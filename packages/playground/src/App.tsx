import React from 'react';
import { useState } from 'react';
import { QuickFormDefinition } from '../../core/src/model';
import { newDummyForm } from "./data/dummydata";
import { QuickFormProvider } from '../../core/src/state';
import { Editor } from '@monaco-editor/react';
import { QuickForm } from '../../core/src/components';

export const App = () => {
    const [selectedTemplate, setSelectedTemplate] = useState<QuickFormDefinition>(newDummyForm);

    return (
        <div style={containerStyling}>
            <div style={selectSwitchStyling}>
                {/* Monaco editor */}
                {/* <Editor /> */}
            </div>
            <div style={quickformStyling}>
                {/* Quickform here */}
                <QuickFormProvider key="templateThree" definition={selectedTemplate} payload={{}} >
                    <QuickForm />
                </QuickFormProvider>;
            </div>
        </div>
    );
};

const containerStyling: React.CSSProperties = {
    width: '100%',
    height: '800px',
    padding: '10px'
}

const selectSwitchStyling: React.CSSProperties = {
    margin: 'auto',
    width: '100%'
}

const quickformStyling: React.CSSProperties = {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'center',
    width: '100%'
}
