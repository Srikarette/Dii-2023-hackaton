export async function fetchAllNotifications() {
  try {
    console.log('Start fetching');
    const response = await fetch('http://localhost:8081/notifications/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Log the response status and headers
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log('Fetched Data:', data);
    return data;
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
