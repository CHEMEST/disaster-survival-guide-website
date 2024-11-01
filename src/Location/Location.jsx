import React, { useState } from 'react';
import OverpassMap from './OverpassMap';
import SearchField from './SearchField';

function Location() {
    const [featureType, setFeatureType] = useState(["amenity", "fire_station"]); // Default feature type
    const [radius, setRadius] = useState(''); // Default radius
    const [canAddFires, setCanAddFires] = useState(false); // State for controlling fire addition

    const handleSearch = ({ inputValue, parameter, radius }) => {
        if (typeof(parameter) === 'object'){
            setFeatureType(parameter);
        } else {
            setFeatureType(JSON.parse(parameter)); // Update the feature type state
        }

        setRadius(radius);
    };

    // Handler to toggle the ability to add fires
    const handleToggleFires = (value) => {
        setCanAddFires((prevCanAddFires) => !prevCanAddFires);
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/4 p-4 bg-gray-100">
                <SearchField onSearch={handleSearch} onToggleFires={handleToggleFires} />
            </div>
            <div className="w-3/4">
                <OverpassMap featureType={featureType} radius={radius} canAddFires={canAddFires} />
            </div>
        </div>
    );
}

export default Location;
