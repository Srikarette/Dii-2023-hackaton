import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import FormData from "./FormData";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const MapNew = ({ className }) => {
  const southwestBound = L.latLng(5, 90);
  const northeastBound = L.latLng(25, 120);
  const bounds = L.latLngBounds(southwestBound, northeastBound);

  const samplemarkers = [
    {
      geocode: [13.7564, 100.5018],
      popUp: "Hello, I'm mark1",
    },
    {
      geocode: [13.76, 100.5018],
      popUp: "Hello, I'm mark2",
    },
  ];

  const firehere = new L.Icon({
    iconUrl: require("../assets/fire.png"), // Make sure this URL is correct
    iconSize: [38, 38],
  });

  const [position, setPosition] = useState([0, 0]);

  useEffect(() => {
    // Use the browser's Geolocation API to get the user's location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        const { latitude, longitude } = location.coords;
        setPosition([latitude, longitude]);
      });
    }
  }, []);

  return (
    <>
      <div className={className}>
        <MapContainer
          center={[13.7563, 100.5018]}
          zoom={13}
          minZoom={6}
          bounds={bounds}
          scrollWheelZoom={true}
          style={{ height: "90vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
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
          <FormData />
        </MapContainer>
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
