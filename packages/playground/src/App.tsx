import React from 'react';
import { QuickFormDefinition } from '../../core/src/model';
import testdata from "./data/allInputControlsTest.json";
import { QuickFormProvider } from '../../core/src/state';
import { NavigationButton, QuickForm } from '../../core/src/components';
import { QuickFormContainer } from './components';
import "./components/index";

const containerStyling: React.CSSProperties = {
    width: '100%',
    minHeight: '1200px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

export const App = () => {
    return (
        <div style={containerStyling}>
            <QuickFormProvider
                definition={testdata as QuickFormDefinition}
                payload={{}}
                asContainer={true}
            >
                <QuickFormContainer
                    title="Test title"
                    subtitle='Test subtitle'
                >
                    <QuickForm />
                    <div
                        style={
                            { display: 'flex', justifyContent: 'flex-end' }
                        }
                    >
                        <NavigationButton />
                    </div>
                </QuickFormContainer>
            </QuickFormProvider>
        </div>
    );
};