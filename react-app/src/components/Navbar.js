import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LogoAlertTown 2.png";
export function Navbar() {
  return (
    <>
      <nav className="text-white bg bg-red-600 flex justify-between items-center">
        <Link to="/">
          <img
            src={Logo}
            className="object-cover w-24 h-22 rounded-full bg-gradient-to-r from-purple-400 to-pink-300 ml-4"
            alt="LogoPng"
          />
        </Link>
        <ul className="flex">
          <li className="list-none mx-3.5">
            <Link
              to="/officials"
              className="border-2 border-rose-500 bg-slate-600 p-1 rounded-lg"
            >
              For officials
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Navbar;
