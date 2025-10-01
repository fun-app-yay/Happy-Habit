// FIX: Created the TravelIcon component to resolve definition errors.
import React from 'react';

const TravelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.024.217 1.464l-.657.92c-.318.44-.225 1.024.217 1.394l1.068.89c.257.215.405.53.405.864v.568c0 .334-.148.65-.405.864l-1.068.89c-.442.369-.535 1.024-.217 1.464l.657.92c.318.44.225 1.024-.217 1.394l-1.068.89c-.257.215-.405.53-.405.864v.568" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
    </svg>
);

export default TravelIcon;
