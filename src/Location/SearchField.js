import React, { useState } from 'react';

const SearchField = ({ onSearch }) => {
    const [inputValue, setInputValue] = useState('');
    const [parameter, setParameter] = useState(["amenity", "fire_station"]); // Default parameter
    const [radius, setRadius] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ inputValue, parameter, radius }); // Pass both the input value and selected parameter
        setInputValue(''); // Clear the input field
    };

    return (
        <form onSubmit={handleSubmit}>
            <select value={parameter} onChange={(e) => setParameter(e.target.value)}>
                <option multiple={true} value={["amenity", "fire_station"]}>Fire Station</option>
                <option multiple={true} value={["emergency", "fire_hydrant"]}>Fire Hydrant</option>
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
        </form>
    );
};

export default SearchField;
