import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DataChart({ excelData, title }) {
  if (excelData.length === 0) return null;

  // Assume the first row as header
  const headers = excelData[0]; // Get headers
  const dataRows = excelData.slice(1); // Extract data rows

  // Prepare labels and datasets for the chart
  const labels = dataRows.map((row) => row[0]); // Use the first column (Product names) for labels
  const datasets = [];

  // Loop through each month to create a dataset
  for (let i = 1; i < headers.length; i++) {
    datasets.push({
      label: headers[i], // Month as label
      data: dataRows.map((row) => row[i]), // Sales data for each product for that month
      backgroundColor: `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${
        (i * 150) % 255
      }, 0.6)`,
      borderColor: `rgba(${(i * 50) % 255}, ${(i * 100) % 255}, ${
        (i * 150) % 255
      }, 1)`,
      borderWidth: 1,
    });
  }

  const chartData = {
    labels, // Product names
    datasets, // Array of datasets for each month
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title || "", // Use the passed title or a default one
      },
    },
    scales: {
      x: {
        stacked: true, // Enable stacking for the bar chart
      },
      y: {
        stacked: true, // Enable stacking for the bar chart
      },
    },
  };

  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}
