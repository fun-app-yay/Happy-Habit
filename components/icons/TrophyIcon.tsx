
import React from 'react';

const TrophyIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a9.75 9.75 0 0 1 0-18h9a9.75 9.75 0 0 1 0 18ZM10.5 12.75h3" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75V21m-3-9.75v-1.5a3 3 0 0 1 3-3 3 3 0 0 1 3 3v1.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 9.75h1.5M18 9.75h1.5" />
    </svg>
);

export default TrophyIcon;
