import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const OverpassMap = () => {
    const [parks, setParks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define your Overpass query
    const query = `
    [out:json];
    area["name"="Chicago"]->.searchArea;
    (
      node["leisure"="park"](area.searchArea);
    );
    out body;
    >;
    out skel qt;
    `;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setParks(data.elements);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data: {error.message}</div>;

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {parks.map((park) => (
                <Marker
                    key={park.id}
                    position={[park.lat, park.lon]}
                    icon={L.icon({ iconUrl: require('leaflet/dist/images/marker-icon.png') })}>
                    <Popup>{park.tags?.name || 'Unnamed Park'}</Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default OverpassMap;
