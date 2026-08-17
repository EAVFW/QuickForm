import React, { useState } from "react";
import { InputComponentType, registerInputComponent, useQuickForm } from "@eavfw/quickform-core";
import { radioInputSchema } from "./RadioInputSchema";

type RadioProperties = {
    inputType: "radio";
    options: {
        [key: string]: string;
    }
    direction?: "horizontal" | "vertical";
}

export const RadioInput: InputComponentType<RadioProperties> = ({ questionModel, options, direction, }) => {
    const { answerQuestion } = useQuickForm();
    const [selectedValue, setSelectedValue] = useState<string>(questionModel.output);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
        answerQuestion(questionModel.logicalName, event.target.value)
    };


    return (
        <div >
            {Object.entries(options).map(([key, value]) => (
                <div key={key} >
                    <input
                        type="radio"
                        id={`${questionModel.logicalName}-${key}`}
                        name={questionModel.logicalName}
                        value={value}
                        checked={selectedValue === value}
                        onChange={handleChange}

                    />
                    <label
                        htmlFor={`${questionModel.logicalName}-${key}`}

                    >
                        {value}
                    </label>
                </div>
            ))}
        </div>
    );
};

RadioInput.inputSchema = radioInputSchema;
registerInputComponent("radio", RadioInput);