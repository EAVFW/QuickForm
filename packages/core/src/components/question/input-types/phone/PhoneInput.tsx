"use client"
import classNames from "classnames";
import { ChangeEvent, useState } from "react";
import { useFocusableQuestion } from "../../../../hooks/useFocusableQuestion";
import { InputProps } from "../../../../model/InputType";

import styles from "../text/TextInput.module.css";
import { InputComponentType, registerInputComponent } from "../../../../services/defaults/DefaultInputTypeResolver";

export const PhoneInput: InputComponentType = ({ questionModel }) => {

    
    const [text, setText] = useState<string>(questionModel!.output);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setText(() => event.target.value);
        questionModel.output = event.target.value;
    }

    const ref = useFocusableQuestion<HTMLInputElement>(questionModel.logicalName);

    return (
        <input
            ref={ref}
            type="email"
            className={classNames(styles.input__text)}
            placeholder={questionModel.placeholder}
            value={text}
            onChange={handleChange}
        />
    );
}

PhoneInput.quickform = {
    label: "Phone",
    uiSchema: {
        paragraph: {
            "ui:widget": "textarea"
        }
    },
    schema: {
        type: "object",

        properties: {
            text: {
                title: "Text",
                type: "string"
            },
            placeholder: {
                title: "Placeholder",
                type: "string"
            },
            paragraph: {
                title: "Paragraph",
                type: "string"
            }
        }
    }
}
registerInputComponent("phone", PhoneInput);
