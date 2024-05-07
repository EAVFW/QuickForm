
export type QuickFormSubmitDefinition = {
    text: string;
    // paragraphs: string[];
    buttonText: string;
    submitFields: {
        schema: any, uiSchema: any
    };
    submitUrl: string;
    submitMethod: string;
};