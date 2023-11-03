import React from "react";

export async function fetchAllNotifications() {
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
}

export async function fetchNotificationById(id) {
  try {
    const response = await fetch(`http://localhost:8090/notifications/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null for a single notification by ID if not found
  }
}
