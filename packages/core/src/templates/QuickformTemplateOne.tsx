import { FormContent, Heading, Paragraph } from "../components";
import { NavigationButton } from "../components/navigation-button/NavigationButton";


export const QuickFormTemplateOne: React.FC = () => {
    return (
        <>
            {/* Placeholder for header / title  */}
            <section style={formHeading}>
                <Heading style={{ fontSize: '1.5rem', marginLeft: '25px' }}>Quickform Template </Heading>
                <Paragraph style={{ fontSize: '1rem', justifyContent: 'center', color: 'var(--primary)', marginLeft: '20px', alignSelf: 'center' }}> 123456789-example-id</Paragraph>
            </section>

            {/* The main content - Question/InputType is displayed here*/}
            <section style={formContent}>
                <FormContent />
            </section>

            {/* Placeholder for action-buttons in the footer area of the form */}
            <section style={formFooter}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'space-between', marginRight: '10px', marginBottom: '10px' }}>
                    <NavigationButton style={{ marginRight: '10px' }} />
                </div>
            </section>
        </>
    )
}

const formHeading = {
    display: 'flex',
    alignItems: 'center',
    height: '10%',
    minHeight: '10%',
    width: '100%',
    WebkitFontSmoothing: 'antialiased',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    background: 'var(--surface)'
};

const formContent = {
    height: '100%',
    width: '100%',
    WebkitFontSmoothing: 'antialiased',
    backgroundColor: 'var(--background)'
};

const formFooter = {
    alignItems: 'end',
    height: '10%',
    minHeight: '10%',
    width: '100%',
    margin: 'auto',
    WebkitFontSmoothing: 'antialiased',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    backgroundColor: 'var(--surface)'
};

