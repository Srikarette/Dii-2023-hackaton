import axios from "axios";

const handleUserLogin = async (username, password) => {
  try {
    const response = await axios.post("/users/login", { username, password });
    console.log("User login successful");
    // Handle success, e.g., redirect to user dashboard
  } catch (error) {
    console.error("User login failed:", error);
    // Handle error, e.g., show an error message
  }
};

const handleAdminLogin = async (username, password) => {
  try {
    const response = await axios.post("/admins", { username, password });
    console.log("Admin login successful");
    // Handle success, e.g., redirect to admin dashboard
  } catch (error) {
    console.error("Admin login failed:", error);
    // Handle error, e.g., show an error message
  }
};
