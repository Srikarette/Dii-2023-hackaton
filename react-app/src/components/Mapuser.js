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
            style={{ height: "89vh", width: "100%" }}
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
                      key={markerIndex}
                      position={[dataItem.latitude, dataItem.longitude]}
                      icon={markerIcon}
                    >
                      <Popup>
                        <div>
                          <p>Category: {dataItem.category}</p>
                          <p>Latitude: {dataItem.latitude}</p>
                          <p>Longitude: {dataItem.longitude}</p>
                          <p>Sent At: {dataItem.sent_at}</p>
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
                >
                  <Popup>
                    <div>
                      <p>Category: {newMarker.category}</p>
                      <p>Latitude: {newMarker.latitude}</p>
                      <p>Longitude: {newMarker.longitude}</p>
                      <p>Sent At: {newMarker.sent_at}</p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        )}
      </div>
    </>
  );
};

export default MapNew;
