import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet } from 'react-native';

export default function MapComponent() {
  const initialRegion = {
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 6,
    longitudeDelta: 6,
  };

  const [userLocation, setUserLocation] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [showDangerZone, setShowDangerZone] = useState(false);
  const [dangerZoneRadius, setDangerZoneRadius] = useState(1000);

  useEffect(() => {
    async function fetchUserLocation() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });
        setMapReady(true);
      } else {
        alert('Location permission denied.');
      }
    }

    fetchUserLocation();
  }, []);

  const handleGoToUserLocation = () => {
    if (userLocation) {
      setMapReady(true);
      setShowDangerZone(true);
    }
  };

  const handleRadiusChange = (text) => {
    const newRadiusInKilometers = parseFloat(text);
    const newRadiusInMeters = newRadiusInKilometers * 1000;
    setDangerZoneRadius(newRadiusInMeters);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        onMapReady={() => setMapReady(true)}
      >
        {showDangerZone && (
          <>
            <Circle
              center={userLocation}
              radius={dangerZoneRadius}
              fillColor="rgba(255,0,0,0.2)"
              strokeColor="red"
            />
            <Marker coordinate={userLocation} title="Your Location" pinColor="blue" />
          </>
        )}
      </MapView>
      <View style={styles.controls}>
        <Button title="Emergency Alert!" onPress={handleGoToUserLocation} />
        <View style={styles.radiusControl}>
          <Text>Set Danger Zone Radius (kilometers):</Text>
          <TextInput
            style={styles.radiusInput}
            keyboardType="numeric"
            onChangeText={handleRadiusChange}
            value={(dangerZoneRadius / 1000).toString()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  controls: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 4,
  },
  radiusControl: {
    flex: 1,
    marginLeft: 16,
  },
  radiusInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
  },
});
