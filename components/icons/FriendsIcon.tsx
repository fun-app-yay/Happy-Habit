// FIX: Created the FriendsIcon component to resolve definition errors.
import React from 'react';

const FriendsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962c.57-1.036 1.392-1.89 2.41-2.502m-4.596 4.965c-.218.223-.432.441-.643.658m1.23-1.328a3.75 3.75 0 10-5.127 4.128M12 21a8.956 8.956 0 004.832-1.603m-3.41-4.042a3.75 3.75 0 10-5.127 4.128M15 12a3.75 3.75 0 10-7.5 0 3.75 3.75 0 007.5 0z" />
    </svg>
);

export default FriendsIcon;
