import React, { useState } from "react";
import "./Forex.css";
import table from "./Components/generalStatsTable";
/*import lineChartMain from "./Components/mainLineChart";*/
import pieCharts from "./Components/pieCharts";
/*import statsBox from "./Components/statsBox";*/
import dataSheet from "../../Static/out.json";
// import LineChart from "./Components/LineChart.js";
import {
  LineChart,
  XAxis,
  Line,
  YAxis,
  Tooltip,
  Brush,
  ResponsiveContainer,
} from "recharts";
import Navbar from "../../Navbar";
import Footer from "../../Footer";

function Forex() {
  const [profit, setProfit] = useState("--");
  const [fetched, setFetched] = useState(true);
  const [dotted, setDotted] = useState(false);
  const [formatted, setFormatted] = useState(true);

  const [positions, setPositions] = useState([]);
  const [coordinatePairsOnGraph, setCoordinatePairsOnGraph] = useState([]);

  const [backtestOptions, setBacktestOptions] = useState({
    Algorithm: "",
    Symbol: "",
    Initial_Deposit_Amount: "",
    Initial_Deposit_Symbol: "",
    Positions: "",
  });

  const handleClick = () => {
    fetchAlgorithmResults({
      Algorithm: "movingAverageSymbols",
      Symbol: "GBPUSD",
      Initial_Deposit_Amount: 10000,
      Initial_Deposit_Symbol: "GBP",
      Positions: ["Long", "Short"],
    });
  };

  const tickFormatter = (value) => {
    var t = new Date(value);
    var str = t.toISOString();
    str = str.replace(/-/g, "/");
    return str.slice(0, str.length - 14);
  };

  function fetchAlgorithmResults(input) {
    setFetched(false);
    fetch("http://127.0.0.1:5000/choice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => {
        setPositions(data);
        setFetched(true);
        formatTradeLines();
      });
  }

  const CustomDot = (props) => {
    const { cx, cy, stroke, payload, value, positions, fetched } = props;
    if (fetched === true) {
      for (var i = 0; i < positions.length; i++) {
        if (
          tickFormatter(positions[i].dateOpen) ===
          tickFormatter(payload.DateTime)
        ) {
          if (positions[i].Type === "Short") {
            return (
              <svg x={cx - 4} y={cy - 3} width={10} height={20} fill="red">
                <polygon points={"0,0 0,6 4,3"} />
              </svg>
            );
          } else {
            return (
              <svg x={cx - 4} y={cy - 3} width={10} height={20} fill="blue">
                <polygon points={"0,0 0,6 4,3"} />
              </svg>
            );
          }
        } else if (
          tickFormatter(positions[i].dateClose) ===
          tickFormatter(payload.DateTime)
        ) {
          if (positions[i].Type === "Short") {
            return (
              <svg x={cx} y={cy - 3} width={10} height={20} fill="red">
                <polygon points={"0,3 4,0 4,6"} />
              </svg>
            );
          } else {
            return (
              <svg x={cx} y={cy - 3} width={10} height={20} fill="blue">
                <polygon points={"0,3 4,0 4,6"} />
              </svg>
            );
          }
        }
      }
    }
    return null;
  };

  const formatTradeLines = () => {
    let tempData = Array(positions.length)
      .fill(0)
      .map(() => new Array(2).fill(0));

    for (var i = 0; i < positions.length; i++) {
      tempData[positions[i].uniqueTradeCode] = [
        {
          DateTime: positions[i].dateOpen,
          Bid: positions[i].priceOpen,
          uniqueTradeCode: positions[i].uniqueTradeCode,
        },
        {
          DateTime: positions[i].dateClose,
          Bid: positions[i].priceClose,
          uniqueTradeCode: positions[i].uniqueTradeCode,
        },
      ];
    }
    setFetched(true);
    setCoordinatePairsOnGraph(tempData);
  };

  const customLineChart = (data, fetched) => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={0.3 * window.screen.width}
          height={0.3 * window.screen.height}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          data={coordinatePairsOnGraph}
        >
          <XAxis
            dataKey="DateTime"
            tickFormatter={tickFormatter}
            allowDuplicatedCategory={false}
          />
          <YAxis type="number" domain={["auto", "auto"]} />
          <Tooltip dataKey="DateTime" labelFormatter={tickFormatter} />
          <Brush
            data={coordinatePairsOnGraph}
            dataKey="DateTime"
            tickFormatter={tickFormatter}
            autoScaleYaxis={true}
            height={40}
            travellerWidth={5}
          />
          <Line
            data={data}
            type="Monotone"
            dataKey="Bid"
            stroke="#8884d8"
            connectNulls
            key={"MainLine"}
            dot={false}
          />
          {coordinatePairsOnGraph.map((trade) => {
            return (
              <Line
                data={trade}
                type="linear"
                stroke="red"
                strokeDasharray="3 3"
                key={trade[0].uniqueTradeCode}
                dataKey="Bid"
                dot={<CustomDot positions={positions} fetched={fetched} />}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="pageContent">
        <div className="horizontalFlexLeft">
          <div className="line1Left">
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
          <div className="line2Left">
            <div className="runButton">
              <button className="ui button" onClick={handleClick}>
                Run
              </button>
            </div>
          </div>
        </div>
        <div className="horizontalFlexRight">
          <div className="line1Right">
            <div className="lineChart">
              {!fetched && <div className="fetchingData">Fetching...</div>}
              {!formatted && <div className="fetchingData">Formatting...</div>}
              {customLineChart(dataSheet, fetched)}
            </div>
          </div>
          <div className="line2Right">{table}</div>
          <div className="line3Right">{pieCharts}</div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Forex;
