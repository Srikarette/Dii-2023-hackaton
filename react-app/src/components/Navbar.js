import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LogoAlertTown 2.png";
import liff from "@line/liff";

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    liff
      .init({ liffId: "2001488392-pk27JKYA" })
      .then(() => {
        // Code
        handleLogin();
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogin = async () => {
    try {
      // Code
      const profile = await liff.getProfile();
      const idToken = liff.getIDToken();
      const userDisplayName = profile.displayName; // Get the user's name
      const userPicture = profile.pictureUrl;
      setUserName(userDisplayName); // Update the user's name state
      console.log(profile, idToken);
      console.log("User Name:", userDisplayName);
      console.log("Profile:", userPicture);
      console.log("ID Token:", idToken);
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogout = () => {
    // Perform the logout action here, such as clearing user data or invoking LINE's logout functionality
    // For example, you can use liff.logout() if it's supported
    liff.logout();
    // Then, you can clear the userName state
    setUserName(null);
  };
  const handleLoginliff = () => {
    try {
      // Perform LINE login
      liff.login();

      // Assuming the login was successful, navigate to the Line.js component
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <nav className="bg-black text-white">
        <div className="container m-auto flex justify-between items-center py-4">
          <Link to="/" className="text-2xl text-white">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="w-12 h-12 mr-2" />
              <span>Alert Town</span>
            </div>
          </Link>
          <ul className="flex text-lg">
            <li className="mx-4">
              <Link to="/" className="hover:text-red-500">
                HOME
              </Link>
            </li>
            <li className="mx-4">
              <Link to="/" className="hover:text-red-500">
                MAP
              </Link>
            </li>
            <li className="mx-4">
              <Link to="/officials" className="hover:text-red-500">
                FOR OFFICIALS
              </Link>
            </li>
            <li>
              {userName ? (
                <>
                  <span>{userName}</span>
                  <span
                    onClick={handleLogout}
                    className="cursor-pointer hover:text-red-500 ml-2"
                  >
                    Logout
                  </span>
                </>
              ) : (
                <span onClick={handleLoginliff}> Login with Line</span>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
