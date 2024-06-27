import { useQuickFormDefinition } from "../../Contexts/QuickFormDefContext";

export const QuickFormSourceView = () => {

    const { quickformpayload: updateQuickFormPayload } = useQuickFormDefinition();
    return (
        <div style={{ margin: "15px", backgroundColor: "white", padding: "15px", borderRadius: "5px" }}>
                <pre>
                    {JSON.stringify(updateQuickFormPayload, null, 4)}
                </pre>
        </div>
    )

}