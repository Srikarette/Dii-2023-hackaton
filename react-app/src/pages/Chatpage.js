import React, { useEffect } from "react";
import axios from "axios";

const Chatpage = () => {
  const fetchChats = async () => {
    try {
      const response = await axios.get("/api/chat");
      const data = response.data;
      console.log(data);
    } catch (error) {
      // Log the error object for inspection
      console.error("An error occurred:", error);

      // You can access specific properties of the error object, such as error.message, error.response, etc.
      console.log("Error message:", error.message);
      console.log(
        "Response status:",
        error.response ? error.response.status : "N/A"
      );
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return <div>Chatpage</div>;
};

export default Chatpage;
