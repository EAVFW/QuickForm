import { QuickForm, Heading, Paragraph } from "../../../core/src/components"
import { NavigationButton } from "../../../core/src/components/navigation-button/NavigationButton";


export const QuickFormTemplateOne: React.FC = () => {
    return (
        <div style={containerStyle}>
            {/* Placeholder for header / title  */}
            <section style={formHeading}>
                <Heading style={{ fontSize: '36px', fontWeight: '700', margin: '2px' }}>Beregn prisen for gulvslibning </Heading>
                <Paragraph style={{ fontSize: '36px', fontWeight: '400', color: '#333', margin: '2px' }}> Få prisen med det samme</Paragraph>
            </section>

            {/* The main content - Question/InputType is displayed here*/}
            <section style={formContent}>
                <QuickForm />
            </section>

            {/* Placeholder for action-buttons in the footer area of the form */}
            <section style={formFooter}>
                <NavigationButton style={{ marginRight: '10px', marginBottom: '10px' }} />
            </section>
        </div>
    )
}

const containerStyle: React.CSSProperties = {
    borderRadius: '10px',
    boxShadow: '0px 0px 5px 1px',
}

const formHeading: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
};

const formContent = {
    height: '100%',
    width: '100%',
};

const formFooter: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
};

