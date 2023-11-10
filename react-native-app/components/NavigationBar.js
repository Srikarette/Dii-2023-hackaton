import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapScreen from './screens/MapScreen';
import { Image } from 'react-native';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Alert Town"
          component={MapScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./map-icon/home.png')} // Replace with the actual path to your PNG icon
                style={{ width: size, height: size, tintColor: color }}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBar;
