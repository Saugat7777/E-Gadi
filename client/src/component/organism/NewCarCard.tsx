import moment from "moment";
import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface IProps {
  newCarData: any;
}

const NewCarCard: React.FC<IProps> = ({ newCarData }) => {
  const chartData = useMemo(() => {
    if (!newCarData) return [];
    const currentDate = moment();
    const currentYear = currentDate.year();

    const monthlyCounts: any = {};
    newCarData.forEach((data: any) => {
      const date = moment(data.createdAt);
      const year = date.year();
      if (year === currentYear) {
        const monthYear = date.format("MMM"); // Get abbreviated month name
        if (!monthlyCounts[monthYear]) {
          monthlyCounts[monthYear] = 0;
        }
        monthlyCounts[monthYear]++;
      }
    });
    const updatedData = [
      { name: "Jan", amount: monthlyCounts["Jan"] || 0 },
      { name: "Feb", amount: monthlyCounts["Feb"] || 0 },
      { name: "Mar", amount: monthlyCounts["Mar"] || 0 },
      { name: "Apr", amount: monthlyCounts["Apr"] || 0 },
      { name: "May", amount: monthlyCounts["May"] || 0 },
      { name: "Jun", amount: monthlyCounts["Jun"] || 0 },
      { name: "Jul", amount: monthlyCounts["Jul"] || 0 },
      { name: "Aug", amount: monthlyCounts["Aug"] || 0 },
      { name: "Sep", amount: monthlyCounts["Sep"] || 0 },
      { name: "Oct", amount: monthlyCounts["Oct"] || 0 },
      { name: "Nov", amount: monthlyCounts["Nov"] || 0 },
      { name: "Dec", amount: monthlyCounts["Dec"] || 0 },
    ];
    return updatedData;
  }, [newCarData]);

  return (
    <ResponsiveContainer
      width="100%"
      height={"90%"}
      style={{ marginTop: "2rem" }}
    >
      <AreaChart
        width={500}
        data={chartData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="#8884d8"
          fill="#fc8e3c"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default NewCarCard;
