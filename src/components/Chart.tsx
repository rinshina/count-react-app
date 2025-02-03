import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface UserProfileTrendsProps {
  data: { date: string; value: number }[]; // Example trend data
}

const UserProfileTrends: React.FC<UserProfileTrendsProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date), // X-axis labels (dates)
    datasets: [
      {
        label: "User Profile Trend", // Label for the line
        data: data.map((item) => item.value), // Y-axis values (profile trends)
        borderColor: "rgba(75, 192, 192, 1)", // Line color
        backgroundColor: "rgba(75, 192, 192, 0.2)", // Line fill color
        fill: true, // Fill under the line
        tension: 0.1, // Line smoothness
      },
    ],
  };

  return (
    <div>
      <h2>User Profile Trends</h2>
      <Line data={chartData} />
    </div>
  );
};

export default UserProfileTrends;
