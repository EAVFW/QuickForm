import React from 'react';
import { QuickFormDefinition } from '../../core/src/model';
import testdata from "./data/allInputControlsTest.json";
import { QuickFormProvider } from '../../core/src/state';
import { NavigationButton, QuickForm } from '../../core/src/components';
import "./components/buttons-input/ButtonsInput";
import "./components/checkbox-input/CheckboxInput";
import "./components/radio-input/RadioInput";
import "./components/slider-input/SliderInput";

export const App = () => {
    return (
        <div style={containerStyling}>
            <QuickFormProvider
                definition={testdata as QuickFormDefinition}
                payload={{}}
                asContainer={true}
            >
                <QuickForm />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <NavigationButton />
                </div>
            </QuickFormProvider>
        </div>
    );
};

const containerStyling: React.CSSProperties = {
    width: '100%',
    minHeight: '1200px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}