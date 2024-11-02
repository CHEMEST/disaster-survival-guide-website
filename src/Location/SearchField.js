import React, { useState } from 'react';

const SearchField = ({ onSearch, onToggleFires }) => {
    const [inputValue, setInputValue] = useState('');
    const [parameter, setParameter] = useState(["amenity", "fire_station"]); // Default parameter
    const [radius, setRadius] = useState('');
    const [canAddFires, setCanAddFires] = useState(false); // State to control fire addition
    const [animate, setAnimate] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ inputValue, parameter, radius });
        setInputValue('');
    };

    const handleCheckboxChange = () => {
        setCanAddFires((prev) => !prev);
        onToggleFires((prev) => !prev);
    };

    const handleParameterChange = (e) => {
        setParameter(e.target.value);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 300); // Reset animation after 300ms
    };

    // Get a user-friendly name from the parameter value for display
    const getParameterLabel = () => {
        if (parameter === '["amenity", "fire_station"]') return 'Fire Station';
        if (parameter === '["emergency", "fire_hydrant"]') return 'Fire Hydrant';
        return 'Location';
    };

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

            {/* Separate Container for "Enable adding fires" */}
            <div className="bg-white shadow-md rounded-lg p-4">
                <label className="flex items-center space-x-2 text-gray-700 text-sm">
                    <input
                        type="checkbox"
                        checked={canAddFires}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span>Enable adding fires</span>
                </label>
            </div>
        </div>
    );
};

export default SearchField;
