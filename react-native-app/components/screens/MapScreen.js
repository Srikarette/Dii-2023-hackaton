import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { Text, StyleSheet, View, Dimensions, Button, TouchableOpacity, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';

export default function MapScreen() {
  const pinTimer = 5000; // millisecound
  const emergencyCooldown = 10000 //millisecound
  const navigation = useNavigation();

  const [mapRegion, setMapRegion] = useState({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });

  const [isCircleVisible, setIsCircleVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const statusRadius = 2000; // 1 meter
  const circleRadius = 4000; // 4 kilometers

  const [selectedChoice, setSelectedChoice] = useState(null);
  const choices = ['FIRE', 'FLOOD', 'LAND SLIDE', 'ACTIVE SHOOTING'];

  const [emergencySent, setEmergencySent] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [description, setDescription] = useState('Your Location');

  const [showChoices, setShowChoices] = useState(false);



  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access Location denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    });
    console.log('Current user location', location.coords.latitude, location.coords.longitude);
  }

  const getColorForChoice = (choice) => {
    switch (choice) {
      case 'FIRE':
        return 'rgba(255, 0, 0, 0.3)'; // Red
      case 'FLOOD':
        return 'rgba(0, 255, 0, 0.3)'; // Green
      case 'LAND SLIDE':
        return 'rgba(0, 0, 255, 0.3)'; // Blue
      case 'ACTIVE SHOOTING':
        return 'rgba(255, 255, 0, 0.3)'; // Yellow
      default:
        return 'transparent';
    }
  };

  const fetchData = async () => {
    try {
      console.log('Start fetching')
      const response = await fetch('https://generous-snail-nearby.ngrok-free.app/notifications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Fetch data complete')
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      // console.log('Fetched Data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };
  
  
  const fetchNotifications = async () => {
    try {
      const data = await fetchData();
      // Add a circle property to each marker
      data.forEach((marker) => {
        marker.circle = {
          radius: circleRadius,
          fillColor: getColorForChoice(marker.event), // Adjust this as needed
        };
        marker.displayUntil = Date.now() + pinTimer;
      });

      // Log a message when the display time runs out for each marker
      data.forEach((marker) => {
        setTimeout(() => {
          console.log(`Pin at latitude ${marker.latitude}, longitude ${marker.longitude} has disappeared`);
        }, marker.displayUntil - Date.now());
      });

      setMarkers(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const postUserLocation = async (latitude, longitude) => {
    try {
      const response = await fetch('https://generous-snail-nearby.ngrok-free.app/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude,
          longitude,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Response from server:', data); 
  
    } catch (error) {
      console.error('Error posting user location:', error);
    }
  };
  

  const handleEmergencyPress = () => {
   
    if (selectedChoice) {
      setIsCircleVisible(true);
      setEmergencySent(true);
      setDescription(`Emergency Alert:  ${selectedChoice} !`);
      
      setTimeout(() => {
        setIsCircleVisible(false);
        setEmergencySent(false);
        setDisableButton(false);
        setSelectedChoice(null);
        setDescription('Your Location');
        
        // navigation.replace('MapScreen'); 
      }, emergencyCooldown);
      
      postUserLocation(mapRegion.latitude, mapRegion.longitude);
      console.log('Post current user location complete');
      console.log(`Post :`, mapRegion.latitude, mapRegion.longitude, `from current user into the database`);
      setDisableButton(true);
    }
  };

  useEffect(() => {
    userLocation();
    setIsCircleVisible(false);
    fetchNotifications();
    // Use a timer to periodically check and remove expired markers
    const timer = setInterval(() => {
      const currentTime = Date.now();
      setMarkers((prevMarkers) => prevMarkers.filter((marker) => marker.displayUntil >= currentTime));
    }, 1000); // Check every second
    return () => clearInterval(timer); // Cleanup the timer
  }, []);

  return (
    <View style={styles.container}>
        <MapView style={styles.map} region={mapRegion}>
        {/* Marker for user's current location */}
        <Marker
          coordinate={mapRegion}
          title='Your Location'
          description={description}
          pinColor="blue"
        />

        {/* Map over the fetched markers and create Marker components */}
        {markers.map((markerData) => (
          <Marker
            key={markerData.id}
            coordinate={{ latitude: markerData.latitude, longitude: markerData.longitude }}
            title={`Notification #${markerData.id}`}
            description={`Sent at: ${markerData.sent_at}`}
            pinColor="green"
          />
        ))}

        {isCircleVisible && (
          <Circle
            radius={statusRadius}
            center={mapRegion}
            title='Circle'
            strokeColor='red'
            strokeWidth={0}
            fillColor={getColorForChoice(selectedChoice)}
          />
        )}
      </MapView>

      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setShowChoices(!showChoices)}
        disabled={emergencySent}
      >
        <Text>{selectedChoice || 'Select a choice'}</Text>
      </TouchableOpacity>

      {showChoices && (
        <ScrollView style={styles.choices}>
          {choices.map((choice, index) => (
            <TouchableOpacity
              key={choice}
              style={styles.choice}
              onPress={() => {
                setSelectedChoice(choice);
                setShowChoices(false);
              }}
            >
              <Text>{choice}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <View>
        <Button
          color="red"
          title={emergencySent ? 'EMERGENCY SENT' : 'EMERGENCY'}
          onPress={handleEmergencyPress}
          disabled={emergencySent || !selectedChoice || disableButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '85%',
  },
  dropdownButton: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
  },
  choices: {
    position: 'absolute',
    top: 90,
    left: 20,
    width: 150, // Adjust the width as needed
    maxHeight: 200, // Limit the height to avoid overflowing the screen
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightgray',
    zIndex: 1, // Place the choices above other content
  },
  choice: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});
