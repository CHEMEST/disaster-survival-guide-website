import React, { useState } from 'react';

const SearchField = ({ onSearch, onToggleFires }) => {
    const [inputValue, setInputValue] = useState('');
    const [parameter, setParameter] = useState(["amenity", "fire_station"]); // Default parameter
    const [radius, setRadius] = useState('');
    const [canAddFires, setCanAddFires] = useState(false); // State to control fire addition

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ inputValue, parameter, radius }); // Pass both the input value and selected parameter
        setInputValue(''); // Clear the input field
    };

    const handleCheckboxChange = () => {
        setCanAddFires((prev) => !prev);
        onToggleFires((prev) => !prev); // Notify parent component to toggle fire adding
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={parameter} onChange={(e) => setParameter(e.target.value)}>
                <option value={'["amenity", "fire_station"]'}>Fire Station</option>
                <option value={'["emergency", "fire_hydrant"]'}>Fire Hydrant</option>
                {/* Add more options as needed */}
            </select>
            {/* <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search for an area..."
                required
            /> */}
            <input
                type="number"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
                placeholder="Set search radius (meters)"
                required
            />
            <button type="submit">Search</button>

            <div>
                <label>
                    <input
                        type="checkbox"
                        checked={canAddFires}
                        onChange={handleCheckboxChange}
                    />
                    Enable adding fires
                </label>
            </div>
        </form>
    );
};

export default SearchField;
