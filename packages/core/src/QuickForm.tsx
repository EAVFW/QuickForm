import "./style/QuickForm.css";
import React from "react";
import { QuickFormProvider } from "./state/QuickformProvider";
import { QuickFormTemplateOne } from "./templates/QuickformTemplateOne";
import { Ending, Intro, Question, Submit } from "./model/new";

export type QuickFormProps = {
    intro: Intro,
    questions: { [key: string]: Question; },
    submit: Submit,
    ending: Ending,
}

export const QuickForm: React.FC<QuickFormProps> = (props: QuickFormProps) => {
    return (
        <QuickFormProvider id={""} quickform={props}>
            <QuickFormTemplateOne />
        </QuickFormProvider>
    );
}