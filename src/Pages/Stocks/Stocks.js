import React from "react";
import "./Stocks.css";
import Navbar from "../../Navbar";
import Footer from "../../Footer";

function Stocks() {
  return (
    <div>
      <Navbar />
      <div className="MainStocks">
        <div className="backgroundImage">
          <iframe
            title="hello"
            className="calendarWidget"
            src="https://widgets.myfxbook.com/widgets/calendar.html"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Stocks;
