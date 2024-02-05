import { QuickForm } from "../../../core/src/components"
import { NavigationButton } from "../../../core/src/components/navigation-button/NavigationButton";
import { OverviewList } from "../components/overview-list/OverviewList";


export const TemplateTwo: React.FC = () => {
    return (
        <div style={containerStyle}>
            <section style={formContent}>
                <OverviewList />
                <QuickForm />
            </section>
            <section style={formFooter}>
                <NavigationButton style={{ display: 'flex', justifyContent: 'end', marginRight: '10px', marginBottom: '10px' }} />
            </section>
        </div>
    )
}

const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '10px',
    boxShadow: '0px 0px 5px 1px',
}

const formContent = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    minWidth: '500px',
    minHeight: '500px',
};

const formFooter: React.CSSProperties = {
    width: '100%',
};

export const testData = {
    "intro": {
        "text": "Company LOI Request Form",
        "paragraph": "Click to start processing the request",
        "buttonText": "Start",
    },
    "submit": {
        "text": "Submit LOI.",
        "buttonText": "Submit",
        "paragraph": "Example paragraph describing the submit action.",
        "submitFields": {
            "shipName": {
                "inputType": "text",
                "text": "What is the name of your ship?",
                "paragraph": "Please provide the name of your ship.",
                "placeholder": "M/S Vessel",
                "lang": "EN"
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
            "minItems": "1",
            "maxItems": "1",
            "options": {
                "A": "Verified",
                "B": "Not verified"
            },
            "lang": "EN"
        },


    }
}

