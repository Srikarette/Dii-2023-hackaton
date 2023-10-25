import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
  Circle,
} from "react-leaflet";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import BaseMap from "./StyleofMap/BaseMap";
import CSVFileLocal from "./StyleofMap/CSVFileLocal";
import "leaflet/dist/leaflet.css";

import fetchNotifications from "./StyleofMap/fetchNotifications";

const MapNew = () => {
  const initialCenter = [13.7563, 100.5018];
  const initialZoomLevel = 6;

  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [zoom, setZoom] = useState(initialZoomLevel);
  const [center, setCenter] = useState(initialCenter);

  const titleOptions = ["", "fire", "wildfire", "flood"];
  const bounds = L.latLngBounds(L.latLng(5, 90), L.latLng(25, 120));

  const [fetchedData, setFetchedData] = useState([]);
  const [position, setPosition] = useState(null);
  const [form, setForm] = useState({
    lat: 0,
    lng: 0,
    category: "",
  });
  const samplemarkers = [
    {
      geocode: [13.7563, 100.5018],
      popUp: "Hello, I'm mark1",
    },
    {
      geocode: [13.7563, 100.5018],
      popUp: "Hello, I'm mark2",
    },
  ];

  useEffect(() => {
    fetchUserLocation();
    fetchDataFromAPI();
  }, []);

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

  const fetchDataFromAPI = async () => {
    try {
      const data = await fetchNotifications();
      setFetchedData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleGoToUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setCenter([latitude, longitude]);
        setZoom(16);
        setShowUserLocation(!showUserLocation);
      });
    } else {
      alert("Geolocation is not supported in your browser.");
    }
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

  const createCustomIcon = (iconUrl, iconSize) => {
    return new L.Icon({
      iconUrl: require(`../assets/${iconUrl}`),
      iconSize,
    });
  };

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePostMarker(form.category, form.lat, form.lng);
  };

  const handlePostMarker = async (category, latitude, longitude) => {
    try {
      const response = await axios.post("http://localhost:8090/notifications", {
        category: category,
        latitude: latitude,
        longitude: longitude,
      });

      if (response.status === 200) {
        console.log("Data posted successfully");
      } else {
        console.error("Failed to post data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteMarker = (notificationId) => {
    axios
      .delete(`http://localhost:8090/notifications/${notificationId}`)
      .then((response) => {
        // Handle success, such as removing the marker from the map
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const groupedMarkers = fetchedData.reduce((grouped, dataItem) => {
    if (!grouped[dataItem.category]) {
      grouped[dataItem.category] = [];
    }
    grouped[dataItem.category].push(dataItem);
    return grouped;
  }, {});

  return (
    <>
      <div className="flex">
        {userLocation && (
          <MapContainer
            center={center}
            zoom={16}
            className="MapContainer"
            bounds={bounds}
            style={{ height: "89vh", width: "87%" }}
            minZoom={6}
          >
            <LocationMarker />
            <BaseMap />
            <CSVFileLocal />
            {Object.keys(groupedMarkers).map((category, index) => (
              <MarkerClusterGroup
                key={index}
                maxClusterRadius={0.5}
                chunkedLoading
              >
                {groupedMarkers[category].map((dataItem, markerIndex) => {
                  let markerIcon = createCustomIcon("fire.png", [38, 38]);

                  if (category === "wildfire") {
                    markerIcon = createCustomIcon("wildfire.png", [38, 38]);
                  } else if (category === "flood") {
                    markerIcon = createCustomIcon("flood.png", [38, 38]);
                  }

                  return (
                    <Marker
                      key={markerIndex}
                      position={[dataItem.latitude, dataItem.longitude]}
                      icon={markerIcon}
                    >
                      <Popup>
                        <div>
                          <p>ID: {dataItem.id}</p>
                          <p>Category: {dataItem.category}</p>
                          <p>Latitude: {dataItem.latitude}</p>
                          <p>Longitude: {dataItem.longitude}</p>
                          <p>Sent At: {dataItem.sent_at}</p>
                          <button className="border-2 border-blue-500 rounded-lg p-1 bg-blue-500 text-yellow-200 mr-4">
                            Update
                          </button>
                          <button
                            onClick={() => handleDeleteMarker(dataItem.id)}
                            className="border-2 border-rose-500 rounded-lg p-1 bg-red-500 text-yellow-100"
                          >
                            Delete
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MarkerClusterGroup>
            ))}
            {showUserLocation && (
              <Marker
                position={userLocation}
                icon={createCustomIcon("raise-hand.png", [40, 40])}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}
          </MapContainer>
        )}
        <form
          className="bg-white shadow-md rounded px-4 py-2"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-semibold"
            >
              Category:
            </label>
            <select
              name="category"
              id="category"
              onChange={handleOnChange}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
            >
              {titleOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
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
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MapNew;
