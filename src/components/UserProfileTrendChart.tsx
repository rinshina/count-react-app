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
console.log("UserProfileTrendChart is rendering");

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserProfileTrendChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"], // Example months
    datasets: [
      {
        label: "User Logins",
        data: [50, 75, 100, 125, 150, 200], // Example login data
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "User Profile Trend - Logins Over Time",
      },
      tooltip: {
        mode: "nearest" as const, // Explicitly cast to the correct type
        intersect: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default UserProfileTrendChart;
