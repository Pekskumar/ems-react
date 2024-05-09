import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const DoughnutChart = (props) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

 

  return (
    <Doughnut 
      data={props.data}       
      options={{
        onClick: props.handleDoughnutClick
      }}
    />
  );
};

export default DoughnutChart;
