import React, {useState, useEffect} from 'react';
import MapView,{Circle, Marker} from 'react-native-maps';
import { StyleSheet, View, Dimensions, Button } from 'react-native';
import * as Location from 'expo-location';

export default function Map() {
  const [mapRegion, setMapRegion] = useState({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  })

  const [isCircleVisible, setIsCircleVisible] = useState(false);
  const statusRadius = 1000; // 1 per 1 meters

  const userLocation = async () =>{
    let {status} = await Location.requestForegroundPermissionsAsync();
    if(status !== 'granted'){
      setErrorMsg('Permission to access Location denied')
      return;
    }
    
    let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
    console.log(location.coords.latitude, location.coords.longitude);
  }

  const handleEmergencyPress = () => {
    setIsCircleVisible(!isCircleVisible); // Toggle the visibility of the circle
  };
  

  useEffect(() => {
    userLocation();
    setIsCircleVisible(false)
  }, []);

  return (
    <View style={styles.container}>
      
      <MapView style={styles.map}
        region={mapRegion}
      >
        <Marker coordinate={mapRegion} title='Marker' />
        
        <Circle
          radius={statusRadius}
          center={mapRegion}
          title='Circle'
          strokeColor='red'
          strokeWidth={0} // You can adjust the strokeWidth as needed
          fillColor={isCircleVisible ? 'rgba(255, 0, 0, 0.3)' : 'transparent'} // Set the fill color based on visibility
        />

      </MapView>
      <View style={styles.buttonContainer}>
        <Button color="red" title='EMERGENCY' onPress={handleEmergencyPress}/>
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
    height: '96%',
  },
  buttonContainer: {
    height: '5%',
  },

});
