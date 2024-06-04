import React from 'react';
import { QuickFormDefinition } from '../../core/src/model';
import testdata from "./data/allInputControlsTest.json";
import { QuickFormProvider } from '../../core/src/state';
import { NavigationButton, QuickForm } from '../../core/src/components';
import { QuickFormContainer } from './components';
import "./components/index";
import { modernQuickFormTokens } from '@eavfw/quickform-core';

export const App = () => {
    return (
        <div>
            <QuickFormProvider
                definition={testdata as QuickFormDefinition}
                payload={{}}
                asContainer={false}
                tokens={modernQuickFormTokens}
            >
                <QuickFormContainer
                    title="Test title"
                    subtitle='Test subtitle'
                >
                    <QuickForm />
                    <div
                        style={
                            {
                                display: 'flex',
                                justifyContent: 'flex-end'
                            }
                        }
                    >
                        <NavigationButton />
                    </div>
                </QuickFormContainer>
            </QuickFormProvider>
        </div>
    );
};