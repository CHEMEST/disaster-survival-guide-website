import React, { useEffect, useState } from 'react';
import OverpassMap from './OverpassMap';
import SearchField from './SearchField';

function Location() {
    const [featureType, setFeatureType] = useState(["amenity", "fire_station"]);
    const [radius, setRadius] = useState('');
    const [fireInfo, setFireInfo] = useState({ canAddFires: false, windSpeed: '' });
    const [isSimulating, setIsSimulating] = useState(false);

    const handleSearch = ({ inputValue, parameter, radius }) => {
        if (typeof parameter === 'object') {
            setFeatureType(parameter);
        } else {
            setFeatureType(JSON.parse(parameter));
        }
        setRadius(radius);
    };

    const handleFireInfoChange = (info) => {
        setFireInfo(info);
    };

    const handleSimulationToggle = (isSimulating) => {
        setIsSimulating(isSimulating);
    };

    return (
        <div className="flex flex-grow w-full overflow-hidden">
            <div className="w-1/4 p-4 bg-background">
                <SearchField
                    onSearch={handleSearch}
                    onFireInfoChange={handleFireInfoChange}
                    onSimulationToggle={handleSimulationToggle}
                />
            </div>
            {/* Restrict the height and center the map container */}
            <div className="w-3/4 flex justify-center items-center max-h-[70vh]  bg-background">
                <div className="bg-background rounded-lg w-3/4 h-full flex justify-center items-center p-4">
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
