import { React, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Map({ className }) {
    const center = [13.7563, 100.5018]; // Thailand's coordinates
    const zoomLevel = 6; // Initial zoom level

    const [userLocation, setUserLocation] = useState(null);
    const [zoom, setZoom] = useState(zoomLevel);

    // Function to handle clicking the "Go to My Location" button
    const handleGoToUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
    
                // Set a custom zoom level when going to the user's location
                const customZoomLevel = 12; // You can adjust this value
                setZoom(customZoomLevel);
            });
        } else {
            alert('Geolocation is not supported in your browser.');
        }
    };

    return (
        <map className={className}>
            <div className="playground">
                <button onClick={handleGoToUserLocation}>Go to My Location</button>
                <div className='info'>
                    <MapContainer center={userLocation || center} zoom={zoom} className="MapContainer">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {userLocation && (
                            <Marker position={userLocation}>
                                <Popup>You are here</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
                
            </div>
        </map>
    );
}

Map.propTypes = {
    className: PropTypes.string.isRequired
}

export default styled(Map)`
.MapContainer {
    width: 100%;
    height: 1000px;
}
.info {
    margin-top: 65px;
}
.playground {
    width: 100%;
}
`