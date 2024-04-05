import React, { useEffect } from 'react';

const AutoButtonClick = () => {
    // Function to simulate a button click
    const clickButton = () => {
        const button = document.getElementById('themeButton');
        if (button) {
            button.click();
        }
    };

    // Run the clickButton function on page load
    useEffect(() => {
        clickButton();
    }, []);

    return null; // This component doesn't render anything, so return null
};

export default AutoButtonClick;