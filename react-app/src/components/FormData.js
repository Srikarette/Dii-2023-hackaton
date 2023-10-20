import React from "react";
import { useMapEvent } from "react-leaflet";

const FormData = () => {
  const map = useMapEvent({
    click(e) {
      console.log(e);
    },
  });
  return null;
};

export default FormData;
