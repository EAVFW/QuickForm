import React, { ChangeEvent, useState } from "react";
import { InputComponentType, registerInputComponent, useQuickForm } from "@eavfw/quickform-core";
import { SliderProperties } from "@eavfw/quickform-core/src/model";
import { sliderInputSchema } from "./SliderInputSchema";

export const SliderInput: InputComponentType<SliderProperties> = ({ questionModel, max = 100, min = 0, step = 1, }) => {
    const { answerQuestion } = useQuickForm();

    const unit = 'm2';
    const [value, setValue] = useState<string>(questionModel.output || min);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        answerQuestion(questionModel.logicalName, event.target.value, true)
    }

    const calculatePosition = (value: number, min: number, max: number): number => {
        const percentage = (value - min) / (max - min);
        return percentage * 100;
    }

    const labelStyle: React.CSSProperties = {
        position: 'absolute',
        left: `calc(${calculatePosition(Number(value), min, max)}% - ${Number(value) / max * 30}px)`,
        top: '-40px',
        transform: 'translateX(-50%)'
    };

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