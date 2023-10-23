import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { Marker } from "react-leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

const CSVFileLocal = () => {
  const [airport, setAirport] = useState(null);
  let DefaultIcon = L.icon({
    iconUrl: require("../../assets/airport.png"),
    shadowUrl: iconShadow,
    iconSize: [20, 20],
    iconAnchor: [12.5, 20.5],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    //code
    fetchAirport();
  }, []); //add array for block infinity loop

  const fetchAirport = async () => {
    const file = require("../../assets/Airport.csv");
    const res = await fetch(file);
    // console.log("Show Response", res);

    const text = await res.text();
    // console.log("Show Text", text);

    const json = Papa.parse(text, { header: true }).data;
    // console.log("Show Json", json);

    const filterAirport = json.filter(
      (item) => item.long !== "" && item.lat !== ""
    ); //กรอง data เก็บไว้ใน item
    setAirport(filterAirport);
  };
  return airport
    ? airport.map((item, index) => (
        <Marker key={index} position={[item.lat, item.long]}></Marker>
      ))
    : null; // lat ก่อน long
};

export default CSVFileLocal;
