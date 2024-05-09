import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { eventTypeArray } from "../Services/Constant";

const EventTypeChart = () => {
  const EventStore = useSelector((state) => state.EventStore.EventData);

  const [EventTypeData, setEventTypeData] = useState({
    labels: eventTypeArray,
    datasets: [],
  });

  const data = {
    labels: eventTypeArray,
    datasets: [
      {
        label: "Event Types Count",
        data: [12, 19, 3, 50, 2, 3],
        backgroundColor: [
          "#fce4ec",
          "#c8e6c9",
          "#bbdefb",
          "#ffccbc",
          "#999999",
          "#fff9c4",
          "#b2dfdb",
          "#d1c4e9",
        ],
      },
    ],
  };

  const options1 = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        // display: true,
        // text: "Horizontal Bar Chart",
      },
    },
    scales: {
      y: {
        barPercentage: 0.5, // Adjust this value to change the thickness of the bars
      },
    },
  };

  useEffect(() => {
    if (EventStore?.length > 0) {
      let TypeObj = {};
      EventStore.forEach((element) => {
        if (TypeObj[element.type]) {
          TypeObj[element.type].count = TypeObj[element.type].count + 1;
        } else {
          TypeObj = {
            ...TypeObj,
            [element.type]: {
              count: 1,
            },
          };
        }
      });
      let count = [];
      if (Object.keys(TypeObj)?.length > 0) {
        eventTypeArray.forEach((element) => {
          count.push(TypeObj[element]?.count);
        });
        setEventTypeData({
          labels: eventTypeArray,
          datasets: [
            {
              label: "Event Types Count",
              data: count,
              backgroundColor: [
                // "#2c7be5"
                "#fce4ec",
                "#c8e6c9",
                "#bbdefb",
                "#ffccbc",
                "#999999",
                "#fff9c4",
                "#b2dfdb",
                "#d1c4e9",
              ],
              // barThickness: 20,
            },
          ],
        });
      }
    }
  }, [EventStore]);

  return (
    <div className="bar-chart">
      <Bar data={EventTypeData} options={options1} />
    </div>
  );
};

export default EventTypeChart;
