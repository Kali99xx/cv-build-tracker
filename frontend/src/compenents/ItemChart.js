import { useState } from "react";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import the default CSS for react-datepicker
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register required Chart.js components
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const ItemChart = ({ items, step }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()); // Default: Today

  // Function to format Date to YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split("T")[0];

  const counts = {};
  // Function to count items per user
  const getUserCounts = (items) => {
    items.forEach((stepItems) => {
      stepItems.items.forEach((item) => {
        const itemDate = formatDate(new Date(item.updated_at)); // Convert item date
        const nextDay = new Date(selectedDate);
        nextDay.setDate(nextDay.getDate() - 1);
        if ((item.step === step || step === "total") && itemDate === formatDate(nextDay)) {
          const user = item.user; // Extract the username
          counts[user] = (counts[user] || 0) + 1; // Count occurrences per user
        }
      });
    });

    return counts;
  };

  const userCounts = getUserCounts(items);

  const chartData = {
    labels: Object.keys(userCounts), // Usernames on X-axis
    datasets: [
      {
        label: "Item Counts by User",
        data: Object.values(userCounts), // Counts on Y-axis
        backgroundColor: step === "total" ? "rgba(235, 162, 54, 0.5)" : "rgba(54, 162, 235, 0.5)",
        borderColor: step === "total" ? "rgba(235, 162, 54, 0.5)" : "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="chart-container p-4 bg-white rounded-lg shadow-md">
      {/* <h3 className="text-xl font-semibold mb-4">Item Counts by User</h3> */}

      {/* Date Picker */}
      <div className="mb-6">
        <div className="flex flex-row items-center">
      {/* Label */}
      <label className="block text-lg font-medium mb-2">Select Date:</label>

      {/* Date Picker */}
      <div className="relative ml-6 mb-1">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 transition duration-150 ease-in-out"
        />
        {/* Optional custom calendar icon */}
        <span className="absolute right-3 top-3 text-gray-400">
          <i className="fas fa-calendar-alt"></i>
        </span>
      </div>
        </div>
    </div>

      {/* Bar Chart */}
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: { beginAtZero: true, ticks: { stepSize: 1 } },
          },
        }}
      />
    </div>
  );
};

export default ItemChart;
