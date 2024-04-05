import React from 'react';
import { QuickFormDefinition } from '../../core/src/model';
import testdata from "./data/allInputControlsTest.json";
import { QuickFormProvider } from '../../core/src/state';
import { QuickForm } from '../../core/src/components';
import "./components/buttons-input/ButtonsInput";
import "./components/checkbox-input/CheckboxInput";
import "./components/radio-input/RadioInput";
import "./components/slider-input/SliderInput";

export const App = () => {
    return (
        <div id="Container" style={containerStyling}>

            <div id="QuickForm" style={quickformStyling}>
                {/* <h1 style={{ fontWeight: '800', whiteSpace: 'nowrap' }}>
                    BEREGN PRISEN FOR RENSNING AF FLISER
                </h1>
                <h2>
                    Få prisen med det samme

                </h2> */}
                <QuickFormProvider definition={testdata as QuickFormDefinition} payload={{}} >
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
    justifyContent: 'center',
    alignItems: 'center',
}

const quickformStyling: React.CSSProperties = {
    display: 'flex',
    flexDirection: "column",
    marginTop: '20px',

}