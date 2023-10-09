import { React, useState,useEffect } from 'react';
import { MapContainer, TileLayer, Circle,Marker ,Popup,Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function Map({ className }) {
    const initialCenter = [13.7563, 100.5018]; // Thailand's coordinates
    const initialZoomLevel = 6; // Initial zoom level


    const dangerZoneMarker = L.divIcon({
        className: 'custom-marker-icon',
        html: '<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%;"></div>',
    });

    const userLocationMarker = L.divIcon({
        className: 'custom-marker-icon',
        html: '<div style="background-color: blue; width: 12px; height: 12px; border-radius: 50%;"></div>',
    });

    const [userLocation, setUserLocation] = useState(null);
    const [zoom, setZoom] = useState(initialZoomLevel);
    const [center, setCenter] = useState(initialCenter);
    const [mapReady, setMapReady] = useState(false);
    const [showDangerZone, setShowDangerZone] = useState(false);
    const [showUserLocation, setShowUserLocation] = useState(false);
    const [dangerZoneRadius, setDangerZoneRadius] = useState(1000); // Default radius in meters (1 kilometer)

    // Function to handle clicking the "Go to My Location" button
    const handleGoToUserLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);
                setCenter([latitude, longitude]); // Set the center to the user's location
                setZoom(16); // Set a custom zoom level to zoom in on the user's location
                setShowDangerZone(true); // Show the danger zone
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
                    setZoom(16);
                    setShowUserLocation(true);
                    setMapReady(true); // Set map readiness to true
                });
            } else {
                alert('Geolocation is not supported in your browser.');
            }
        };

        fetchUserLocation();
    }, []);

    // Function to update the danger zone radius
    const handleRadiusChange = (event) => {
        const newRadiusInKilometers = parseFloat(event.target.value);
        const newRadiusInMeters = newRadiusInKilometers * 1000; // Convert to meters
        setDangerZoneRadius(newRadiusInMeters);
    };

    return (
        <div className={className}>
            <div className="playground">
                <button className='emergency-btn' onClick={handleGoToUserLocation}>Emergency Alert!</button>
                <div className='radius-control'>
                    <label>Set Danger Zone Radius (kilometers):</label>
                    <input type="number" min="1" step="0.1" value={dangerZoneRadius / 1000} onChange={handleRadiusChange} />
                </div>
                <div className='info'>
                    {userLocation && (
                        <MapContainer center={center} zoom={zoom} className="MapContainer">
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {showDangerZone && (
                                <>
                                   <Circle center={userLocation} radius={dangerZoneRadius} color="red">
                                        <Tooltip permanent>
                                            Test Disaster<br />
                                            {dangerZoneRadius / 1000} km
                                        </Tooltip>
                                    </Circle>
                                    <Marker position={userLocation} icon={dangerZoneMarker}>
                                        <Popup>You are here</Popup>
                                    </Marker>
                                </>
                            )}
                            {showUserLocation && (
                                <Marker position={userLocation} icon={userLocationMarker}>
                                    <Popup>Your Location</Popup>
                                </Marker>
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
    /* margin-top: 65px; */
}
.playground {
    width: 100%;
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