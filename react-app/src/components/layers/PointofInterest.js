import React, { useEffect} from "react";
import chiangmai from "../geolocation/ChiangMai.json";
import { GeoJSON } from "react-leaflet";

const stylepoint = {
  color: "red",
};
const PointofInterest = () => {
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (err) => {
          console.log("Cannot get Location ", err);
        }
      );
    } else {
      console.log("Cannot get Location ");
    }
  };

  return (
    <>
      <GeoJSON data={chiangmai} style={stylepoint} />
    </>
  );
};

export default PointofInterest;
