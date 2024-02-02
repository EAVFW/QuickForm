import { QuickFormTemplateOne } from "./templates/QuickformTemplateOne";
import { QuickFormProvider } from "../../core/src/state/QuickformProvider";
import testDataWithColumnsAndRows from "./data/testDataWithColumnsAndrows.json";
import { QuickFormHafTemplate } from "./templates/QuickFormHafTemplate";

export const App = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <QuickFormProvider json={testDataWithColumnsAndRows} >
                <QuickFormHafTemplate />
            </QuickFormProvider>
        </div>
    )
};