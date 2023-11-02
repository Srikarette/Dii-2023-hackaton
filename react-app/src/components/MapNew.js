import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
  Circle,
  useMap,
  TileLayer,
} from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import MarkerClusterGroup from "react-leaflet-cluster";
import CSVFileLocal from "./StyleofMap/CSVFileLocal";
import "leaflet/dist/leaflet.css";
//For backend test
import { fetchAllNotifications } from "./functions/fetchNotifications";
import Formedit from "./Form/Formedit";
import CombineLayers from "./layers/CombineLayers";

const MapNew = () => {
  const initialCenter = [13.7563, 100.5018];
  const initialZoomLevel = 6;
  const mapRef = useRef(); // Create a ref to store the map instance

  const [userLocation, setUserLocation] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(false);
  const [zoom, setZoom] = useState(initialZoomLevel);
  const [center, setCenter] = useState(initialCenter);

  const titleOptions = ["Fire", "Flood", "Land Slide", "Active Shooting"];
  const bounds = L.latLngBounds(L.latLng(5, 90), L.latLng(25, 120));

  const [fetchedData, setFetchedData] = useState([]);
  const [position, setPosition] = useState(null);
  const [form, setForm] = useState({
    lat: 0,
    lng: 0,
    category: "",
  });
  const [data, setData] = useState([]);
  let DefaultIcon = L.icon({
    iconUrl: icon,
  });
  //For Edit button
  const [id, setId] = useState(null);
  const [drag, setDrag] = useState(false);
  const [edit, setEdit] = useState(false);

  L.Marker.prototype.options.icon = DefaultIcon;

  // Create a state variable to hold the marker data
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetchUserLocation();
    fetchDataFromAPI();
  }, []);
  const loaddata = () => {
    fetchDataFromAPI()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  // FETCH USER LOCATION
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

  // Fetch data from Spring boot 8090
  const fetchDataFromAPI = async () => {
    try {
      const data = await fetchAllNotifications();
      setFetchedData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
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
      <Marker
        position={position}
        icon={createCustomIcon("problem.png", [38, 38])}
      >
        <Popup>Ready for Marked</Popup>
      </Marker>
    );
  }

  // Pull Icon from assets
  const createCustomIcon = (iconUrl, iconSize) => {
    return new L.Icon({
      iconUrl: require(`../assets/${iconUrl}`),
      iconSize,
    });
  };

  // Write in form
  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Group Markers
  const groupedMarkers = fetchedData.reduce((grouped, dataItem) => {
    if (!grouped[dataItem.category]) {
      grouped[dataItem.category] = [];
    }
    grouped[dataItem.category].push(dataItem);
    return grouped;
  }, {});

  const selectedCategory = form.category; // Store the selected category

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handlePostMarker(form.category, form.lat, form.lng);

    // Create a new marker data
    const newMarker = {
      id: Date.now(), // You can use a unique identifier for the marker
      category: form.category,
      latitude: form.lat,
      longitude: form.lng,
      sent_at: new Date().toISOString(), // Add timestamp or use your actual timestamp
    };

    // Update the markers state with the new marker data
    setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

    // Clear the form
    setForm({
      lat: 0,
      lng: 0,
      category: "",
    });
    loaddata();
  };

  const flyto = (lat, lng) => {
    console.log(lat, lng);
    mapRef.current.flyTo([lat, lng], 15);
  };

  // Handle posting a new marker to the server
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

  // Handle deleting a marker
  const handleDeleteMarker = (notificationId) => {
    loaddata();
    axios
      .delete(`http://localhost:8090/notifications/${notificationId}`)
      .then((response) => {
        // Handle success, such as removing the marker from the map
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //Handle edit
  const handleEdit = (id, category, lat, lng) => {
    flyto(lat, lng);
    setId(id);
    setDrag(true); // Enable marker dragging

    setEdit(true);
  };
  const handleSubmitEdit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    // Send the updated marker data to the server here
    // For example, you can use an Axios POST request
    axios
      .patch(`http://localhost:8090/notifications/${id}`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((response) => {
        // Handle success
        if (response.status === 200) {
          console.log("Data updated successfully");
        }
      })
      .catch((error) => {
        // Handle error

        console.error("Failed to update data:", error);
      });
  };

  const handleDragend = (e) => {
    const newLat = e.target.getLatLng().lat;
    const newLng = e.target.getLatLng().lng;

    setForm({
      ...form,
      lat: newLat,
      lng: newLng,
    });
    updateArrayData(id, newLat, newLng);
  };

  const updateArrayData = (id, lat, lng) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === id ? { ...item, lat, lng } : item))
    );
  };
  // Handle cancel
  const handleCancel = () => {
    setEdit(false);
    setId(null);
  };

  return (
    <>
      <div className="flex">
        {userLocation && (
          <MapContainer
            center={center}
            zoom={16}
            ref={mapRef} // Assign the map instance to the ref
            className="MapContainer"
            bounds={bounds}
            style={{ height: "89vh", width: "87%" }}
            minZoom={6}
          >
            <CombineLayers />
            <LocationMarker />
            <CSVFileLocal />
            {Object.keys(groupedMarkers).map((category, index) => (
              <MarkerClusterGroup
                key={index}
                maxClusterRadius={50}
                chunkedLoading
              >
                {groupedMarkers[category].map((dataItem, markerIndex) => {
                  let markerIcon = createCustomIcon("fire.png", [38, 38]);

                  if (category === "Flood") {
                    markerIcon = createCustomIcon("flood.png", [38, 38]);
                  } else if (category === "Land Slide") {
                    markerIcon = createCustomIcon("landslide.png", [38, 38]);
                  } else if (category === "Active Shooting") {
                    markerIcon = createCustomIcon("criminal.png", [38, 38]);
                  }

                  return (
                    <Marker
                      eventHandlers={{
                        dragend: handleDragend,
                      }}
                      draggable={id === dataItem.id ? drag : false}
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
                          <button
                            onClick={() =>
                              handleEdit(
                                dataItem.id,
                                dataItem.category,
                                dataItem.latitude,
                                dataItem.longitude
                              )
                            }
                            className="border-2 border-blue-500 rounded-lg p-1 bg-blue-500 text-yellow-200 mr-4"
                          >
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
            {/* Render newly added markers */}
            {markers.map((newMarker, markerIndex) => {
              let markerIcon = createCustomIcon("fire.png", [38, 38]);

              if (newMarker.category === "flood") {
                markerIcon = createCustomIcon("flood.png", [38, 38]);
              } else if (newMarker.category === "Land Slide") {
                markerIcon = createCustomIcon("landslide.png", [38, 38]);
              } else if (newMarker.category === "Active Shooting") {
                markerIcon = createCustomIcon("criminal.png", [38, 38]);
              }

              return (
                <Marker
                  key={markerIndex}
                  position={[newMarker.latitude, newMarker.longitude]}
                  icon={markerIcon}
                  eventHandlers={{
                    dragend: handleDragend,
                  }}
                  draggable={id === newMarker.id ? drag : false}
                >
                  <Popup>
                    <div>
                      <p>ID: {newMarker.id}</p>
                      <p>Category: {newMarker.category}</p>
                      <p>Latitude: {newMarker.latitude}</p>
                      <p>Longitude: {newMarker.longitude}</p>
                      <p>Sent At: {newMarker.sent_at}</p>
                      <button className="border-2 border-blue-500 rounded-lg p-1 bg-blue-500 text-yellow-200 mr-4">
                        Update
                      </button>
                      <button
                        onClick={() => handleDeleteMarker(newMarker.id)}
                        className="border-2 border-rose-500 rounded-lg p-1 bg-red-500 text-yellow-100"
                      >
                        Delete
                      </button>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
        {edit ? (
          <Formedit
            titleOptions={titleOptions}
            handleOnChange={handleOnChange}
            handleCancel={handleCancel}
            id={id}
            form={form}
            setForm={setForm}
            handleSubmitEdit={handleSubmitEdit}
          />
        ) : (
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
                onChange={(e) => handleOnChange(e)}
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
                onChange={(e) => handleOnChange(e)}
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
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default MapNew;
