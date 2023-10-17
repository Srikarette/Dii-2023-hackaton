import React from 'react';
import { View,Text } from 'react-native';
import NavigationBar from './components/NavigationBar';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationBar />
    </View>
  );
}
