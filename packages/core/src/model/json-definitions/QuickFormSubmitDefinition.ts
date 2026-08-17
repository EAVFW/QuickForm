
export type QuickFormSubmitDefinition = {
    text: string;
    paragraph: string;
    // paragraphs: string[];
    buttonText: string;
    submitFields: {
        schema: any, uiSchema: any
    };
    submitUrl: string;
    submitMethod: string;
};