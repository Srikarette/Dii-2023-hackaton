import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function LoginScreen() {
  const [username, setUsername] = useState("Guest");
  const navigation = useNavigation(); // Get the navigation object

  const handleUsernameChange = (text) => {
    setUsername(text);
  }

  const handleLogin = () => {
    // You can perform login or navigate to another screen here
    console.log(`Logged in as ${username}`);
    navigation.navigate("Chat", { username });
    setUsername(null)
  }

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        placeholder="Enter your username"
        onChangeText={handleUsernameChange}
      />
      <Button title="Continue" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 200,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
