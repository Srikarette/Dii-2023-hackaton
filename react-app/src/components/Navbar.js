import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LogoAlertTown 2.png";
import linelogo from "../assets/linelogo.png";

const Navbar = () => {
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
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
