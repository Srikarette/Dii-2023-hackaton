import React, { useEffect, useState, useRef } from "react";
import { MapContainer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { create, list, remove } from "./functions/travel";
import { FloatButton } from "antd";
import { ZoomInOutlined, DeleteOutlined } from "@ant-design/icons";
import { GrDocumentUpdate } from "react-icons/gr";
import CombineLayers from "./layers/CombineLayers";
import MarkerClusterGroup from "react-leaflet-cluster";

const Mapcontent = () => {
  const [position, setPosition] = useState(null);
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ Category: "", lat: 0, lng: 0 });
  const [showTable, setShowTable] = useState(false);
  const [slideAnimation, setSlideAnimation] = useState(false);
  const initialCenter = [13.7563, 100.5018];
  const initialZoomLevel = 6;
  const [zoom, setZoom] = useState(initialZoomLevel);
  const [center, setCenter] = useState(initialCenter);
  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  const createCustomIcon = (iconUrl, iconSize) => {
    return new L.Icon({
      iconUrl: require(`../assets/${iconUrl}`),
      iconSize,
    });
  };

  L.Marker.prototype.options.icon = DefaultIcon;

  useEffect(() => {
    fetchUserLocation();
    loadData();
  }, []);

  const loadData = () => {
    list()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

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
      <Marker
        position={position}
        icon={createCustomIcon("problem.png", [38, 38])}
      >
        <Popup>Ready for Marked</Popup>
      </Marker>
    );
  }

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleRemove = (id) => {
    remove(id)
      .then((res) => {
        console.log(res);
        loadData();
      })
      .catch((err) => console.log(err));
  };

  function toggleTable() {
    setShowTable(!showTable);
    setSlideAnimation(true);
  }

  const zoomtoLocation = (lat, lng) => {
    mapRef.current.flyTo([lat, lng], 14);
  };

  const fetchUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setCenter([latitude, longitude]);
        setZoom(16);
        setShowUserLocation(true);
      });
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  };

  function getMarkerIcon(category) {
    const iconMappings = {
      Fire: "fire.png",
      Flood: "flood.png",
      "Land Slide": "landslide.png",
      "Active Shooting": "criminal.png",
    };

    if (category in iconMappings) {
      return createCustomIcon(iconMappings[category], [38, 38]);
    } else {
      return createCustomIcon("default.png", [38, 38]);
    }
  }

  return (
    <div className="flex">
      {userLocation && (
        <MapContainer
          ref={mapRef}
          center={center}
          zoom={16}
          style={{ height: "89vh", width: "90%", zIndex: "10" }}
          minZoom={6}
        >
          {showUserLocation && (
            <Marker
              position={userLocation}
              icon={createCustomIcon("raise-hand.png", [38, 38])}
            >
              <Popup>Your Location</Popup>
            </Marker>
          )}
          <CombineLayers />
          <LocationMarker />
          <MarkerClusterGroup
            animate={true}
            maxClusterRadius={50}
            chunkedLoading
          >
            {data
              ? data.map((item, index) =>
                  item.lat && item.lng ? (
                    <Marker
                      position={[item.lat, item.lng]}
                      key={index}
                      eventHandlers={{
                        click: () => zoomtoLocation(item.lat, item.lng),
                      }}
                      icon={getMarkerIcon(item.Category)}
                    >
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
          </MarkerClusterGroup>
        </MapContainer>
      )}

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
            <option value="Land Slide">Land Slide</option>
            <option value="Active Shooting">Active Shooting</option>
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
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Latitude
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Longitude
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Zoom to
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Update
              </th>
              <th
                scope="col"
                className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.Category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.lat}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.lng}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ZoomInOutlined
                    className="cursor-pointer"
                    onClick={() => zoomtoLocation(item.lat, item.lng)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                  <GrDocumentUpdate />
                </td>
                <td className="px-6 py-4 whitespace-nowrap cursor-pointer">
                  <DeleteOutlined
                    className="text-red-700"
                    onClick={() => handleRemove(item._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Mapcontent;
