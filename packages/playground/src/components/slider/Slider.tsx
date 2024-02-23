import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { InputProps, useQuickForm, registerInputComponent } from "@eavfw/quickform-core";

export function SliderInput({ questionModel, onOutputChange }: InputProps) {
    const [value, setValue] = useState<string>(questionModel.output || '10');

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onOutputChange(newValue);
    }

    const { isFirstQuestionInCurrentSlide } = useQuickForm();
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Automatically focus on the slider when it's the first question in the slide
        if (ref.current && isFirstQuestionInCurrentSlide(questionModel.logicalName)) {
            ref.current.focus();
        }
    }, [ref, isFirstQuestionInCurrentSlide, questionModel.logicalName]);

    return (
        <input
            ref={ref}
            type="range"
            min="1"
            max="300"
            placeholder={questionModel.placeholder}
            value={value}
            onChange={handleChange}
        />
    );
}

registerInputComponent("slider", SliderInput);