import React, { useEffect, useState } from "react";
import * as turf from "@turf/turf"; // To check you in point of interest and find coord
import chiangmai from "../geolocation/ChiangMai.json";
import { GeoJSON } from "react-leaflet";

const stylepoint = {
  color: "red",
};
const PointofInterest = () => {
  const [check, setCheck] = useState(null);
  useEffect(() => {
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const me = handleCheck(lat, lng, chiangmai); // Pass lat, lng, and chiangmai separately
          // console.log("I am here! " + me);
          // setCheck(me);
        },
        (err) => {
          console.log("Cannot get Location ", err);
        }
      );
    } else {
      console.log("Cannot get Location ");
    }
  };

  const handleCheck = (lat, lng, chiangmai) => {
    const isPoint = turf.point([lat, lng]);
    const checkIsLiveChiangMai = turf.booleanPointInPolygon(
      isPoint,
      chiangmai.geometry
    );
    return checkIsLiveChiangMai;
  };

  //   const finalStyle = check ? {}

  return (
    <>
      <GeoJSON data={chiangmai} style={stylepoint} />
    </>
  );
};

export default PointofInterest;
