import React, { useEffect, useState } from 'react';
import OverpassMap from './OverpassMap';
import SearchField from './SearchField';

function Location() {
    const [featureType, setFeatureType] = useState(["amenity", "fire_station"]); // Default feature type
    const [radius, setRadius] = useState(''); // Default radius
    const [fireInfo, setFireInfo] = useState({ canAddFires: false, windSpeed: '' }); // Fire info dictionary
    const [isSimulating, setIsSimulating] = useState(false); // Simulation state

    const handleSearch = ({ inputValue, parameter, radius }) => {
        if (typeof parameter === 'object') {
            setFeatureType(parameter);
        } else {
            setFeatureType(JSON.parse(parameter)); // Update the feature type state
        }

        setRadius(radius);
    };

    // Handler to update fire information
    const handleFireInfoChange = (info) => {
        setFireInfo(info);
    };

    // Handler to toggle simulation
    const handleSimulationToggle = (isSimulating) => {
        setIsSimulating(isSimulating);
    };

    return (
        <div className="flex h-full w-full">
            <div className="w-1/4 p-4 bg-background">
                <SearchField
                    onSearch={handleSearch}
                    onFireInfoChange={handleFireInfoChange}
                    onSimulationToggle={handleSimulationToggle}
                />
            </div>
            <div className="w-3/4 p-4 flex justify-center items-center bg-background"> {/* Center the map */}
                <div className="bg-background rounded-lg w-full h-full">
                    <OverpassMap
                        featureType={featureType}
                        radius={radius}
                        fireInfo={fireInfo}
                        isSimulating={isSimulating}
                    />
                </div>
            </div>
        </div>
    );
}

export default Location;
