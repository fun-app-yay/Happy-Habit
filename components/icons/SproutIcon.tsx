// FIX: Created the SproutIcon component to resolve definition errors.
import React from 'react';

const SproutIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5A5.25 5.25 0 006 9.75v.75a.75.75 0 01-1.5 0v-.75A6.75 6.75 0 0111.25 3h1.5A6.75 6.75 0 0119.5 9.75v.75a.75.75 0 01-1.5 0v-.75A5.25 5.25 0 0012.75 4.5h-1.5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V12m0 0a3.75 3.75 0 00-3.75-3.75H6a3.75 3.75 0 00-3.75 3.75v1.5a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-1.5zm0 0a3.75 3.75 0 013.75-3.75h2.25A3.75 3.75 0 0121 12v1.5a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v-1.5z" />
    </svg>
);

export default SproutIcon;
