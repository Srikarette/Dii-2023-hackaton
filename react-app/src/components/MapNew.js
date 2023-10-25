import { MapContainer, Marker, Popup, useMapEvents } from "react-leaflet";
import React, { useEffect, useState } from "react";
import axios from "axios";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import BaseMap from "./StyleofMap/BaseMap";
import CSVFileLocal from "./StyleofMap/CSVFileLocal";
import "leaflet/dist/leaflet.css";

import fetchNotifications from "./StyleofMap/fetchNotifications"; // Import the fetchNotifications function

const MapNew = () => {
  const initialCenter = [13.7563, 100.5018]; // Thailand's coordinates
  const initialZoomLevel = 6; // Initial zoom level
  //For userLocation ------Here------
  const [userLocation, setUserLocation] = useState(null);
  const [zoom, setZoom] = useState(initialZoomLevel);
  const [center, setCenter] = useState(initialCenter);
  const [mapReady, setMapReady] = useState(false);

  const [showDangerZone, setShowDangerZone] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);

  //Set bounds map
  const southwestBound = L.latLng(5, 90);
  const northeastBound = L.latLng(25, 120);
  const bounds = L.latLngBounds(southwestBound, northeastBound);
  //Use for select options

  const titleOptions = ["", "fire", "wildfire", "flood"];

  //fetched data from db spring
  const [fetchedData, setFetchedData] = useState([]);

  const [position, setPosition] = useState(null);
  //Set default mark
  const [form, setForm] = useState({
    lat: 0,
    lng: 0,
    category: "", // Set the default category to an empty string
  });

  const fetchDataFromAPI = async () => {
    const data = await fetchNotifications();
    setFetchedData(data);
  };

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
  //Icons here
  const firehere = new L.Icon({
    iconUrl: require("../assets/fire.png"), // Make sure this URL is correct
    iconSize: [38, 38],
  });

  const wildfirehere = new L.Icon({
    iconUrl: require("../assets/wildfire.png"), // Make sure this URL is correct
    iconSize: [38, 38],
  });
  const floodhere = new L.Icon({
    iconUrl: require("../assets/flood.png"), // Make sure this URL is correct
    iconSize: [38, 38],
  });
  const thinking = new L.Icon({
    iconUrl: require("../assets/problem.png"), // Make sure this URL is correct
    iconSize: [38, 38],
  });

  const iamhere = new L.Icon({
    iconUrl: require("../assets/raise-hand.png"),
    iconSize: [40, 40],
  });

  // Function to handle clicking the "Go to My Location" button
  const handleGoToUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setCenter([latitude, longitude]);
        setZoom(16);
        setShowDangerZone(!showDangerZone);
        setShowUserLocation(!showUserLocation);
      });
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  };
  const fetchUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
        setCenter([latitude, longitude]);
        setZoom(16);
        setShowUserLocation(true);
        setMapReady(true); // Set map readiness to true
      });
    } else {
      alert("Geolocation is not supported in your browser.");
    }
  };
  useEffect(() => {
    fetchUserLocation();
    fetchDataFromAPI();
  }, []);

  // function click set latlng to form
  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        // console.log(e.latlng);
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
      <Marker position={position} icon={thinking}>
        <Popup>Ready for Marked</Popup>
      </Marker>
    );
  }
  // Log value in from
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  //submit data you want to db
  const handleSubmit = (e) => {
    e.preventDefault();
    handlePostMarker(form.category, form.lat, form.lng);
  };
  //Start Crud operation
  //Post METHOD
  const handlePostMarker = async (category, latitude, longitude) => {
    try {
      const response = await axios.post("http://localhost:8090/notifications", {
        category: category,
        latitude: latitude,
        longitude: longitude,
      });

      if (response.status === 200) {
        console.log("Data posted successfully");
        // You can add additional logic here to handle a successful post
      } else {
        console.error("Failed to post data:", response.statusText);
        // You can add error handling logic here
      }
    } catch (error) {
      console.error("Error:", error);
      // You can handle network or other errors here
    }
  };
  const handleUpdateMarker = async () => {
    axios.put();
  };

  const handleDeleteMarker = (notificationId) => {
    // Send a DELETE request to your server to delete the notification
    axios
      .delete(`http://localhost:8090/notifications/${notificationId}`)
      .then((response) => {
        // Handle success, such as removing the marker from the map
        response.status(200);
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };

  // displayMakers from db
  const renderMarkers = () => {
    return fetchedData.map((dataItem, index) => {
      let markerIcon = firehere; // Default icon

      if (dataItem.category === "wildfire") {
        markerIcon = wildfirehere; // Change icon for wildfire category
      } else if (dataItem.category === "flood") {
        markerIcon = floodhere;
      } else if (dataItem.category === "") {
      }
      return (
        <Marker
          key={index}
          position={[dataItem.latitude, dataItem.longitude]}
          icon={markerIcon}
        >
          <Popup>
            <div>
              <p>ID: {dataItem.id}</p>
              <p>Latitude: {dataItem.latitude}</p>
              <p>Longitude: {dataItem.longitude}</p>
              <p>Sent At: {dataItem.sent_at}</p>
              <button
                onClick={(e) => handleUpdateMarker()}
                className="border-2 border-blue-500 rounded-lg p-1 bg-blue-500 text-yellow-200 mr-4"
              >
                Update
              </button>
              <button
                onClick={() => handleDeleteMarker(dataItem.id)}
                className="border-2 border-rose-500 rounded-lg p-1 bg-red-500 text-yellow-100 "
              >
                Delete
              </button>
            </div>
          </Popup>
        </Marker>
      );
    });
  };

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
            <MarkerClusterGroup chunkedLoading>
              {samplemarkers.map((sampleMarker, index) => (
                <Marker
                  position={sampleMarker.geocode}
                  icon={firehere}
                  key={index}
                >
                  <Popup>{sampleMarker.popUp}</Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
            {showUserLocation && (
              <Marker position={userLocation} icon={iamhere}>
                <Popup>Your Location</Popup>
              </Marker>
            )}
            {renderMarkers()}
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
              onChange={(e) => handleOnChange(e)}
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
              onChange={(e) => setForm({ ...form, lat: e.target.value })}
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
              onChange={(e) => setForm({ ...form, lng: e.target.value })}
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
