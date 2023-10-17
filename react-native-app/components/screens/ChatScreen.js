// import React, { useState, useEffect } from "react";
// import { Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
// import { GiftedChat } from "react-native-gifted-chat";
// import Fire from "../../Fire";

// export default function ChatScreen({ route }) {
//   const [messages, setMessages] = useState([]);
  
//   // Get user information
//   const user = {
//     _id: Fire.uid,
//     name: route.params.name,
//   };

//   useEffect(() => {
//     // ComponentDidMount
//     Fire.get((message) => {
//       setMessages((previousMessages) => GiftedChat.append(previousMessages, message));
//     });

//     // ComponentWillUnmount
//     return () => {
//       Fire.off();
//     };
//   }, []);

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       {Platform.OS === "android" ? (
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={Platform.OS === "ios" ? "padding" : null}
//           keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
//         >
//           <GiftedChat
//             messages={messages}
//             onSend={(newMessages) => Fire.send(newMessages)}
//             user={user}
//           />
//         </KeyboardAvoidingView>
//       ) : (
//         <GiftedChat
//           messages={messages}
//           onSend={(newMessages) => Fire.send(newMessages)}
//           user={user}
//         />
//       )}
//     </SafeAreaView>
//   );
// }

