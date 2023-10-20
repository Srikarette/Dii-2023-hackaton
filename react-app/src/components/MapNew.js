import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import React from "react";
import L, { Icon } from "leaflet"; // Remove the import of 'marker' here
import Navbar from "./Navbar";

const MapNew = () => {
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

  const firehere = new Icon({
    iconUrl: require("../assets/fire.png"),
    iconSize: [38, 38],
  });
  return (
    <>
      <MapContainer
        center={[13.7563, 100.5018]}
        zoom={13}
        bounds={bounds}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {samplemarkers.map((sampleMarker) => (
          <Marker position={sampleMarker.geocode} icon={firehere}>
            <Popup>{sampleMarker.popUp}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapNew;
