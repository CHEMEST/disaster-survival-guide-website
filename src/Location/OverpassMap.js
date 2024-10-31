import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const DynamicMarker = ({ position, image, sizeFactor }) => {
    const map = useMap();
    const markerRef = useRef(null);
    const [iconSize, setIconSize] = useState(32);

    const createCustomIcon = (size) => {
        return new L.Icon({
            iconUrl: image,
            iconSize: [size, size],
            iconAnchor: [size / 2, size],
            popupAnchor: [0, -size],
        });
    };

    useEffect(() => {
        const updateIconSize = () => {
            const zoomLevel = map.getZoom();
            const newSize = 32 * (zoomLevel / 16) * sizeFactor; // Adjust size based on zoom level and size factor
            setIconSize(newSize);
        };

        updateIconSize();
        map.on('zoom', updateIconSize);

        return () => {
            map.off('zoom', updateIconSize);
        };
    }, [map, sizeFactor]);

    return (
        <Marker
            ref={markerRef}
            position={position}
            icon={createCustomIcon(iconSize)}
        />
    );
};

const OverpassMap = ({ featureType, radius }) => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locLat, setLocLat] = useState(null);
    const [locLong, setLocLong] = useState(null);
    const [fireSize, setFireSize] = useState(1); // Start with a base size

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocLat(position.coords.latitude);
            setLocLong(position.coords.longitude);
        }, (error) => {
            console.error("Geolocation error:", error);
            setLoading(false); // Stop loading if geolocation fails
        });
    }, []);

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
        if (locLat !== null && locLong !== null) {
            setLoading(true);
            fetchFeatures(featureType, radius);
        }
    }, [locLat, locLong, featureType, radius]);

    const spreadFire = () => {
        setFireSize(prevSize => Math.min(prevSize + 0.1, 5)); // Increase fire size, max size of 5
    };

    useEffect(() => {
        const interval = setInterval(spreadFire, 1000); // Increase fire size every second
        return () => clearInterval(interval);
    }, []);

    if (loading) return <div>Loading...</div>;
    if (locLat === null || locLong === null) return <div>Locating...</div>;

    return (
        <MapContainer center={[locLat, locLong]} zoom={16} style={{ height: '100%', width: '100%' }}>
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

            {/* Main fire marker */}
            <DynamicMarker
                position={[locLat, locLong]}
                image={require('./fire_icon.png')} // Your fire icon image
                sizeFactor={fireSize} // Adjust the size based on the fire size state
            />
        </MapContainer>
    );
};

export default OverpassMap;
