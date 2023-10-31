import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LineLogin from 'react-native-line-sdk';

export default function LoginScreen () {
  const channel_id = '2001383418'
  
  const handleLineLogin = async () => {
    try {
      const loginResult = await LineLogin.login({
        channelID: channel_id,
      });

      if (loginResult && loginResult.id_token) {
        // User is logged in, and you can get the user's ID token here.
        const idToken = loginResult.id_token;
        console.log('Logged in with Line:', idToken);
        // You can now send this token to your backend for user validation.
      }
    } catch (error) {
      console.error('Line Login failed:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleLineLogin}>
        <Text>Log in with Line</Text>
      </TouchableOpacity>
    </View>
  );
};

