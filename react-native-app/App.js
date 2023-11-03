import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import NavigationBar from './components/NavigationBar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <NavigationBar />
        
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});
