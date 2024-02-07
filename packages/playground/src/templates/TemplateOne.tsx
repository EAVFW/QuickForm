import { QuickForm, Heading, Paragraph } from "../../../core/src/components"

export const TemplateOne: React.FC = () => {
    return (
        <div style={containerStyle}>
            <section style={formHeading}>
                <Heading style={{ fontSize: '36px', fontWeight: '700', margin: '2px' }}>Beregn prisen for gulvslibning </Heading>
                <Paragraph style={{ fontSize: '36px', fontWeight: '400', color: '#333', margin: '2px' }}> Få prisen med det samme</Paragraph>
            </section>

            <section style={formContent}>
                <QuickForm />
            </section>

        </div>
    )
}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: '800px',
    height: '600px',
    borderRadius: '10px',
    boxShadow: '0px 0px 3px 1px',
}

const formHeading: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10px'
};

const formContent = {
    height: '100%',
    width: '100%',
};