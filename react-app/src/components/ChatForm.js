import React, { useState } from 'react';

const ChatApp = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [adminMessages, setAdminMessages] = useState([]);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = {
        text: message,
        isUser: true,
      };

      setUserMessages([...userMessages, newMessage]);
      setMessage('');

      // Simulate an admin reply after a short delay
      setTimeout(() => {
        const adminReply = {
          text: 'Thank you for your message. An admin will be with you shortly.',
          isUser: false,
        };

        setAdminMessages([...adminMessages, adminReply]);
      }, 1000);
    }
  };

  return (
    <div className="chat-app">
      <div className="user-chat-window">
        {userMessages.map((msg, index) => (
          <div key={index} className="message user">
            {msg.text}
          </div>
        ))}
      </div>
      <div className="admin-chat-window">
        {adminMessages.map((msg, index) => (
          <div key={index} className="message admin">
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatApp;
