import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { ChartData } from "../../utils/constants/chartData";
import "./chartStyle.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,

  scales: {
    xAxes: [
      {
        barThickness: 2, // number (pixels) or 'flex'
        // maxBarThickness: 8 // number (pixels)
      },
    ],
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      border: { dash: [4, 4] },
      grid: {
        color: "#aaa", // for the grid lines
        tickColor: "#000", // for the tick mark
        tickBorderDash: [2, 3], // also for the tick, if long enough
        tickLength: 10, // just to see the dotted line
        tickWidth: 2,
        offset: true,
        drawTicks: true, // true is default
        drawOnChartArea: true, // true is default
      },
    },
  },
  // plugins: {
  //   title: {
  //     display: false,
  //   },
  //   legend: {
  //     display: false,
  //   },
  // },
  // scales: {
  //   y: {
  //     max: 3.5,

  //   }
  // },
  // barPercentage: 0.4,
};

const labels = ["A", "BBB", "BB"];
export const data = {
  labels: ChartData.map((charts) => charts.year),
  datasets: [
    {
      label: "Dataset 1",
      data: ChartData.map((data) => data.userGain),
      backgroundColor: "#4F81BD",
      barThickness: 10,
      borderColor: [" #E5E5EF"],
      fill: true,
      backgroundColor: "#00E785",

      // borderColor: 'rgba(0,0,0,1)',
      // fillColor: ["rgba(0,10,220,0.5)","rgba(220,0,10,0.5)","rgba(220,0,0,0.5)","rgba(120,250,120,0.5)" ],
      // strokeColor: "rgba(220,220,220,0.8)",
      // highlightFill: "rgba(220,220,220,0.75)",
      // highlightStroke: "rgba(220,220,220,1)",
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
