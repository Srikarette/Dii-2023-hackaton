import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import React from "react";
import L from "leaflet";
import Navbar from "./Navbar";

const MapNew = () => {
  const southwestBound = L.latLng(5, 90); // Define the southwest corner of the allowed area
  const northeastBound = L.latLng(25, 120); // Define the northeast corner of the allowed area
  const bounds = L.latLngBounds(southwestBound, northeastBound); // Create a bounds object
  return (
    <>

      <MapContainer
        center={[13.7563, 100.5018]}
        zoom={6}
        bounds={bounds}
        scrollWheelZoom={true}
        style={{ height: "100vh" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[13.7563, 100.5018]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export default MapNew;
