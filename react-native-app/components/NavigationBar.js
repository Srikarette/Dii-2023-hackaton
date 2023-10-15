import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './AppNavigator';

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={AppNavigator} />
        <Tab.Screen name="Notification" component={AppNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationBar;
