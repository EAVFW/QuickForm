import { SubmitStatus } from "../model/SubmitStatus";
import { FormData } from "../model/FormData";
import { SlideModel } from "../model/SlideModel";

export type QuickformState = {
    errorMsg: string;
    data: FormData;
    slides: SlideModel[];
    hasNextSlide: boolean;
    hasPrevSlide: boolean;
    currIdx: number;
    currStep: number;
    totalSteps: number;
    progress: number;
    progressText: string;
    submitStatus: SubmitStatus;
    isIntroSlide: boolean;
    isSubmitSlide: boolean;
    isEndingSlide: boolean;
}

export const defaultState = (data: FormData = defaultData): QuickformState => {
    // TODO - Handle Layout
    const slidesDefined = data.slides.length > 0;
    const introSlideDefined = typeof data.intro !== "undefined";
    const defState = {
        errorMsg: "",
        data: data,
        slides: data.slides,
        hasNextSlide: data.slides.length > 1,
        hasPrevSlide: false,
        currIdx: 0,
        currStep: slidesDefined ? 1 : 0,
        totalSteps: data.slides.length,
        progress: 0,
        progressText: "",
        submitStatus: { isSubmitting: false, isSubmitError: false, isSubmitSuccess: false },
        isIntroSlide: introSlideDefined,
        isEndingSlide: false,
        isSubmitSlide: false
    };

    return defState;
};

export const defaultData: FormData = {
    intro: {
        text: "Welcome to Quickform",
        paragraph: "Click the button to get started",
        buttonText: "Start"
    },
    submit: {
        text: "Example Submit Text",
        paragraph: "Example paragraph describing the submit action.",
        buttonText: "Submit",
        submitFields: [
            {
                logicalName: "question1",
                inputType: "text",
                text: "What is your name?",
                placeholder: "Enter your name",
                paragraph: "We need your name for identification.",
                answered: false,
                output: {}
            },
            {
                logicalName: "question2",
                inputType: "email",
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
    questions: [
        {
            logicalName: "contact",
            inputType: "text",
            text: "Contact number",
            placeholder: "e.g., +1234567890",
            paragraph: "Please provide a contact number for order updates."
        },
        {
            logicalName: "billingAddress",
            inputType: "text",
            text: "Billing address",
            placeholder: "Street, City, Zip Code",
            paragraph: "Enter the address associated with your payment method."
        },
        {
            logicalName: "email",
            inputType: "email",
            text: "Email address",
            placeholder: "yourname@example.com",
            paragraph: "Provide your email for order confirmation and receipts."
        },
        {
            logicalName: "orderInstructions",
            inputType: "text",
            text: "Special instructions for order",
            placeholder: "Any specific details",
            paragraph: "Include any special instructions for your order here."
        },
        {
            logicalName: "pickupTime",
            inputType: "time",
            text: "Preferred pickup time",
            placeholder: "HH:MM",
            paragraph: "Select a convenient time for pickup."
        },
        {
            logicalName: "deliveryDate",
            inputType: "date",
            text: "Desired delivery date",
            placeholder: "YYYY-MM-DD",
            paragraph: "Choose a date for your delivery."
        },
        {
            logicalName: "recipientName",
            inputType: "text",
            text: "Recipient's name",
            placeholder: "Full name",
            paragraph: "Enter the name of the person receiving the delivery."
        },
        {
            logicalName: "productPreference",
            inputType: "text",
            text: "Product preference",
            placeholder: "Specify product type",
            paragraph: "Mention your preference for specific products or brands."
        },
        {
            logicalName: "paymentMethod",
            inputType: "text",
            text: "Preferred payment method",
            placeholder: "Credit card, PayPal, etc.",
            paragraph: "Indicate your preferred method of payment."
        },
        {
            logicalName: "feedback",
            inputType: "textarea",
            text: "Customer feedback",
            placeholder: "Your feedback here",
            paragraph: "We value your feedback, please share your experience with us."
        }
    ],
    // TODO - Define slides when model is done
    slides: []
}