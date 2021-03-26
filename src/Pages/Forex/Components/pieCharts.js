import React from "react";
import "../Forex.css";
import { PieChart, Pie, Tooltip } from "recharts";
import piedata from "../../../Static/pieData.json";

function pieCharts() {
  return (
    <div>
      <div className="pieCharts">
        <PieChart
          width={0.24 * window.screen.width}
          height={0.24 * window.screen.height}
        >
          <Pie
            data={piedata}
            dataKey="value"
            nameKey="name"
            innerRadius={0.065 * window.screen.height}
            fill="#83a6ed"
            cx="50%"
          />
          <Tooltip dataKey="name" />
        </PieChart>
      </div>
      <div className="pieCharts">
        <PieChart
          width={0.24 * window.screen.width}
          height={0.24 * window.screen.height}
        >
          <Pie
            data={piedata}
            dataKey="value"
            nameKey="name"
            innerRadius={0.065 * window.screen.height}
            fill="#82ca9d"
            cx="50%"
          />
          <Tooltip dataKey="name" />
        </PieChart>
      </div>
      <div className="pieCharts">
        <PieChart
          width={0.24 * window.screen.width}
          height={0.24 * window.screen.height}
        >
          <Pie
            data={piedata}
            dataKey="value"
            nameKey="name"
            innerRadius={0.065 * window.screen.height}
            fill="#8884d8"
            cx="50%"
          />
          <Tooltip dataKey="name" />
        </PieChart>
      </div>
    </div>
  );
}

export default pieCharts();
