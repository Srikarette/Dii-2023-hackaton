import React from 'react';
import { View, Text, SafeAreaView, Button } from 'react-native';
import MapComponent from '../components/Map';

const Home = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <MapComponent />
    </View>
  );
};

export default Home;
