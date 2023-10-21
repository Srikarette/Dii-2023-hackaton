import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import FormData from "./FormData";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const MapNew = ({ className }) => {
  const initialCenter = [13.7563, 100.5018]; // Thailand's coordinates
  const initialZoomLevel = 6; // Initial zoom level
  //For userLocation ------Here------
  const [userLocation, setUserLocation] = useState(null);
  const [zoom, setZoom] = useState(initialZoomLevel);
  const [center, setCenter] = useState(initialCenter);
  const [mapReady, setMapReady] = useState(false);

  const [showDangerZone, setShowDangerZone] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [dangerZoneRadius, setDangerZoneRadius] = useState(1000); // Default radius in meters (1 kilometer)

  //Set bounds map
  const southwestBound = L.latLng(5, 90);
  const northeastBound = L.latLng(25, 120);
  const bounds = L.latLngBounds(southwestBound, northeastBound);

  const [newMarkerLocation, setNewMarkerLocation] = useState(null);

  const samplemarkers = [
    {
      geocode: [13.7563, 100.5018],
      popUp: "Hello, I'm mark1",
    },
    {
      geocode: [13.7563, 100.5018],
      popUp: "Hello, I'm mark2",
    },
  ];

  const firehere = new L.Icon({
    iconUrl: require("../assets/fire.png"), // Make sure this URL is correct
    iconSize: [38, 38],
  });

  const wildfirehere = new L.Icon({
    iconUrl: require("../assets/wildfire.png"), // Make sure this URL is correct
    iconSize: [38, 38],
  });

  const iamhere = new L.Icon({
    iconUrl: require("../assets/raise-hand.png"),
    iconSize: [40, 40],
  });

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

  const addNewMarkerNearUser = () => {
    if (userLocation) {
      // Calculate the new marker's position (e.g., 0.001 degrees to the east and north)
      const newLatitude = userLocation[0] + 0.001;
      const newLongitude = userLocation[1] + 0.001;
      setNewMarkerLocation([newLatitude, newLongitude]);
    }
  };

  return (
    <>
      <div className={className}>
        <button onClick={addNewMarkerNearUser}>Add New Marker Near User</button>
        {userLocation && (
          <MapContainer
            center={center}
            zoom={16}
            className="MapContainer"
            bounds={bounds}
            style={{ height: "90vh" }}
            minZoom={6}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup chunkedLoading>
              {samplemarkers.map((sampleMarker, index) => (
                <Marker
                  position={sampleMarker.geocode}
                  icon={firehere}
                  key={index}
                >
                  <Popup>{sampleMarker.popUp}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
            {showUserLocation && (
              <Marker position={userLocation} icon={iamhere}>
                <Popup>Your Location</Popup>
              </Marker>
            )}
            
            {newMarkerLocation && (
              <Marker position={newMarkerLocation} icon={wildfirehere}>
                <Popup>New Marker Near User</Popup>
              </Marker>
            )}
            <FormData />
          </MapContainer>
        )}
      </div>
    </>
  );
};

export default styled(MapNew)`
  .custom-cluster-icon {
    background: red;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
`;
