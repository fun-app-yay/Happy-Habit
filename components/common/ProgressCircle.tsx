import React from 'react';

interface ProgressCircleProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress, size = 80, strokeWidth = 7 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    const getProgressColor = () => {
        if (progress < 40) return 'text-dusty-rose';
        if (progress < 75) return 'text-pale-gold';
        return 'text-sage-green';
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg
                className="transform -rotate-90"
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
            >
                <circle
                    className="text-light-sky-blue"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className={`${getProgressColor()} transition-colors duration-500`}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                    style={{ transitionProperty: 'stroke-dashoffset, color' , transitionDuration: '0.35s, 0.5s' }}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-600">{Math.round(progress)}%</span>
            </div>
        </div>
    );
};

export default ProgressCircle;