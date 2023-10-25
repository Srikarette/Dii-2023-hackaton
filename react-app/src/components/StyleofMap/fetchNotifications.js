import React from "react";

const fetchNotifications = async () => {
  try {
    const response = await fetch("http://localhost:8090/notifications");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default fetchNotifications;
