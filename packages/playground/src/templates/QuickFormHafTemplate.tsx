import { QuickForm } from "../../../core/src/components"
import { NavigationButton } from "../../../core/src/components/navigation-button/NavigationButton";
import { HafOverview } from "../components/haf-overview/HafOverview";


export const QuickFormHafTemplate: React.FC = () => {
    return (
        <div style={containerStyle}>
            <section style={formContent}>
                <HafOverview />
                <QuickForm />
            </section>
            <section style={formFooter}>
                <NavigationButton style={{ display: 'flex', justifyContent: 'end', marginRight: '10px', marginBottom: '10px' }} />
            </section>
        </div>
    )
}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 0px 5px 1px',
}

const formContent = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    minWidth: '500px',
    minHeight: '500px',
};

const formFooter: React.CSSProperties = {
    width: '100%',
};

