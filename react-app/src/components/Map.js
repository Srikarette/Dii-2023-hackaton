import { React, useState,useEffect } from 'react';
import { MapContainer, TileLayer, Circle,Marker ,Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Map({ className }) {
    const initialCenter = [13.7563, 100.5018]; // Thailand's coordinates
    const initialZoomLevel = 6; // Initial zoom level
    const customMarkerIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: '<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%;"></div>',
    });

    const [userLocation, setUserLocation] = useState(null);
    const [zoom, setZoom] = useState(initialZoomLevel);
    const [center, setCenter] = useState(initialCenter);
    const [mapReady, setMapReady] = useState(false);
    const [showMarker, setShowMarker] = useState(false);

    // Function to handle clicking the "Go to My Location" button
    const handleGoToUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
                setCenter([latitude, longitude]); // Set the center to the user's location
                setZoom(18); // Set a custom zoom level to zoom in on the user's location
                setShowMarker(true); // Show the marker
            });
        } else {
            alert('Geolocation is not supported in your browser.');
        }
    };

    useEffect(() => {
        const fetchUserLocation = () => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition((position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation([latitude, longitude]);
                    setCenter([latitude, longitude]);
                    setZoom(18);
                    setShowMarker(false);
                    setMapReady(true); // Set map readiness to true
                });
            } else {
                alert('Geolocation is not supported in your browser.');
            }
        };

        fetchUserLocation();
    }, []);

    return (
        <div className={className}>
            <div className="playground">
                <button className='emergency-btn' onClick={handleGoToUserLocation}>Emergency aleart!</button>
                <div className='info'>
                    {userLocation && (
                        <MapContainer center={center} zoom={zoom} className="MapContainer">
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {showMarker && (
                                <>
                                    <Circle center={userLocation} radius={100} color="red">
                                        <Popup>You are here</Popup>
                                    </Circle>
                                    <Marker position={userLocation} icon={customMarkerIcon}>
                                        <Popup>Center</Popup>
                                    </Marker>
                                </>
                            )}
                        </MapContainer>
                    )}
                </div>
            </div>
        </div>
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

}
.playground {
    width: 100%;
    margin-top: 40px;
}
.emergency-btn{
    margin-left: 50%;
}

.custom-marker-icon {
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px; /* Adjust margin for centering */
    background-color: red;
    border-radius: 50%;
}

`