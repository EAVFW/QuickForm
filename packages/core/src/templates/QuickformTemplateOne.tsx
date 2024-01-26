import classNames from "classnames";
import { FormContent, Heading, Paragraph } from "../components";
import { NavigationButton } from "../components/navigation-button/NavigationButton";
import { ToggleOverviewButton } from "../components/toggle-overview-button/ToggleOverviewButton";


export const QuickFormTemplateOne: React.FC = () => {
    return (
        <>
            {/* Placeholder for header / title  */}
            <section className={classNames("form-header")}>
                <Heading style={{ fontSize: '1.5rem', marginLeft: '25px' }}>Form </Heading>
                <Paragraph style={{ fontSize: '1rem', color: "#DDCBA5", marginTop: '0px', marginLeft: '20px' }}> 123456789-example-id</Paragraph>
            </section>

            {/* The main content - Question/InputType is displayed here*/}
            <section className={classNames("form-content")}>
                <FormContent />
            </section>

            {/* Placeholder for action-buttons in the footer area of the form */}
            <section className={classNames("form-footer")}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignContent: 'space-between', marginRight: '10px', marginBottom: '10px' }}>
                    <NavigationButton style={{ marginRight: '10px' }} />
                    <ToggleOverviewButton />
                </div>
            </section>
        </>
    )
}