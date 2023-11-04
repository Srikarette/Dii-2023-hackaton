import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LogoAlertTown 2.png";
import liff from "@line/liff";

const Navbar = () => {
  const [userName, setUserName] = useState(null);
  const [userPicture, setUserPicture] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    liff
      .init({ liffId: "2001488392-pk27JKYA" })
      .then(() => {
        handleLogin();
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogin = async () => {
    try {
      const profile = await liff.getProfile();
      const idToken = liff.getIDToken();
      const userDisplayName = profile.displayName;
      const userProfilePicture = profile.pictureUrl;

      setUserName(userDisplayName);
      setUserPicture(userProfilePicture);
      // console.log(profile, idToken);
      // console.log("User Name:", userDisplayName);
      // console.log("Profile:", userProfilePicture);
      // console.log("ID Token:", idToken);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    liff.logout();
    setUserName(null);
    setUserPicture(null);
  };

  const handleLoginliff = () => {
    try {
      liff.login();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-black text-white z-50">
        <div className="container m-auto flex justify-between items-center py-4">
          <Link to="/" className="text-2xl text-white">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="w-12 h-12 mr-2" />
              <span>Alert Town</span>
            </div>
          </Link>
          <div className="hidden md:flex text-lg">
            <ul className="flex ">
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
                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={userPicture}
                        alt="User Picture"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-green-200 ml-2">{userName}</span>
                    <span
                      onClick={handleLogout} // Add a click event to trigger logout
                      className="cursor-pointer hover:text-red-500 ml-2"
                    >
                      Logout
                    </span>
                  </div>
                ) : (
                  <span onClick={handleLoginliff}> Login with Line</span>
                )}
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            <div className="cursor-pointer text-3xl" onClick={toggleMobileMenu}>
              &#9776;
            </div>
          </div>
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-16 right-0 left-0 bg-black z-10">
              <ul className="text-center py-2">
                <li>
                  <Link to="/" className="block text-white py-2">
                    HOME
                  </Link>
                </li>
                <li>
                  <Link to="/" className="block text-white py-2">
                    MAP
                  </Link>
                </li>
                <li>
                  <Link to="/officials" className="block text-white py-2">
                    FOR OFFICIALS
                  </Link>
                </li>
                <li>
                  {userName ? (
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={userPicture}
                          alt="User Picture"
                          className="w-12 h-12 mr-2 object-cover"
                        />
                      </div>
                      <span className="text-green-200 ml-2">{userName}</span>
                    </div>
                  ) : (
                    <span
                      onClick={handleLoginliff}
                      className="block text-white py-2"
                    >
                      Login with Line
                    </span>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
