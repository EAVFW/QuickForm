import React from 'react';
import './ProgressCircle.module.css';

interface ProgressCircleProps {
  progress: number; // expected to be between 0 and 100
  color?: string;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

export const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, color = '#0096ff', backgroundColor = "#e0e0e0", style }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100 * circumference);

  return (
    <svg
      style={style ? style : {}}
      width="120"
      height="120"
      viewBox="0 0 120 120"
    >
      <defs>
        <filter id="f1" x="0" y="0" width="150%" height="150%">
          <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
          <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
        </filter>
      </defs>

      {/* Main background circle */}
      <circle cx="60" cy="60" r={radius} stroke={backgroundColor} strokeWidth="10" fill="none" />

      {/* Progress circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        stroke={color}
        strokeWidth="10"
        fill="none"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
      />

      {/* Text label in the middle */}
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="16" fill={color}>
        {progress}%
      </text>
    </svg>
  );
}
