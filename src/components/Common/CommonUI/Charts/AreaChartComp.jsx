import React, { useEffect, useState } from "react";
import ThousandFormatter from "../../../../assets/js/ThousandFormatter";
import { ShimmerButton } from "react-shimmer-effects-18";
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
import NodataComp from "../NodataComp";
const AreaChartComp = ({
  chartData,
  ChartValue,
  ChartTime,
  CustomTooltip,
  chartLoading,
}) => {
  // const [ChartValue, setChartValue] = useState(0);
  // const [ChartTime, setChartTime] = useState(0);
  // const [LastArray, setLastArray] = useState(0);
  // const [lastIndex, setlastIndex] = useState(0);

  // useEffect(() => {
  //   console.log(chartData);

  // }, []);

  return (
    <div className="customAreaChart_div">
      <div className="customAreaChart_div_Title">Transactions</div>
      {chartLoading ? (
        <ShimmerButton size="md" className="custom_shimmer" />
      ) : (
        <>
          {chartData.length <= 0 ? (
            <div className="customAreaChart_div_tooltip">$----</div>
          ) : (
            <div
              className="customAreaChart_div_tooltip"
              onChange={CustomTooltip}
            >
              ${ThousandFormatter(ChartValue)}
            </div>
          )}
        </>
      )}
      {chartLoading ? (
        <ShimmerButton size="sm" className="custom_shimmer" />
      ) : (
        <>
          {chartData.length <= 0 ? (
            <span className="customAreaChart_div_tooltip_span">----</span>
          ) : (
            <span className="customAreaChart_div_tooltip_span">
              {ChartTime}
            </span>
          )}
        </>
      )}

      {chartLoading ? (
        <ShimmerButton size="lg" className="custom_shimmer" />
      ) : (
        <>
          {chartData.length <= 0 ? (
            <div
              className="customAreaChart_div_chart "
              style={{ width: "100%", height: "100%" }}
            >
              <NodataComp />
            </div>
          ) : (
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
          )}
        </>
      )}
    </div>
  );
};

export default AreaChartComp;
