import React, { useState, useEffect } from 'react';

const SearchField = ({ onSearch, onFireInfoChange, onSimulationToggle }) => {
    const [inputValue, setInputValue] = useState('');
    const [parameter, setParameter] = useState(["amenity", "fire_station"]);
    const [radius, setRadius] = useState('');
    const [fireInfo, setFireInfo] = useState({ windSpeed: '', canAddFires: false });
    const [animate, setAnimate] = useState(false);
    const [isSimulating, setIsSimulating] = useState(false); // New state for simulation toggle

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ inputValue, parameter, radius });
        setInputValue('');
    };

    const handleCheckboxChange = () => {
        setFireInfo((prev) => ({ ...prev, canAddFires: !prev.canAddFires }));
    };

    const handleWindSpeedChange = (e) => {
        const newWindSpeed = e.target.value;
        setFireInfo((prev) => ({ ...prev, windSpeed: newWindSpeed }));
    };

    useEffect(() => {
        onFireInfoChange(fireInfo);
        onSimulationToggle(isSimulating && fireInfo.windSpeed); // Pass simulation status
    }, [fireInfo, isSimulating, onFireInfoChange, onSimulationToggle]);


    const handleParameterChange = (e) => {
        setParameter(e.target.value);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300);
    };

    const toggleSimulation = () => {
        if (fireInfo.windSpeed) {
            setIsSimulating((prev) => !prev)
        }
    }

    return (
        <div className="space-y-6 max-w-md mx-auto">
            {/* Main Search Form */}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
                <div className="text-lg font-semibold text-gray-700">
                    Find nearby{' '}
                    <span className={`inline-block ${animate ? 'animate-pulse' : ''}`}>
                        <select
                            value={parameter}
                            onChange={handleParameterChange}
                            className="p-1 text-blue-500 border-b-2 border-blue-500 bg-transparent focus:outline-none focus:border-blue-700 transition duration-200"
                        >
                            <option value={'["amenity", "fire_station"]'}>Fire Station</option>
                            <option value={'["emergency", "fire_hydrant"]'}>Fire Hydrant</option>
                            {/* Add more options as needed */}
                        </select>
                    </span>{' '}
                    in area
                </div>

                <input
                    type="number"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                    placeholder="Set search radius (meters)"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                    Search
                </button>
            </form>

            {/* Separate Container for "Enable adding fires" and Wind Speed */}
            <div className="bg-white shadow-md rounded-lg p-4 space-y-4">
                <label className="flex items-center space-x-2 text-gray-700 text-sm">
                    <input
                        type="checkbox"
                        checked={fireInfo.canAddFires}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span>Enable adding fires</span>
                </label>

                <input
                    type="number"
                    value={fireInfo.windSpeed}
                    onChange={handleWindSpeedChange}
                    placeholder="Set wind speed (km/h)"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                                {/* Simulation Toggle Button */}
                                <button
                    onClick={toggleSimulation}
                    className={`w-full py-2 rounded-md transition-colors duration-200 ${
                        isSimulating ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    disabled={!fireInfo.windSpeed} // Only enable if wind speed is provided
                >
                    {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
                </button>
            </div>
        </div>
    );
};

export default SearchField;
