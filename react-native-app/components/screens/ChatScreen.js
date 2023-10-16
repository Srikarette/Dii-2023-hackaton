// import React, { useState, useEffect } from "react";
// import {Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet,} from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import Fire from "../../Fire";

// export default function ChatScreen({ route }) {
//   const [messages, setMessages] = useState([]);

//   const name = route?.params?.name || 'Guest';
  
//   const user = {
//     _id: Fire.uid,
//     name: name,
//   };

//   useEffect(() => {
//     Fire.get((message) => {
//       setMessages((previousMessages) =>
//         GiftedChat.append(previousMessages, message)
//       );
//     });
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <GiftedChat
//         messages={messages}
//         onSend={Fire.send}
//         user={user}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
