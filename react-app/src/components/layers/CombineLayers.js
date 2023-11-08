import React from "react";
import { LayersControl, TileLayer } from "react-leaflet";
import ProvinceTH from "./ProvinceTH";
import PointofInterest from "./PointofInterest";

const CombineLayers = () => {
  return (
    <>
      <LayersControl position="topright">
        {/* Layer1 */}
        <LayersControl.Overlay name="basemap" checked>
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </LayersControl.Overlay>
        {/* Layer 2 */}
        <LayersControl.Overlay name="Thailand">
          <ProvinceTH />
        </LayersControl.Overlay>
        {/* Layer 3 */}
        <LayersControl.Overlay name="Chiang Mai">
          <PointofInterest />
        </LayersControl.Overlay>
      </LayersControl>
    </>
  );
};

export default CombineLayers;
