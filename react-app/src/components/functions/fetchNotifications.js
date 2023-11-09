export async function fetchAllNotifications() {
  try {
    console.log('Start fetching')
    const response = await fetch('https://noti-service.azurewebsites.net/notifications', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('Fetch data complete')
    console.log(response.headers)
    console.log(response.status)
    

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}


export async function fetchNotificationById(id) {
  try {
    const response = await fetch(`https://noti-service.azurewebsites.net/notifications/${id}`);
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
