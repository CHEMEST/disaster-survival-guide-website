import React, { useState } from 'react';
import OverpassMap from './OverpassMap';
import SearchField from './SearchField';

function Location() {
    const [featureType, setFeatureType] = useState(["amenity", "fire_station"]); // Default feature type
    const [radius, setRadius] = useState(''); // Default feature type


    const handleSearch = ({ inputValue, parameter, radius}) => {
        setFeatureType(JSON.parse(parameter)); // Update the feature type state
        setRadius(radius);
    };

    return (
        <div className="flex h-screen">
        <div className="w-1/4 p-4 bg-gray-100">
            <SearchField onSearch={handleSearch} />
        </div>
        <div className="w-3/4">
            <OverpassMap featureType={featureType} radius={radius}/>
        </div>
    </div>
    );
}

export default Location;
