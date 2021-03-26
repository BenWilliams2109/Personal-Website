import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footerContentContainer">
      <div className="footerContentBox">
        <div className="footerFirstLineRow">
          <div className="footerInformation">
            <div className="footerInformationLine1">
              <div className="phoneNumber">
                <p className="title">Phone</p>
                <p className="detail">+44 (0)7977 344 517</p>
              </div>
              <div className="email">
                <p className="title">Email</p>
                <p className="detail">Ben.williams21@outlook.com</p>
              </div>
            </div>
            <div className="footerInformationLine2">
              <div className="address">
                <p className="title">Address</p>
                <p className="detail">5 Forest Road</p>
                <p className="detail">Loughborough</p>
                <p className="detail">Leicestershire</p>
                <p className="detail">United Kingdom</p>
              </div>
              <div className="socialMedia">
                <p className="title">Follow Me</p>
                <p className="Socials">
                  <a
                    className="detail"
                    href="https://www.instagram.com/benslw_/"
                  >
                    Ig
                  </a>
                  <a
                    className="detail"
                    href="https://www.linkedin.com/in/ben-w-257585157/"
                  >
                    Lk
                  </a>
                  <a
                    className="detail"
                    href="https://github.com/benwilliams2109"
                  >
                    Git
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="footerAbout"></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
