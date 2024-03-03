import { PropsWithChildren, createContext, useContext } from "react";
import { useDocument } from "../Hooks/useDocument";

export const QuickFormDefContext = createContext<ReturnType<typeof useDocument> | undefined>(undefined);
export const useQuickFormDefinition = () => useContext(QuickFormDefContext)!;

export const QuickFormDesignerProvider: React.FC<PropsWithChildren<{ entityName: string, attributeName: string }>> = ({ entityName, attributeName,children }) => {

    const quickform = useDocument(entityName, attributeName);
      
    return (
        <QuickFormDefContext.Provider value={quickform}>
            {children }
        </QuickFormDefContext.Provider>
    )
}