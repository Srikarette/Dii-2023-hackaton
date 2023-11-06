import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import liff from "@line/liff";

const AdminLoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // State to store the error message
  const [admins, setAdmins] = useState([]);
  const history = useHistory();

  const fetchAdminData = () => {
    axios
      .get("http://localhost:8080/admins")
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    liff.init({ liffId: "2001488392-pk27JKYA" });
    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear the previous error message

    const { username, password } = formData;
    const loginSuccessful = admins.some(
      (admin) => admin.username === username && admin.password === password
    );

    if (loginSuccessful) {
      history.push("/Mapadmin");
    } else {
      setError("Wrong username or password. Please try again."); // Set the error message
    }
  };

  return (
    <div className="flex items-center justify-center pt-14 ">
      <div className="bg-white p-8 rounded-md shadow-md w-80 border-1">
        <h2 className="text-2xl font-semibold text-center mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-600"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded-lg focus:ring focus:ring-blue-200"
            />
            <a href="https://shorturl.at/lGLO9" className="text-xs text-blue-500 duration-300  hover:text-blue-900">request account?</a>
          </div>
          {error && <p className="text-red-600 text-center mb-2">{error}</p>}
          
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover-bg-blue-600 focus:outline-none focus-bg-blue-600 duration-300 hover:bg-blue-900"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginForm;
