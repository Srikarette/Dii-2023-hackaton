import { Layer } from "leaflet";
import React from "react";
import { TileLayer, LayersControl } from "react-leaflet";

const BaseMap = () => {
  return (
    <LayersControl position="topright">
      <LayersControl.BaseLayer name="Default" checked>
        <TileLayer url="https://tile.openstreetmap.de/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="Anime">
        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
      </LayersControl.BaseLayer>
      <LayersControl.BaseLayer name="sandbox">
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg"
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
      </LayersControl.BaseLayer>
    </LayersControl>
  );
};

export default BaseMap;
