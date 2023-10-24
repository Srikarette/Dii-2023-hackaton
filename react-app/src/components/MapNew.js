import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import L from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import LocationMarker from "./Hooks/LocationMarker";
import BaseMap from "./StyleofMap/BaseMap";
import CSVFileLocal from "./StyleofMap/CSVFileLocal";

import fetchNotifications from "./StyleofMap/fetchNotifications"; // Import the fetchNotifications function

const MapNew = ({ className }) => {
  const initialCenter = [13.7563, 100.5018]; // Thailand's coordinates
  const initialZoomLevel = 6; // Initial zoom level
  //For userLocation ------Here------
  const [userLocation, setUserLocation] = useState(null);
  const [zoom, setZoom] = useState(initialZoomLevel);
  const [center, setCenter] = useState(initialCenter);
  const [mapReady, setMapReady] = useState(false);

  const [showDangerZone, setShowDangerZone] = useState(false);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [dangerZoneRadius, setDangerZoneRadius] = useState(1000); // Default radius in meters (1 kilometer)

  //Set bounds map
  const southwestBound = L.latLng(5, 90);
  const northeastBound = L.latLng(25, 120);
  const bounds = L.latLngBounds(southwestBound, northeastBound);
  //Use for select options
  const [selectedOption, setSelectedOption] = useState("fire");
  const titleOptions = ["fire", "wildfire", "flood"];

  const [newMarkerLocation, setNewMarkerLocation] = useState(null);
  //fetched data from db spring
  const [fetchedData, setFetchedData] = useState([]);

  const [position, setPosition] = useState(null);
  //Set default mark
  const [form, setForm] = useState({
    lat: 0,
    lng: 0,
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
        setCenter([latitude, longitude]); // Set the center to the user's location
        setZoom(16); // Set a custom zoom level to zoom in on the user's location
        setShowDangerZone(!showDangerZone); // Show the danger zone
        setShowUserLocation(!showUserLocation);

        // Check the selected option
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
  // displayMakers from db
  const renderMarkers = () => {
    return fetchedData.map((dataItem, index) => (
      <Marker
        key={index}
        position={[dataItem.latitude, dataItem.longitude]}
      >
        <Popup>
          <div>
            <p>ID: {dataItem.id}</p>
            <p>Latitude: {dataItem.latitude}</p>
            <p>Longitude: {dataItem.longitude}</p>
            <p>Sent At: {dataItem.sent_at}</p>
            <button onClick={() => handleDeleteMarker(dataItem.id)}>
              Delete
            </button>
          </div>
        </Popup>
      </Marker>
    ));
  };
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
      <Marker position={position} icon={firehere}>
        <Popup>Ready for Marked</Popup>
      </Marker>
    );
  }
  // Log value in from
  const handleOnChange = (e) => {
    console.log(e.target.value);
    setForm({
      ...form, //คัดลอกข้้อมูลมาวางไว้ก่อน
      [e.target.name]: e.target.value,
    });
  };
  //submit data you want to db
  const handleSubmit = (e) => {
    e.preventDefault();
    postUserLocation(form.title, form.lat, form.lng);
  };
  //Start Crud operation
  //Post METHOD
  const postUserLocation = async (title, latitude, longitude) => {
    try {
      const response = await axios.post("http://localhost:8090/notifications", {
        title: title,
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

  return (
    <>
      <div className={className}>
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
            <label htmlFor="name" className="block text-gray-700 font-semibold">
              Title:
            </label>
            <select
              name="title"
              id="title"
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

export default styled(MapNew)`
  display: flex;
`;
