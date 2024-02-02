import "./style/QuickForm.css";
import React from "react";
import { QuickFormProvider } from "./state/QuickformProvider";
import { QuickFormTemplateOne } from "./templates/QuickformTemplateOne";
import { Form } from "./model";

export const QuickForm: React.FC<Form> = (json: Form) => {
    return (
        <>
            <head>
                <link href="https://fonts.googleapis.com/css?family=Nunito:300,400,600,700&amp;display=swap" rel="stylesheet" />
            </head>
            <QuickFormProvider id={""} data={json}>
                <QuickFormTemplateOne />
            </QuickFormProvider>
        </>
    );
}