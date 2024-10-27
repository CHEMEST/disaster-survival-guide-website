import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

let foundLocation = false;
let locLat = 0;
let locLong = 0;
navigator.geolocation.getCurrentPosition((position) => {
    locLat = position.coords.latitude
    locLong = position.coords.longitude;
    console.log(locLat + ", " + locLong);
    foundLocation = true;
    console.log(foundLocation)
});


const OverpassMap = ({ featureType, radius }) => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchFeatures = async (type, radius) => {
        try {
            const query = `
            [out:json];
            node["amenity"="${type}"](around: ${Number(radius)}, ${locLat}, ${locLong});
            out body;
            >;
            out skel qt;
            `;
            console.log(query)
            const response = await fetch(`http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setFeatures(data.elements);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    // Fetch features when the component mounts or when the feature type changes
    useEffect(() => {
        setLoading(true);
        fetchFeatures(featureType, radius);
    }, [featureType, radius]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <MapContainer center={[locLat, locLong]} zoom={16} style={{ height: '100%', minHeight: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {features.map((feature) => (
                <Marker
                    key={feature.id}
                    position={[feature.lat, feature.lon]}
                    icon={L.icon({ iconUrl: require('leaflet/dist/images/marker-icon.png') })}>
                    <Popup>{feature.tags?.name || 'Unnamed Feature'}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default OverpassMap;
