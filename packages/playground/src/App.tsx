import { QuickFormProvider } from "../../core/src/state/QuickformProvider";
import testDataWithColumnsAndRows from "./data/testDataWithColumnsAndrows.json";
import { QuickFormHafTemplate } from "./templates/QuickFormHafTemplate";

export const App = () => {
    return (
        <div>
            <QuickFormProvider json={testDataWithColumnsAndRows} >
                <QuickFormHafTemplate />
            </QuickFormProvider>
        </div>
    )
};