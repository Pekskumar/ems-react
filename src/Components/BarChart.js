import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Commonservice } from "../Services/Commonservice";

const BarChart = ({
  labels,
  datasets,
  maxPercentage,
  xAxisTitle,
  yAxisTitle,
  barThickness,
  onBarClick,
}) => {
  const chartData = {
    labels: labels,
    datasets: datasets?.map((dataset, index) => ({
      label: dataset?.label,
      backgroundColor: dataset?.backgroundColor,
      data: dataset?.data,
      barThickness: barThickness,
      stack: dataset?.stack || "default",
    })),
  };

  const chartOptions = {
    indexAxis: "x",
    scales: {
      x: {
        beginAtZero: true,
        max: maxPercentage,
        stacked: true,
        title: {
          display: true,
          text: xAxisTitle,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisTitle,
        },
        grid: {
          display: true,
          tickPadding: 0,
          drawBorder: false,
        },
        offset: false,
        ticks: {
          callback: function (value) {
            return "$" + value;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {        
        const clickedBarIndex = elements[0].index;
        const clickedDate = labels[clickedBarIndex]; // Get the clicked date
        
        onBarClick(Commonservice.getDateFormat(clickedDate));
      }
    },

    plugins: {
      legend: {
        display: true,
        align: "end",
        position: "top",
        maxWidth: 20,
        maxHeight: 100,
        labels: {
          boxWidth: 10,
          boxHeight: 10,
        },
      },
    },
    barThickness: barThickness,
    maintainAspectRatio: false,
    responsive: true,
  };

  Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

  return (
    // <div className="verticalChartMainWrapper">
    <Bar data={chartData} options={chartOptions} />
    // </div>
  );
};

export default BarChart;
