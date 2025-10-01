// FIX: Created the CareerIcon component to resolve definition errors.
import React from 'react';

const CareerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.075c0 1.313-.964 2.5-2.25 2.5h-10.5a2.25 2.25 0 01-2.25-2.5V6.75a2.25 2.25 0 012.25-2.25h10.5a2.25 2.25 0 012.25 2.25v4.075m-2.25-4.075a.75.75 0 00-.75-.75H7.5a.75.75 0 00-.75.75v10.5a.75.75 0 00.75.75h10.5a.75.75 0 00.75-.75V14.15m-1.5-1.135-3.375-3.375a.75.75 0 00-1.06 0L9.75 12.5l-2.625-2.625a.75.75 0 00-1.06 0L3.75 12.375" />
    </svg>
);

export default CareerIcon;
