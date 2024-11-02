import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const FireMarkers = ({ fireLocations, zoom }) => {
    return (
        <>
            {fireLocations.map((fire, index) => (
                <Marker
                    key={index}
                    position={fire.location}
                    icon={L.icon({
                        iconUrl: require('./fire_moving.gif'), // Path to fire icon image
                        iconSize: [32 * fire.size * (zoom / 16), 32 * fire.size * (zoom / 16)], // Scale size based on fire's growth and zoom level
                    })}
                />
            ))}
        </>
    );
};

const MapEventHandler = ({ setZoom, addFireLocation }) => {
    useMapEvents({
        zoomend: (e) => {
            setZoom(e.target.getZoom());
        },
        click: (e) => {
            addFireLocation([e.latlng.lat, e.latlng.lng]);
        }
    });
    return null;
};

const OverpassMap = ({ featureType, radius, fireInfo, isSimulating }) => {
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locLat, setLocLat] = useState(null);
    const [locLong, setLocLong] = useState(null);
    const [fireLocations, setFireLocations] = useState([]);
    const [zoom, setZoom] = useState(16);
    const MAX_FIRE_SIZE = 100;

    const worldBounds = L.latLngBounds(
        L.latLng(-85, -180),
        L.latLng(85, 180)
    );

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLocLat(position.coords.latitude);
            setLocLong(position.coords.longitude);
            setLoading(false);
        }, (error) => {
            console.error("Geolocation error:", error);
            setLoading(false);
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

    const addFireLocation = (newLocation) => {
        if (fireInfo.canAddFires) {
            setFireLocations((prevLocations) => [
                ...prevLocations,
                { location: newLocation, size: 1 },
            ]);
        }
    };

    const spreadFire = () => {
        if (!isSimulating) return; // Stop spreading if simulation is off

        const windSpeed = fireInfo.windSpeed || 0;
        const forwardRateOfSpread = windSpeed * 0.1;

        setFireLocations((prevLocations) =>
            prevLocations.map((fire) => ({
                ...fire,
                size: Math.min(fire.size + forwardRateOfSpread / 10, MAX_FIRE_SIZE)
            }))
        );
    };

    useEffect(() => {
        const interval = setInterval(spreadFire, 1000);
        return () => clearInterval(interval);
    }, [fireInfo.windSpeed, isSimulating]);

    if (loading) return <div>Loading...</div>;
    if (locLat === null || locLong === null) return <div>Locating...</div>;

    return (
        <MapContainer
            center={[locLat, locLong]}
            zoom={16}
            maxBoundsViscosity={1.0}
            maxBounds={worldBounds}
            minZoom={2}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {features.map((feature) => (
                <Marker
                    key={feature.id}
                    position={[feature.lat, feature.lon]}
                    icon={L.icon({ iconUrl: require('leaflet/dist/images/marker-icon.png') })}
                >
                    <Popup>{feature.tags?.name || 'Unnamed Feature'}</Popup>
                </Marker>
            ))}

            <MapEventHandler setZoom={setZoom} addFireLocation={addFireLocation} />
            <FireMarkers fireLocations={fireLocations} zoom={zoom} />
        </MapContainer>
    );
};

export default OverpassMap;
