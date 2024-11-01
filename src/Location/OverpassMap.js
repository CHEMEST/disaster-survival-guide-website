import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const FireMarkers = ({ fireLocations, addFireLocation }) => {
    useMapEvents({
        click(e) {
            addFireLocation([e.latlng.lat, e.latlng.lng]);
        },
    });

    return (
        <>
            {fireLocations.map((fire, index) => (
                <Marker
                    key={index}
                    position={fire.location}
                    icon={L.icon({
                        iconUrl: require('./fire_icon.png'), // Path to fire icon image
                        iconSize: [32 * fire.size, 32 * fire.size], // Scale size based on fire's growth
                    })}
                />
            ))}
        </>
    );
};

const OverpassMap = ({ featureType, radius, canAddFires }) => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locLat, setLocLat] = useState(null);
    const [locLong, setLocLong] = useState(null);
    const [fireLocations, setFireLocations] = useState([]); // State for fire locations

    // Get user's current location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocLat(position.coords.latitude);
            setLocLong(position.coords.longitude);
            setLoading(false);
        }, (error) => {
            console.error("Geolocation error:", error);
            setLoading(false); // Stop loading if geolocation fails
        });
    }, []);

    // Fetch nearby features from Overpass API
    const fetchFeatures = async (type, radius) => {
        if (locLat === null || locLong === null) return;

        try {
            const query = `
                [out:json];
                node["${type[0]}"="${type[1]}"](around: ${Number(radius)}, ${locLat}, ${locLong});
                out body;
                >;
                out skel qt;
            `;
            const response = await fetch(`http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            setFeatures(data.elements);
            setLoading(false);
        } catch (err) {
            console.error("Fetch features error:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("canAddFires updated:", canAddFires);
    }, [canAddFires]);

    // Fetch features when location or parameters change
    useEffect(() => {
        if (locLat !== null && locLong !== null) {
            setLoading(true);
            fetchFeatures(featureType, radius);
        }
    }, [locLat, locLong, featureType, radius]);

    // Add a new fire location
    const addFireLocation = (newLocation) => {
        if (canAddFires) {
            setFireLocations((prevLocations) => [
                ...prevLocations,
                { location: newLocation, size: 1 },
            ]);
        }
    };

    // Increase fire size periodically
    const spreadFire = () => {
        setFireLocations((prevLocations) =>
            prevLocations.map((fire) => ({
                ...fire,
                size: fire.size + 0.1
            }))
        );
    };

    // Set an interval to increase fire size over time
    useEffect(() => {
        const interval = setInterval(spreadFire, 1000); // Grow fire every second
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (locLat === null || locLong === null) return <div>Locating...</div>;

    return (
        <MapContainer
            center={[locLat, locLong]}
            zoom={16}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Render queried features as markers */}
            {features.map((feature) => (
                <Marker
                    key={feature.id}
                    position={[feature.lat, feature.lon]}
                    icon={L.icon({ iconUrl: require('leaflet/dist/images/marker-icon.png') })}
                >
                    <Popup>{feature.tags?.name || 'Unnamed Feature'}</Popup>
                </Marker>
            ))}

            {/* Render fire markers and handle map clicks */}
            <FireMarkers fireLocations={fireLocations} addFireLocation={addFireLocation} canAddFires={canAddFires}/>
        </MapContainer>
    );
};

export default OverpassMap;
