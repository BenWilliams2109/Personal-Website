import React, { useState } from "react";
import { LineChart, XAxis, Line, YAxis, Tooltip, Brush } from "recharts";

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
  }
  return null;
};
const tickFormatter = (value) => {
  var t = new Date(value);
  var str = t.toISOString();
  str = str.replace(/-/g, "/");
  return str.slice(0, str.length - 14);
};

export default ({ data, openTimePositions, closeTimePositions, fetched }) => {
  return (
    <div>
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
    </div>
  );
};
