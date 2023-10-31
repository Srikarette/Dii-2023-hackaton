import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
  Circle,
} from "react-leaflet";
import BaseMap from "./StyleofMap/BaseMap";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { create, list } from "./functions/travel";
import { FloatButton } from "antd";

const Mapcontent = () => {
  const [position, setPosition] = useState(null);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ Category: "", lat: 0, lng: 0 }); // Initialize form state+
  const [showTable, setShowTable] = useState(false);
  const [slideAnimation, setSlideAnimation] = useState(false);
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;
  useEffect(() => {
    //code
    loadData();
  }, []);

  const loadData = () => {
    list()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  // Click for ready Marked

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        map.flyTo(e.latlng, 15);
        setPosition(e.latlng);
        setForm({
          ...form,
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      },
    });
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Ready for Marked</Popup>
      </Marker>
    );
  }

  // Write in form
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    create(form)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
    loadData();
  };
  function toggleTable() {
    setShowTable(!showTable);
    setSlideAnimation(true);
  }

  return (
    <div className="flex">
      <MapContainer
        center={[13, 100]}
        zoom={16}
        style={{ height: "89vh", width: "87%", zIndex: "10" }}
        minZoom={6}
      >
        <BaseMap />
        <LocationMarker />
        {data
          ? data.map((item) =>
              item.lat && item.lng ? (
                <Marker position={[item.lat, item.lng]} key={item._id}>
                  <Popup className="border-4 border-indigo-500/100 rounded-lg">
                    <div>
                      <p>Category: {item.Category}</p>
                      <p>Latitude: {item.lat}</p>
                      <p>Longitude: {item.lng}</p>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )
          : null}
      </MapContainer>

      <form
        className="bg-white shadow-md rounded px-4 py-2"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="Category"
            className="block text-gray-700 font-semibold"
          >
            Category:
          </label>
          <select
            name="Category"
            id="Category"
            onChange={handleOnChange}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Fire">Fire</option>
            <option value="Flood">Flood</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="latitude"
            className="block text-gray-700 font-semibold"
          >
            Latitude:
          </label>
          <input
            type="number"
            name="lat"
            value={form.lat}
            id="latitude"
            onChange={handleOnChange}
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="longitude"
            className="block text-gray-700 font-semibold"
          >
            Longitude:
          </label>
          <input
            type="number"
            value={form.lng}
            name="lng"
            onChange={handleOnChange}
            id="longitude"
            className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover-bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Submit
          </button>
          <FloatButton onClick={toggleTable} className="float-button" />
        </div>
      </form>
      <div
        className={`content-table ${showTable ? "visible" : ""} ${
          slideAnimation ? "slide-up" : ""
        }`}
      >
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                #
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                First
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Handle
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">1</td>
              <td className="px-6 py-4 whitespace-nowrap">Mark</td>
              <td className="px-6 py-4 whitespace-nowrap">Otto</td>
              <td className="px-6 py-4 whitespace-nowrap">@mdo</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mapcontent;
