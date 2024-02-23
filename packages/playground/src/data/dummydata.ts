import { QuickFormDefinition } from "../../../core/src/model/QuickFormDefinition";



export const newDummyForm = {
    "layout": {
        "slides": {
            "slide1": {
                "title": "Ship name and owners",
                "rows": {
                    "row1": {
                        "columns": {
                            "col1": {
                                "rows": {
                                    "row1_1": {
                                        type: "question",
                                        "ref": "shipName"
                                    },
                                    "row1_2": {
                                        type: "question",
                                        "ref": "shipOwners"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "slide2": {
                "title": "Date and Cargo",
                "rows": {
                    "row2": {
                        "columns": {
                            "col1": {
                                "rows": {
                                    "row2_1": {
                                        type: "question",
                                        "ref": "dateSelector"
                                    },
                                    "row2_2": {
                                        type: "question",
                                        "ref": "cargo"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "slide3": {
                "title": "Bill of Lading",
                "rows": {
                    "row3": {
                        "columns": {
                            "col1": {
                                "rows": {
                                    "row3_1": {
                                        type: "question",
                                        "ref": "billOfLading"
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    "intro": {
        "text": "Company LOI Request Form",
        "paragraph": "Click to start processing the request",
        "buttonText": "Start",
    },
    "submit": {
        "text": "Submit LOI.",
        "buttonText": "Submit",
        "paragraphs": [
            "Who should sign the LOI?",
            "To speed up the process, you may provide the signing information already now.",
            "When ready we will send the digital loi for signature to this person."
        ],
        "submitUrl": "https://httpbin.org/post",
        "submitMethod": "POST",
        "submitFields": {
            "uiSchema": {
                "fullname": { "ui:placeholder": "Full name of the signing person.", "ui:label": false },
                "title": { "ui:placeholder": "Title of the signing person.", "ui:label": false },
                "email": { "ui:placeholder": "Email of the signing person", "ui:label": false },
                "phone": { "ui:placeholder": "SMS number of the signing person", "ui:label": false }

            },
            "schema": {
                "$schema": "http://json-schema.org/draft-04/schema#",
                "type": "object",
                "title": "Who should sign the LOI?",
                "description": "To speed up the process, you may provide the signing information already now. When ready we will send the digital loi for signature to this person.",
                "properties": {




                    "fullname": {
                        "type": "string",
                        "description": "Whats the name of the person who is signing the LOI?",
                    },
                    "title": {
                        "type": "string",
                        "description": "Whats the title of the person who is signing the LOI?",
                    },
                    "email": {
                        "type": "string",
                        "format": "email",
                        "description": "Please provide us with the email of the signer."
                    },
                    "phone": {
                        "type": "string",
                        "format": "tel",
                        "description": "If provided we will send an sms with the signing request."
                    },
                    "sendBeforeApproved": {
                        "title": "Send to charteres",
                        "type": "boolean",
                        "description": "Want to speed up the process? You may send it for signatur at your chatereres. Please note if we find errors, the charteres might recieve notification that the LOI have been updated.\nIf not selected, we will send the digital signatur request when approved the document"
                    }
                },
                "required": [
                    "fullname",
                    "title",
                    "email"
                ]
            }
        }


    },
    "ending": {
        "inputType": "ending",
        "text": "Thanks for choosing Company",
        "paragraph": "Looking forward to chartering with you."
    },
    "questions": {
        "shipOwners": {
            "inputType": "multilinetext",
            "text": "What is the name of the ships owner?",
            "paragraph": "Please provide the name of the company that owns the ship",
            "placeholder": "European Vessels A/S",
            "lang": "EN"
        },
        "dateSelector": {
            "inputType": "text",
            "text": "What is the date of your journey?",
            "paragraph": "Please enter the date of your journey.",
            "placeholder": "01/01/2000",
        },
        "shipName": {
            "inputType": "text",
            "text": "What is the name of your ship?",
            "paragraph": "Please provide the name of your ship.",
            "placeholder": "M/S Vessel",
            "lang": "EN"
        },
        "cargo": {
            "inputType": "text",
            "text": "What type of cargo are you carrying?",
            "paragraph": "Please select the type of cargo you are carrying on this journey.",
            "placeholder": "Oil",
            "lang": "EN"
        },
        "billOfLading": {
            "inputType": "dropdown",
            "text": "Has the Bill of Lading been verified?",
            "paragraph": "Please confirm whether the Bill of Lading details have been verified and are accurate.",
            "placeholder": "Verified/Not Verified",
            "minItems": 1,
            "maxItems": 1,
            "options": {
                "A": "Verified",
                "B": "Not verified"
            },
            "lang": "EN"
        },
    }
} as QuickFormDefinition;
