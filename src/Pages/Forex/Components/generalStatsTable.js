import React from "react";
import "../Forex.css";

function table() {
  return (
    <div className="generalStatistics">
      <div className="generalStatisticsColumn">
        <div className="generalStatisticsColumnItemGB">Trades: </div>
        <div className="generalStatisticsColumnItem">Profitability: </div>
        <div className="generalStatisticsColumnItemGB">Pips: </div>
        <div className="generalStatisticsColumnItem">Average Win: </div>
        <div className="generalStatisticsColumnItemGB">Average Loss: </div>
        <div className="generalStatisticsColumnItem">Lots: </div>
        <div className="generalStatisticsColumnItemGB">Commissions: </div>
      </div>
      <div className="generalStatisticsColumn">
        <div className="generalStatisticsColumnItem">Longs Won: </div>
        <div className="generalStatisticsColumnItemGB">Shorts Won: </div>
        <div className="generalStatisticsColumnItem">Best Trade (£): </div>
        <div className="generalStatisticsColumnItemGB">Worst Trade (£): </div>
        <div className="generalStatisticsColumnItem">Best Trade (Pips): </div>
        <div className="generalStatisticsColumnItemGB">
          Worst Trade (Pips):{" "}
        </div>
        <div className="generalStatisticsColumnItem">Avg. Trade Length: </div>
      </div>
      <div className="generalStatisticsColumn">
        <div className="generalStatisticsColumnItemGB">Profit Factor: </div>
        <div className="generalStatisticsColumnItem">Standard Deviation: </div>
        <div className="generalStatisticsColumnItemGB">Sharpe Ratio: </div>
        <div className="generalStatisticsColumnItem">
          Z-Score (Probability):{" "}
        </div>
        <div className="generalStatisticsColumnItemGB">Expectancy: </div>
        <div className="generalStatisticsColumnItem">AHPR: </div>
        <div className="generalStatisticsColumnItemGB">GHPR: </div>
      </div>
    </div>
  );
}

export default table();
