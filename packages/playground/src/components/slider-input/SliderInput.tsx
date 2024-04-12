import React, { ChangeEvent, useState } from "react";
import { InputComponentType, registerInputComponent, useQuickForm } from "@eavfw/quickform-core";
import { sliderInputSchema } from "./SliderInputSchema";

type SliderProperties = {
    inputType: "slider";
    min: number;
    max: number;
    step: number;
    defaultValue?: number;
}

export const SliderInput: InputComponentType<SliderProperties> = ({ questionModel, max = 100, min = 0, step = 1, }) => {
    const { answerQuestion } = useQuickForm();

    const unit = 'm2';
    const [value, setValue] = useState<number>(questionModel.output || min);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(event.target.value);
        setValue(newValue);
        answerQuestion(questionModel.logicalName, newValue, true)
    }

    const resultStyle: React.CSSProperties = {
        display: 'flex',
        height: '30px',
        fontSize: '20px',
        fontWeight: 'bold',
        marginTop: '10px'
    }

    return (
        <div>

            <div style={resultStyle}>
                {value} {unit}
            </div>

            <div>

                <div>
                    <input
                        type="range"
                        min={min}
                        max={max}
                        step={step}
                        value={value}
                        onChange={handleChange}
                    />
                    <div>
                        <div>
                            {min} {unit}
                        </div>
                        {max} {unit}
                    </div>
                </div>
            </div>

        </div>
    );
};

SliderInput.inputSchema = sliderInputSchema;
registerInputComponent("slider", SliderInput);