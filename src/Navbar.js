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
      <IconContext.Provider value={{ color: "#BB86FC", size: "4rem" }}>
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
                  className="navbar-item-text"
                  onClick={closeMobileMenu}
                >
                  Economic Calendar
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to="/forex"
                  className="navbar-item-text"
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
