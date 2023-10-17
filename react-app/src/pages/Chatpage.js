import React, { useEffect } from "react";
import axios from "axios";

const Chatpage = () => {
  const fetchChats = async () => {
    try {
      const response = await axios.get("/api/chat");
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return <div>Chatpage</div>;
};

export default Chatpage;
