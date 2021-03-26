import React, { useState } from "react";
import "./Forex.css";
import table from "./Components/generalStatsTable";
/*import lineChartMain from "./Components/mainLineChart";*/
import pieCharts from "./Components/pieCharts";
/*import statsBox from "./Components/statsBox";*/
import dataSheet from "../../Static/out.json";
// import LineChart from "./Components/LineChart.js";
import { LineChart, XAxis, Line, YAxis, Tooltip, Brush } from "recharts";

function Forex() {
  const [profit, setProfit] = useState("--");
  const [fetched, setFetched] = useState(true);
  const [formatted, setFormatted] = useState(true);

  const [openTimePositions, setOpenTimePositions] = useState([]);
  const [closeTimePositions, setCloseTimePositions] = useState([]);

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

  function fetchAlgorithmResults(input) {
    setFetched(false);
    fetch("https://benslwilliams.co.uk:5000/choice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    })
      .then((response) => response.json())
      .then((data) => {
        let closeTimePositions = [];
        let openTimePositions = [];

        for (var i = 0; i < data.length; i++) {
          openTimePositions.push({
            DateTime: tickFormatter(data[i].dateOpen),
            Price: data[i].priceOpen,
            Type: data[i].Type,
          });
          closeTimePositions.push({
            DateTime: tickFormatter(data[i].dateClose),
            Price: data[i].priceClose,
            Type: data[i].Type,
          });
        }
        setOpenTimePositions(openTimePositions);
        setCloseTimePositions(closeTimePositions);
        setFetched(true);
        setFormatted(false);
      });
  }

  const CustomDot = (props) => {
    const {
      cx,
      cy,
      stroke,
      payload,
      value,
      openTimePositions,
      closeTimePositions,
      fetched,
    } = props;
    if (fetched == true) {
      console.log(closeTimePositions);
      for (var i = 0; i < openTimePositions.length; i++) {
        if (openTimePositions[i].DateTime == tickFormatter(payload.DateTime)) {
          if (openTimePositions[i].Type == "Short") {
            return (
              <svg x={cx - 10} y={cy - 7} width={10} height={20} fill="red">
                <polygon points={"0,0 0,14 10,7"} />
              </svg>
            );
          } else {
            return (
              <svg x={cx - 10} y={cy - 7} width={10} height={20} fill="blue">
                <polygon points={"0,0 0,14 10,7"} />
              </svg>
            );
          }
        } else if (
          closeTimePositions[i].DateTime == tickFormatter(payload.DateTime)
        ) {
          if (closeTimePositions[i].Type == "Short") {
            return (
              <svg x={cx} y={cy - 7} width={10} height={20} fill="red">
                <polygon points={"0,7 10,0 10,14"} />
              </svg>
            );
          } else {
            return (
              <svg x={cx} y={cy - 7} width={10} height={20} fill="blue">
                <polygon points={"0,7 10,0 10,14"} />
              </svg>
            );
          }
        }
      }
      {
        setFormatted(true);
      }
    }
    return null;
  };

  const customLineChart = (
    data,
    openTimePositions,
    closeTimePositions,
    fetched
  ) => {
    return (
      <LineChart
        width={0.3 * window.screen.width}
        height={0.3 * window.screen.height}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="DateTime" tickFormatter={tickFormatter} />
        <YAxis type="number" domain={["auto", "auto"]} />
        <Tooltip dataKey="DateTime" labelFormatter={tickFormatter} />
        <Line
          type="Monotone"
          dataKey="Ask"
          stroke="#8884d8"
          connectNulls
          dot={
            <CustomDot
              openTimePositions={openTimePositions}
              closeTimePositions={closeTimePositions}
              fetched={fetched}
            />
          }
        />

        <Brush
          data={data}
          dataKey="DateTime"
          tickFormatter={tickFormatter}
          autoScaleYaxis={true}
          height={40}
          travellerWidth={5}
        />
      </LineChart>
    );
  };

  const tickFormatter = (value) => {
    var t = new Date(value);
    var str = t.toISOString();
    str = str.replace(/-/g, "/");
    return str.slice(0, str.length - 14);
  };

  return (
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
            {customLineChart(
              dataSheet,
              openTimePositions,
              closeTimePositions,
              fetched
            )}
          </div>
        </div>
        <div className="line2Right">{table}</div>
        <div className="line3Right">{pieCharts}</div>
      </div>
    </div>
  );
}

export default Forex;
