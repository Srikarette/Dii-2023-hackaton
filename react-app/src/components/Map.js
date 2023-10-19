import { React, useState, useEffect } from "react";
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
  const [fireMarkerLocation, setFireMarkerLocation] = useState(null);

  const [userLocation, setUserLocation] = useState(null);
  const [zoom, setZoom] = useState(initialZoomLevel);
  const [center, setCenter] = useState(initialCenter);
  const [mapReady, setMapReady] = useState(false);

  const [showDangerZone, setShowDangerZone] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [dangerZoneRadius, setDangerZoneRadius] = useState(1000); // Default radius in meters (1 kilometer)

  const [showOptions, setShowOptions] = useState(false); // State to manage the visibility of additional options

  // Function to handle clicking the "Go to My Location" button
  const handleGoToUserLocation = (event) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setCenter([latitude, longitude]); // Set the center to the user's location
        setZoom(16); // Set a custom zoom level to zoom in on the user's location
        setShowDangerZone(!showDangerZone); // Show the danger zone
        setShowUserLocation(!showUserLocation);

        // Check the selected option
        const selectedOption = event.target.value;
        if (selectedOption === "Fire") {
          // If "Fire" is selected, display a marker on the user's location
          setFireMarkerLocation([latitude, longitude]);
        }
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

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <>
      <div className={className}>
        <div className="playground">
          <select className="emergency-btn" onClick={toggleOptions}>
            <option>Choose Emergency</option>
            {showOptions && (
              <>
                <option>Fire</option>
                <option>Flood</option>
                <option>Crime</option>
              </>
            )}
          </select>

          {/* <div className='radius-control'>
                    <label>Set Danger Zone Radius (kilometers):</label>
                    <input type="number" min="1" step="0.1" value={dangerZoneRadius / 1000} onChange={handleRadiusChange} />
                </div> */}
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
                {fireMarkerLocation && (
                  <Marker position={fireMarkerLocation} icon={fireMarkerIcon}>
                    <Popup>Fire Location</Popup>
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
    height: calc(100vh); /* Adjust height to make space for the button */
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
    left: 50%; /* Center the button horizontally */
    transform: translateX(-50%); /* Center the button horizontally */
    z-index: 999; /* Set a higher z-index to ensure the button is displayed above the map */
    margin-bottom: 3%;
    border: 1px solid black;
    background-color: red;
    text-align: center;
  }

  .custom-marker-icon {
    width: 12px;
    height: 12px;
    margin: -6px 0 0 -6px; /* Adjust margin for centering */
    background-color: red;
    border-radius: 50%;
  }
`;
