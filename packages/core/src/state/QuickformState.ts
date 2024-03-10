import { SubmitStatus } from "../model/SubmitStatus";
import { SlideModel } from "../model/SlideModel";
import { LayoutDefinition, QuickFormModel } from "../model";

export type QuickformState = {
    autoAdvanceSlides?: boolean;
    currIdx: number;
    currStep: number;
    data: QuickFormModel;
    errorMsg: string;
    hasNextSlide: boolean;
    hasPrevSlide: boolean;
    isEndingSlide: boolean;
    isIntroSlide: boolean;
    isSubmitSlide: boolean;
    progress: number;
    progressText: string;
    slides: SlideModel[];
    submitStatus: SubmitStatus;
    totalSteps: number;
}

export const defaultState = (data: QuickFormModel = defaultData, layout?: LayoutDefinition): QuickformState => {
    const defState = {
        autoAdvanceSlides: layout?.autoAdvanceSlides ?? false,
        currIdx: 0,
        currStep: data.slides.length > 0 ? 1 : 0,
        data: data,
        errorMsg: "",
        hasNextSlide: data.slides.length > 1,
        hasPrevSlide: false,
        isEndingSlide: false,
        isIntroSlide: typeof data.intro !== "undefined",
        isSubmitSlide: false,
        progress: 0,
        progressText: "",
        slides: data.slides,
        submitStatus: { isSubmitting: false, isSubmitError: false, isSubmitSuccess: false },
        totalSteps: data.slides.length,
    };

    return defState;
};


export const defaultData: QuickFormModel = {
    intro: {
        text: "Welcome to Quickform",
        paragraph: "Click the button to get started",
        buttonText: "Start"
    },
    submit: {
        text: "Example Submit Text",
        paragraph: "Example paragraph describing the submit action.",
        submitUrl: "https://www.test.com/payloads",
        submitMethod: "POST",
        buttonText: "Submit",
        submitFields: [
            {
                intermediate: false,
                visited:false,
                questionKey: "question1",
                logicalName: "question1",
                inputType: "text",
                dataType: "string",
                text: "What is your name?",
                placeholder: "Enter your name",
                paragraph: "We need your name for identification.",
                answered: false,
                output: {}
            },
            {
                intermediate: false,
                visited:false,   
                questionKey: "question1",
                logicalName: "question2",
                inputType: "email",
                dataType: "string",
                text: "What is your email?",
                placeholder: "Enter your email",
                paragraph: "We need your email for contact.",
                answered: false,
                output: {}
            }
        ]
    },
    ending: {
        text: "Thanks for choosing QuickForm",
        paragraph: "The form has now been submitted."
    },
    slides: [
        {
            questions: [
                {
                    answered: false,
                    dataType: "string",
                    inputProperties: {
                        inputType: "slider",
                        min: 1,
                        max: 200,
                        step: 10
                    },
                    inputType: "slider",
                    logicalName: "areaToClean",
                    output: "",
                    paragraph: "",
                    placeholder: "20 m2",
                    questionKey: "areaToClean",
                    text: "Hvor mange kvadratmeter skal renses?"
                },
                {
                    answered: false,
                    dataType: "string",
                    inputProperties: {
                        inputType: "radio",
                        options: {
                            yes: "Ja",
                            no: "Nej"
                        }
                    },
                    inputType: "radio",
                    logicalName: "removeAlgae",
                    output: "",
                    paragraph: "Vælg 'Ja', hvis der er behov for fjernelse af alger, ellers vælg 'Nej'.",
                    placeholder: "",
                    questionKey: "removeAlgae",
                    text: "Skal alger fjernes?"
                },
                {
                    answered: false,
                    dataType: "string",
                    inputProperties: {
                        inputType: "buttons",
                        options: {
                            yes: "Ja",
                            no: "Nej"
                        }
                    },
                    inputType: "buttons",
                    logicalName: "impregnateTiles",
                    output: "",
                    paragraph: "Vælg 'Ja', hvis fliserne skal imprægneres, ellers vælg 'Nej'.",
                    placeholder: "",
                    questionKey: "impregnateTiles",
                    text: "Skal fliserne imprægneres?"
                },
                {
                    answered: false,
                    dataType: "string",
                    inputProperties: {},
                    inputType: "checkbox",
                    logicalName: "luxuryPackage",
                    output: "",
                    paragraph: "",
                    placeholder: "",
                    questionKey: "luxuryPackage",
                    text: "Ønskes luksuspakke?",
                    visible: {
                        type: "JSEval",
                        rule: "getCurrentSlide().questions.find(q => q.logicalName === 'removeAlgae').output === 'Ja'"
                    }
                }
            ],
            rows: [
                {
                    type: "row",
                    columns: [
                        {
                            type: "column",
                            rows: [
                                {
                                    type: "question",
                                    ref: "areaToClean"
                                },
                                {
                                    type: "question",
                                    ref: "removeAlgae"
                                },
                                {
                                    type: "question",
                                    ref: "impregnateTiles"
                                },
                                {
                                    type: "question",
                                    ref: "luxuryPackage"
                                }
                            ]
                        }
                    ]
                }
            ],
            displayName: "Beregn prisen for rengøring af fliser"
        } as unknown as SlideModel
    ]
};


/* 
questions: [
        {
            logicalName: "contact",
            inputType: "text",
            text: "Contact number",
            placeholder: "e.g., +1234567890",
            paragraph: "Please provide a contact number for order updates.",
            output: ""
        },
        {
            logicalName: "billingAddress",
            inputType: "text",
            text: "Billing address",
            placeholder: "Street, City, Zip Code",
            paragraph: "Enter the address associated with your payment method.",
            output: ""
        },
        {
            logicalName: "email",
            inputType: "email",
            text: "Email address",
            placeholder: "yourname@example.com",
            paragraph: "Provide your email for order confirmation and receipts.",
            output: ""
        },
        {
            logicalName: "orderInstructions",
            inputType: "text",
            text: "Special instructions for order",
            placeholder: "Any specific details",
            paragraph: "Include any special instructions for your order here.",
            output: ""
        },
        {
            logicalName: "pickupTime",
            inputType: "time",
            text: "Preferred pickup time",
            placeholder: "HH:MM",
            paragraph: "Select a convenient time for pickup.",
            output: ""
        },
        {
            logicalName: "deliveryDate",
            inputType: "date",
            text: "Desired delivery date",
            placeholder: "YYYY-MM-DD",
            paragraph: "Choose a date for your delivery.",
            output: ""
        },
        {
            logicalName: "recipientName",
            inputType: "text",
            text: "Recipient's name",
            placeholder: "Full name",
            paragraph: "Enter the name of the person receiving the delivery.",
            output: ""
        },
        {
            logicalName: "productPreference",
            inputType: "text",
            text: "Product preference",
            placeholder: "Specify product type",
            paragraph: "Mention your preference for specific products or brands.",
            output: ""
        },
        {
            logicalName: "paymentMethod",
            inputType: "text",
            text: "Preferred payment method",
            placeholder: "Credit card, PayPal, etc.",
            paragraph: "Indicate your preferred method of payment.",
            output: ""
        },
        {
            logicalName: "feedback",
            inputType: "textarea",
            text: "Customer feedback",
            placeholder: "Your feedback here",
            paragraph: "We value your feedback, please share your experience with us.",
            output: ""
        }
    ],
    */