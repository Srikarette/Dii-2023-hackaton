import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/LogoAlertTown 2.png";

function Navbar() {
  return (
    <>
      <nav>
        <Link to="/">
          <img src={Logo} className="logoimg" alt="Logo" height={20}></img>
        </Link>
        <ul>
          <li>
            <Link>Notification</Link>
          </li>
          <li>
            <Link>For officials</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

Navbar.propTypes = {};

export default styled(Navbar)`
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rebeccapurple;
  }
  .logoimg {
    width: 3rem;
    height: 3rem; // Adjust to an appropriate value
  }
`;
