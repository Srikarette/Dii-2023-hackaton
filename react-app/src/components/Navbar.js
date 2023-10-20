import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/LogoAlertTown 2.png";
import { GrNotification } from "react-icons/gr";

export function Navbar({ className }) {
  return (
    <>
      <div className={className}>
        <nav>
          <Link to="/">
            <img src={Logo} className="logoimg" alt="LogoPng" />
          </Link>
          <ul>
            <li>
              <Link to="/notifications" className="notification-link">
                Notification <GrNotification className="notification-icon" />
              </Link>
            </li>
            <li>
              <Link to="/officials">For officials</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

Navbar.propTypes = {};

export default styled(Navbar)`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    background-color: red;
  }
  nav ul {
    display: flex;
  }
  li {
    list-style: none;
    margin: 0px 15px;
  }
  .logoimg {
    width: 100px;
    height: 87px; // Adjust to an appropriate value
    object-fit: cover;
  }
  .notification-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: white;
  }
  .notification-icon {
    margin-left: 5px; // Adjust the spacing as needed
  }
`;
