// ToggleComponent.js
import DefaultComponent from './DefaultComponent';
import AlternateComponent from './AlternateComponent';
import { useState } from 'react';

const ToggleComponent = () => {
    const [showAlternate, setShowAlternate] = useState(false);

    // Handler to toggle components
    const handleToggle = () => {
        setShowAlternate((prev) => !prev);
    };

    return (
        <div>
            {/* Conditionally render components based on the state */}
            {showAlternate ? <AlternateComponent /> : <DefaultComponent />}
            {/* Button to toggle components */}
           
        </div>
    );
};


export default ToggleComponent;
