export async function fetchAllNotifications() {
  try {
    console.log('Start fetching');
    return fetch('http://localhost:8081/notifications')
      .then(response => response.json())
      .then(data => {
        return data; // Return the parsed JSON data
      });
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}


export async function fetchNotificationById(id) {
  try {
    const response = await fetch(`http://localhost:8081/notifications/${id}`);
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
