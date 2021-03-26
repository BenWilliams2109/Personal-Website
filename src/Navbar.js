import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { SiCivicrm } from "react-icons/si";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

function Navbar() {
  const [click, setCLick] = useState(false);

  const handleClick = () => setCLick(!click);
  const closeMobileMenu = () => setCLick(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <SiCivicrm className="navbar-icon" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <Link
                  to="/stocks"
                  className="navBarButton"
                  onClick={closeMobileMenu}
                >
                  ECONOMIC CALENDAR
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/forex"
                  className="navBarButton"
                  onClick={closeMobileMenu}
                >
                  Forex
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
