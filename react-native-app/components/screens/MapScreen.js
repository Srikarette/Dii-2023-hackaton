import React, { useState, useEffect, useRef} from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { Circle, Marker, PROVIDER_GOOGLE,enableLatestRenderer } from 'react-native-maps';
import { Text, StyleSheet, View, Dimensions, Button, TouchableOpacity, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
MapView.setWebApiKey('AIzaSyDZzEZFih1r4Y-B1J1m6nhsuGu1WT-Vylo');
enableLatestRenderer();


export default function MapScreen() {
  const pinTimer = 3600000; // millisecound
  const emergencyCooldown = 10000 //millisecound
  const navigation = useNavigation();

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [mapRegion, setMapRegion] = useState({
    latitude: 13.7563,
    longitude: 100.5018,
    latitudeDelta: 0.08,
    longitudeDelta: 0.08,
  });

  const [isCircleVisible, setIsCircleVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const statusRadius = 2000; // 1 meter
  const circleRadius = 1000; // 4 kilometers

  const [selectedChoice, setSelectedChoice] = useState(null);
  const choices = ['Fire', 'Flood', 'Land Slide', 'Active Shooting'];

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
      case 'Fire':
        return 'rgba(255, 0, 0, 0.3)'; // Red
      case 'Flood':
        return 'rgba(0, 0, 255, 0.3)'; // Blue
      case 'Land Slide':
        return 'rgba(0, 255, 0, 0.3)'; // Green
      case 'Active Shooting':
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
      const hasPinsLeft = data.length > 0; // Check if there are pins in the data
      // console.log(data.length)
      if (hasPinsLeft) {
        // Send a notification if there are pins left
        schedulePushNotification();
      }
  
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
      setRefreshKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  

  const postUserLocation = async (latitude, longitude, category) => {
    try {
      const response = await fetch('https://generous-snail-nearby.ngrok-free.app/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude,
          longitude,
          category,
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
      setDescription(`Emergency Alert: ${selectedChoice}!`);
  
      setTimeout(() => {
        setIsCircleVisible(false);
        setEmergencySent(false);
        setDisableButton(false);
        setSelectedChoice(null);
        setDescription('Your Location');
      }, emergencyCooldown);
  
      postUserLocation(mapRegion.latitude, mapRegion.longitude, selectedChoice); // Include the "selectedChoice" as the "category"
      console.log('Post current user location complete');
      console.log(`Post:`, mapRegion.latitude, mapRegion.longitude, `from the current user into the database with category: ${selectedChoice}`);
      setDisableButton(true);
      setRefreshKey((prevKey) => prevKey + 1);
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
    <View style={styles.container} key={refreshKey} >
      <MapView style={styles.map} region={mapRegion} provider={PROVIDER_GOOGLE}>
        {/* Marker for user's current location */}
        <Marker
          coordinate={mapRegion}
          title='Your Location'
          description={description}
          image={require ('../map-icon/icons8-location-96.png')}
        />

        {markers.map((markerData) => (
          <React.Fragment key={markerData.id}>
            <Marker
              coordinate={{ latitude: markerData.latitude, longitude: markerData.longitude }}
              title={`EMRGENCY : ${markerData.category}`}
              description={`Sent at: ${markerData.sent_at}, Marker #${markerData.id} `}
              pinColor="red"
              image={(() => {
                switch (markerData.category) {
                  case 'Fire':
                    return require('../map-icon/fire.png'); 
                  case 'Flood':
                    return require('../map-icon/flood.png'); 
                  case 'Land Slide':
                    return require('../map-icon/landslide.png'); 
                  case 'Active Shooting':
                    return require('../map-icon/criminal.png'); 
                  default:
                    return require('../map-icon/default.png');
                }
              })()}
              style={{ width: 40, height: 40 }}
            />
            {/* <Circle
              radius={circleRadius}
              center={{ latitude: markerData.latitude, longitude: markerData.longitude }}
              title='Circle'
              strokeColor='red'
              strokeWidth={0}
              fillColor='rgba(255, 0, 0, 0.3)' 
            /> */}
          </React.Fragment>
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

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Emergency Alert !📬",
      body: 'There are emergency nearby check out!',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}
