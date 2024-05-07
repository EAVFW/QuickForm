import { PropsWithChildren, createContext, useContext } from "react";
import { useDocument } from "../Hooks/useDocument";
import { Locale } from "../Types/Locale";

export const QuickFormDefContext = createContext<ReturnType<typeof useDocument> | undefined>(undefined);
export const useQuickFormDefinition = () => useContext(QuickFormDefContext)!;

type QuickFormDesignerProviderProps = {
    entityName: string;
    attributeName: string;
    designerLocale?: Locale;
}

export const QuickFormDesignerProvider: React.FC<PropsWithChildren<QuickFormDesignerProviderProps>> = ({ entityName, attributeName, children, designerLocale }) => {

    const quickform = useDocument(entityName, attributeName, designerLocale);

    return (
        <QuickFormDefContext.Provider value={quickform}>
            {children}
        </QuickFormDefContext.Provider>
    )
}