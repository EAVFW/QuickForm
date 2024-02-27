import React, { ChangeEvent, useState, FC } from "react";
import { InputProps, registerInputComponent } from "@eavfw/quickform-core";
import { SliderProperties } from "@eavfw/quickform-core/src/model";
import styles from "./SliderInput.module.css";

export const SliderInput = ({ questionModel, onOutputChange }:InputProps) => {
    const min = Number((questionModel.inputProperties as SliderProperties).min) || 0;
    const max = Number((questionModel.inputProperties as SliderProperties).max) || 100;
    const unit = 'm2';
    const [value, setValue] = useState<string>(questionModel.output || min);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        onOutputChange(newValue);
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

    const handleMouseDown = (event: React.MouseEvent<HTMLInputElement>) => {
        event.currentTarget.classList.add(styles['slider-thumb-active']);
    }

    const handleMouseUp = (event: React.MouseEvent<HTMLInputElement>) => {
        event.currentTarget.classList.remove(styles['slider-thumb-active']);
    }

    return (
        <div>

            <div style={resultStyle}>
                {value} {unit}
            </div>

            <div className={styles['range-slider']} style={{ position: 'relative' }}>
                <div className={styles['range-label']} style={labelStyle}>{value} {unit}</div>
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={handleChange}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    className={styles['range-slider-range']}
                />
                <div className={styles['range-values-container']}>
                    <div className={styles['range-values-min']}>
                        {min} {unit}
                    </div>
                    <div className={styles['range-values-max']}>
                        {max} {unit}
                    </div>
                </div>
            </div>

        </div>
    );
};

registerInputComponent("slider", SliderInput);