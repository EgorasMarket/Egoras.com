import React, { useEffect, useState } from "react";
import ThousandFormatter from "../../../../assets/js/ThousandFormatter";
import "./AreaChartComp.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";
const AreaChartComp = () => {
  const [chartData, setChartData] = useState([
    {
      value: 1000,
      timestamp: "May 20, 2023",
      month: "May",
    },
    {
      value: 2000,
      timestamp: "May 24, 2023",
      month: "May",
    },
    {
      value: 8000,
      timestamp: "Jun 07, 2023",
      month: "Jun",
    },
    {
      value: 1000,
      timestamp: "Jun 09, 2023",
      month: "Jun",
    },
  ]);
  const [ChartValue, setChartValue] = useState(0);
  const [ChartTime, setChartTime] = useState(0);
  const [LastArray, setLastArray] = useState(0);
  const [lastIndex, setlastIndex] = useState(0);

  useEffect(() => {
    console.log(chartData);
    setlastIndex(chartData.length - 1);
    setLastArray(chartData[chartData.length - 1]);
    setChartValue(() => chartData[chartData.length - 1].value);
    setChartTime(() => chartData[chartData.length - 1].timestamp);
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      setChartValue(payload[0].payload.value);
      setChartTime(payload[0].payload.timestamp);
    } else {
      setChartValue(LastArray.value);
      setChartTime(LastArray.timestamp);
    }
    return null;
  };

  return (
    <div className="customAreaChart_div">
      <div className="customAreaChart_div_Title">Transactions</div>
      <div className="customAreaChart_div_tooltip" onChange={CustomTooltip}>
        ${ThousandFormatter(ChartValue)}
      </div>
      <span className="customAreaChart_div_tooltip_span">{ChartTime}</span>
      <div
        className="customAreaChart_div_chart "
        style={{ width: "100%", height: "100%" }}
      >
        <ResponsiveContainer>
          <AreaChart
            width={130}
            height={10}
            data={chartData}
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#31cb9e" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#31cb9e" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* <CartesianGrid strokeDasharray="1 1" stroke="#d7d7d7" /> */}
            <XAxis dataKey="month" stroke="0" />
            {/* <YAxis stroke="#000" /> */}
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#69b78d"
              fillOpacity={1}
              fill="url(#colorUv)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartComp;
