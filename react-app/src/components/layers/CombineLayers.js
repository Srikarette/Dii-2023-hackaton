import React from "react";
import { LayersControl, LayerGroup, TileLayer } from "react-leaflet";
import ProvinceTH from "./ProvinceTH";

const CombineLayers = () => {
  return (
    <>
      <LayersControl position="topright">
        {/* Layer1 */}
        <LayersControl.Overlay name="basemap" checked>
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Thailand">
          <ProvinceTH />
        </LayersControl.Overlay>
      </LayersControl>
    </>
  );
};

export default CombineLayers;
