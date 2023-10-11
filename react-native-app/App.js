import React, { useState, useEffect } from 'react';
import MapView, { Circle, Marker } from 'react-native-maps';
import { Text, StyleSheet, View, Dimensions, Button, TouchableOpacity, ScrollView } from 'react-native';
import * as Location from 'expo-location';

export default function Map() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });

  const [isCircleVisible, setIsCircleVisible] = useState(false);
  const statusRadius = 2000; // 1 per 1 meter

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
    console.log(location.coords.latitude, location.coords.longitude);
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

  const handleEmergencyPress = () => {
    if (selectedChoice) {
      setIsCircleVisible(true);
      setEmergencySent(true);
      setDescription(`Emergency Alert:  ${selectedChoice} !`);
      
      setTimeout(() => {
        setIsCircleVisible(false);
        setEmergencySent(false);
        setDisableButton(false);
        setDescription('Your Location')
      }, 3600);
       // 1 hours = 3600000 millisecound
      setDisableButton(true);
    }
  };

  useEffect(() => {
    userLocation();
    setIsCircleVisible(false);
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={mapRegion}>
        <Marker 
        coordinate={mapRegion} 
        title='Your Location' 
        description={description}
        // image={require('./path/to/custom-marker.png')}
        pinColor="blue" // Change the pin color
        />

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
