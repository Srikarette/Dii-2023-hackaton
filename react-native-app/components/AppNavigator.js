import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from '@react-navigation';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';


const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Chat: ChatScreen
  },
  {
    headerMode: 'none'
  }
);



export default createAppContainer(AppNavigator);
