import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// DynamicMarker component
const DynamicMarker = ({ position, image, sizeFactor = 1, behavior }) => {
    const map = useMap();
    const markerRef = useRef(null);
    const [iconSize, setIconSize] = useState(32); // Default size

    // Create custom icon with dynamic size
    const createCustomIcon = (size) => {
        return new L.Icon({
            iconUrl: image,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            popupAnchor: [0, -size],
        });
    };

    useEffect(() => {
        // Update icon size based on zoom
        const updateIconSize = () => {
            const zoomLevel = map.getZoom();
            const newSize = 32 * (zoomLevel / 16) * sizeFactor; // Adjust size based on zoom and sizeFactor
            setIconSize(newSize);
        };

        updateIconSize(); // Initial size update
        map.on('zoom', updateIconSize); // Listen to zoom events

        return () => {
            map.off('zoom', updateIconSize);
        };
    }, [map, sizeFactor]);

    useEffect(() => {
        // Apply custom behavior to marker
        if (markerRef.current && behavior) {
            behavior(markerRef.current);
        }
    }, [behavior]);

    return (
        <Marker
            ref={markerRef}
            position={position}
            icon={createCustomIcon(iconSize)}
        />
    );
};

// OverpassMap component
const OverpassMap = ({ featureType, radius }) => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [locLat, setLocLat] = useState(null);
    const [locLong, setLocLong] = useState(null);

    useEffect(() => {
        // Fetch user's current location
        navigator.geolocation.getCurrentPosition((position) => {
            setLocLat(position.coords.latitude);
            setLocLong(position.coords.longitude);
        });
    }, []);

    const fetchFeatures = async (type, radius) => {
        if (locLat === null || locLong === null) return;

        try {
            const query = `
                [out:json];
                node["amenity"="${type}"](around: ${Number(radius)}, ${locLat}, ${locLong});
                out body;
                >;
                out skel qt;
            `;
            const response = await fetch(`http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            setFeatures(data.elements);
            setLoading(false);
        } catch (err) {
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (locLat !== null && locLong !== null) {
            setLoading(true);
            fetchFeatures(featureType, radius);
        }
    }, [locLat, locLong, featureType, radius]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;
    if (locLat === null || locLong === null) return <div>Locating...</div>;

    return (
        <MapContainer center={[locLat, locLong]} zoom={16} style={{ height: '100%', minHeight: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {/* Example usage of DynamicMarker with different images and behaviors */}
            <DynamicMarker
                position={[locLat, locLong]}
                image={require('./charmand_derp.png')}
                sizeFactor={1}
                behavior={(marker) => {
                    // Example pulsing behavior
                    setInterval(() => {
                        marker.setLatLng([
                            marker.getLatLng().lat + 0.0001,
                            marker.getLatLng().lng + 0.0001,
                        ]);
                    }, 1000);
                }}
            />

            <DynamicMarker
                position={[locLat + 0.002, locLong + 0.002]}
                image={require('./logo512.png')}
                sizeFactor={1.5}
                behavior={(marker) => {
                    // Example bouncing effect
                    let isUp = true;
                    setInterval(() => {
                        const latChange = isUp ? 0.0001 : -0.0001;
                        marker.setLatLng([
                            marker.getLatLng().lat + latChange,
                            marker.getLatLng().lng,
                        ]);
                        isUp = !isUp;
                    }, 500);
                }}
            />
        </MapContainer>
    );
};

export default OverpassMap;
