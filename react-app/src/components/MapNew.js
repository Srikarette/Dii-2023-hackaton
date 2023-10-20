import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import React from "react";
import styled from "styled-components";
import L from "leaflet";
import "leaflet.markercluster";
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
import "react-leaflet-cluster"; // Import React-Leaflet-Cluster
import MarkerClusterGroup from "react-leaflet-cluster";
import Navbar from "./Navbar";

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
    iconUrl: require("../assets/fire.png"),
    iconSize: [38, 38],
  });

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
