import React from "react";
import "./Stocks.css";

function Stocks() {
  return (
    <div className="MainStocks">
      <div className="backgroundImage">
        <iframe
          title="hello"
          className="calendarWidget"
          src="https://widgets.myfxbook.com/widgets/calendar.html"
        ></iframe>
      </div>
    </div>
  );
}

export default Stocks;
