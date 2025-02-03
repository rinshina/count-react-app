import { useEffect, useState } from "react";
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
  ChartOptions,
  TooltipItem,
} from "chart.js";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC = () => {
  const [signInData, setSignInData] = useState<
    { date: string; signIns: number }[]
  >([]);

  useEffect(() => {
    // Fetch the sign-in history from localStorage
    const signInHistory = JSON.parse(
      localStorage.getItem("signInHistory") || "[]"
    );

    if (signInHistory.length > 0) {
      // Extract dates and count sign-ins for each date
      const signInMap: { [key: string]: number } = {};

      signInHistory.forEach((entry: { timestamp: string }) => {
        const date = new Date(entry.timestamp).toLocaleDateString();
        signInMap[date] = (signInMap[date] || 0) + 1;
      });

      // Format the data for the chart
      const formattedData = Object.keys(signInMap).map((date) => ({
        date,
        signIns: signInMap[date],
      }));

      // Sort by date to ensure the correct order
      formattedData.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      setSignInData(formattedData);
    }
  }, []);

  // Prepare the data for the chart
  const data = {
    labels: signInData.map((entry) => entry.date),
    datasets: [
      {
        label: "Sign-ins",
        data: signInData.map((entry) => entry.signIns), // The number of sign-ins per day
        borderColor: "rgba(75,192,192,1)",
        fill: false,
      },
    ],
  };

  // Chart options with explicit types
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem: TooltipItem<"line">) {
            // Safely access raw value and ensure it's a number
            const rawValue = tooltipItem.raw as number;
            return `Sign-ins: ${rawValue}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "category",
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        min: 0, // Ensure the y-axis starts from 0
        title: {
          display: true,
          text: "Number of Sign-ins",
        },
      },
    },
  };

  return (
    <div>
      <h2>Sign-ins Over Time</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default Chart;
