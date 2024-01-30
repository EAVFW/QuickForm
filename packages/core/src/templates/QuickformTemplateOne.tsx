import { FormContent, Heading, Paragraph } from "../components";
import { NavigationButton } from "../components/navigation-button/NavigationButton";


export const QuickFormTemplateOne: React.FC = () => {
    return (
        <div style={containerStyle}>
            {/* Placeholder for header / title  */}
            <section style={formHeading}>
                <Heading style={{ fontSize: '36px', fontWeight: '700', margin: '5px' }}>Beregn prisen for gulvslibning </Heading>
                <Paragraph style={{ fontSize: '36px', margin: '5px' }}> Få prisen med det samme</Paragraph>
            </section>

            {/* The main content - Question/InputType is displayed here*/}
            <section style={formContent}>
                <FormContent />
            </section>

            {/* Placeholder for action-buttons in the footer area of the form */}
            <section style={formFooter}>
                <NavigationButton style={{  marginRight: '10px', marginBottom: '10px' }} />
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

