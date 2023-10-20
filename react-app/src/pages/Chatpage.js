import React, { useEffect, useState } from "react";
import { chats } from "../data/data"; // Import the chats data
import { AiFillFire } from "react-icons/ai";

const Chatpage = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Simulate loading for a brief moment
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate loading for 1 second
  }, []);

  return (
    <>
      <div>
        <h1>Chatpage</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {chats.map((chat) => (
              <li key={chat._id}>{chat.chatName}</li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <AiFillFire size={40} />
      </div>
    </>
  );
};

export default Chatpage;
