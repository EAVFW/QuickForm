import React from 'react';
import { QuickFormDefinition } from '../../core/src/model';
import testdata from "./data/allInputControlsMultipleSlidesTest2.json";
import { QuickFormProvider } from '../../core/src/state';
import { QuickForm } from '../../core/src/components';
import "./components/buttons-input/ButtonsInput";
import "./components/checkbox-input/CheckboxInput";
import "./components/radio-input/RadioInput";
import "./components/slider-input/SliderInput";

export const App = () => {
    return (
        <div style={containerStyling}>
            <QuickFormProvider definition={testdata as QuickFormDefinition} payload={{}} >
                <QuickForm />
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

const quickformStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    marginTop: '20px',

}