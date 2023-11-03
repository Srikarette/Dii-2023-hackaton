import React from "react";
import { GeoJSON } from "react-leaflet";
import thlocation from "../geolocation/thailand.json";

const ProvinceTH = () => {
  const styleProvince = {
    color: "blue",
    fillColor: "green",
    fillOpacity: "0.3",
    weight: "0.4",
  };
  return (
    <>
      <GeoJSON data={thlocation} style={styleProvince} />
    </>
  );
};

export default ProvinceTH;
