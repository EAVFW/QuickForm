import { SubmitStatus } from "../model/SubmitStatus";
import { SlideModel } from "../model/SlideModel";
import { LayoutDefinition, QuickFormModel } from "../model";
import { IconType } from "../components/icons/IconResolver";

export type QuickformClassNames = {
    slide: string,
    slideButton: string,
    slideButtonContainer: string;
    slideIsIn: string,
    slideIsOut: string,
    submit: string,
    ending: string
};
export type QuickformState = {
    autoAdvanceSlides?: boolean;
    enableQuestionNumbers?: boolean;
    showPressEnter?: boolean;
    defaultNextButtonText?: string;
    defaultSlideButtonIcon?: IconType;
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
    classes: Partial<QuickformClassNames>,
    payloadAugments: Array<(payload: any) => any>
}

export const defaultState = (data: QuickFormModel = defaultData, layout?: LayoutDefinition): QuickformState => {
    const defState = {
        autoAdvanceSlides: layout?.autoAdvanceSlides ?? false,
        enableQuestionNumbers: layout?.enableQuestionNumbers ?? false,
        showPressEnter: layout?.showPressEnter ?? undefined, 
        defaultNextButtonText: layout?.defaultNextButtonText ?? "Næste",
        defaultSlideButtonIcon: layout?.defaultSlideButtonIcon ?? undefined,
        classes: layout?.classes ?? {},
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
        payloadAugments: []
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
                errorMsg: "",
                intermediate: false,
                visited: false,
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
                errorMsg: "",
                intermediate: false,
                visited: false,
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