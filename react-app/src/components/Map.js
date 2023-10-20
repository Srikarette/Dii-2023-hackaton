import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Circle,
  Marker,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import styled from "styled-components";
import PropTypes from "prop-types";
import Navbar from "./Navbar";

function Map({ className }) {
  const initialCenter = [13.7563, 100.5018]; // Thailand's coordinates
  const initialZoomLevel = 6; // Initial zoom level

  const southwestBound = L.latLng(5, 90); // Define the southwest corner of the allowed area
  const northeastBound = L.latLng(25, 120); // Define the northeast corner of the allowed area
  const bounds = L.latLngBounds(southwestBound, northeastBound); // Create a bounds object

  const dangerZoneMarker = L.divIcon({
    className: "custom-marker-icon",
    html: '<div style="background-color: red; width: 12px; height: 12px; border-radius: 50%;"></div>',
  });

  const userLocationMarker = L.divIcon({
    className: "custom-marker-icon",
    html: '<div style="background-color: blue; width: 12px; height: 12px; border-radius: 50%;"></div>',
  });
  // Emergency options here

  const [userLocation, setUserLocation] = useState(null);
  const [zoom, setZoom] = useState(initialZoomLevel);
  const [center, setCenter] = useState(initialCenter);
  const [mapReady, setMapReady] = useState(false);

  const [showDangerZone, setShowDangerZone] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [dangerZoneRadius, setDangerZoneRadius] = useState(1000); // Default radius in meters (1 kilometer)

  // Function to handle clicking the "Go to My Location" button
  const handleGoToUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setCenter([latitude, longitude]); // Set the center to the user's location
        setZoom(16); // Set a custom zoom level to zoom in on the user's location
        setShowDangerZone(!showDangerZone); // Show the danger zone
        setShowUserLocation(!showUserLocation);

        // Check the selected option
      });
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  };
  useEffect(() => {
    const fetchUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setCenter([latitude, longitude]);
          setZoom(16);
          setShowUserLocation(true);
          setMapReady(true); // Set map readiness to true
        });
      } else {
        alert("Geolocation is not supported in your browser.");
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
    <>
      <div className={className}>
        <div className="playground">
          <select className="emergency-btn">
            <option>Choose Emergency</option>
          </select>

          <div className="info">
            {userLocation && (
              <MapContainer
                center={center}
                zoom={zoom}
                className="MapContainer"
                bounds={bounds}
                minZoom={6}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDangerZone && (
                  <>
                    <Circle
                      center={userLocation}
                      radius={dangerZoneRadius}
                      color="red"
                      stroke={0}
                    >
                      <Tooltip permanent>
                        <div className="disaster-info">
                          Test Disaster
                          <br />
                          {dangerZoneRadius / 1000} km
                        </div>
                      </Tooltip>
                      <Popup>Dangerzone</Popup>
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
    </>
  );
}

Map.propTypes = {
  className: PropTypes.string.isRequired,
};

export default styled(Map)`
  .MapContainer {
    width: 100%;
    height: calc(90vh);
  }

  .info {
    position: relative;
  }

  .playground {
    width: 100%;
    position: relative;
  }

  .emergency-btn {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    margin-bottom: 3%;
    border: 1px solid black;
    background-color: red;
    text-align: center;
  }

  .custom-marker-icon {
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px;
    background-color: red;
    border-radius: 50%;
  }
`;
