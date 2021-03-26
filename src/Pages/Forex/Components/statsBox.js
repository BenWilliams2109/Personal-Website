import React from "react";
import "../Forex.css";

function statsBox() {
  return (
    <div>
      <div>
        <div className="statsBoxGB">Gain: </div>
        <div className="statsBox">Abs. Gain: </div>
        <div className="statsBoxGB">Daily: </div>
        <div className="statsBox">Monthly: </div>
        <div className="statsBoxGB">Drawdown: </div>
        <div className="statsBox">Balance: </div>
        <div className="statsBoxGB">Equity: </div>
        <div className="statsBox">Highest: </div>
        <div className="statsBoxGB">Profit: </div>
        <div className="statsBox">Interest: </div>
        <div className="statsBoxGB">Deposits: </div>
        <div className="statsBox">Withdrawals: </div>
      </div>
    </div>
  );
}

export default statsBox();
