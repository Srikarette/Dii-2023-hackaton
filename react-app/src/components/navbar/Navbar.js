import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogoAlert from '../../assets/LogoAlertTown.png';
import { FcBusinessman } from "react-icons/fc";

const Navbar = () => {
  return (
    <nav className='bg-red-900 py-4'>
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-white text-2xl font-bold">
          <img src={LogoAlert} alt="Logo" className='w-8 h-8 mr-2 inline' />
          AlertTown
        </Link>
        <ul className="flex space-x-8">
          <li>
            <NavLink to="/news" exact className="text-white hover:text-blue-200">
              News
            </NavLink>
          </li>
          <li>
            <NavLink to="/notifications" className="text-white hover:text-blue-200 shadow-">
              Notifications
            </NavLink>
          </li>
          <li>
            <NavLink to="/support" className="text-white hover:text-blue-200">
              Support
            </NavLink>
          </li>
          <li>
            <NavLink to="/editprofile" className='flex text-white hover:text-blue-200 pr-8'>
            edit <FcBusinessman size={25}/>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
