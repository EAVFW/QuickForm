"use client"
import classNames from "classnames";
import "./QuickForm.css";

import { QuickFormProps } from "./QuickFormProps";
import { QuickFormProvider } from "./state/QuickFormContext";
import React from "react";
import { FormContent, Heading, Paragraph } from "./components";
import { NavigationButton } from "./components/navigation-button/NavigationButton";
import { ToggleOverviewButton } from "./components/toggle-overview-button/ToggleOverviewButton";

export const QuickFormFull: React.FC<QuickFormProps> = (props) => {

    return <QuickFormProvider id={""} quickform={props}><QuickFormTemplate /></QuickFormProvider>
}
export const QuickFormTemplate: React.FC = () => {

    const sandColor = "#DDCBA5";


    return (
        <>
            {/* Placeholder for header / title  */}
            <section className={classNames("form-header")}>
                <Heading style={{ fontSize: '1.5rem', marginLeft: '25px' }}>Form </Heading>
                <Paragraph style={{ fontSize: '1rem', color: sandColor, marginTop: '0px', marginLeft: '20px' }}> 123456789-example-id</Paragraph>
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
