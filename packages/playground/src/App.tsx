import { useState } from 'react';
import { QuickFormProvider } from "../../core/src/state/QuickformProvider";
import testDataWithColumnsAndRows from "./data/testDataWithColumnsAndrows.json";
import dummydata from "./data/dummydata.json"
import { TemplateOne } from "./templates/TemplateOne";
import { TemplateTwo, testData } from "./templates/TemplateTwo";

export const App = () => {
    const [selectedTemplate, setSelectedTemplate] = useState('templateOne');

    const temp2 = <QuickFormProvider key="templateOne" json={testDataWithColumnsAndRows}>
        <TemplateOne />
    </QuickFormProvider>

    const temp1 = <QuickFormProvider key="templateTwo" json={testData}>
        <TemplateTwo />
    </QuickFormProvider>

    const renderTemplate = () => {
        switch (selectedTemplate) {
            case 'templateOne':
                return temp1;
            case 'templateTwo':
                return temp2;
            default:
                return temp1;
        }
    };

    return (
        <div style={containerStyling}>
            <div style={selectSwitchStyling}>
                <select
                    style={{ width: '200px', height: '50px' }}
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                >
                    <option value="templateOne">Template One</option>
                    <option value="templateTwo">Template Two</option>
                </select>
            </div>
            <div style={quickformStyling}>
                {renderTemplate()}
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
