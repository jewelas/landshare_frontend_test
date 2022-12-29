import React, { useState } from "react";
import Chart from "react-apexcharts";
function BarChart() {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
        background: "#00000",
      },
    },
    responsive: [
      {
        breakpoint: 1200,
        options: {},
      },
    ],
    xaxis: {
      categories: [
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
      ],
    },
    fill: {
      colors: ["#6FCF97"],
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {},
      },
    ],
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });
  return (
    <div className="border p-xl-3 p-2">
      <h6 className="area-text ">Area Maket Trends</h6>
      <span className="b-bottom"></span>
      <div className="d-flex justify-content-center align-items-center">
        <span className="circle-barchart"></span>
        <p className="median-text mb-0 ps-2">Price Per Square Foot (1Y)</p>
      </div>
      <Chart options={state} series={state.series} type="bar" width="100%" />
    </div>
  );
}
export default BarChart;

// import { Bar } from "react-chartjs-2";
// import legendrent from "../../assets/img/icons/bar_legent_rent.png";
// import legendapplication from "../../assets/img/icons/bar_chart_application.png";

// const dataBar = {
//   labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan",
//     "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
//   datasets: [
//     {
//       label: "Price Per Square Foot (1Y)",
//       backgroundColor: "#a6cee3",
//       borderColor: "rgba(255,99,132,0)",
//       borderWidth: 1,
//       hoverBackgroundColor: "#a6cee3",
//       hoverBorderColor: "rgba(255,99,132,1)",
//       data: [211, 213, 215, 216, 214, 214, 213, 213, 220, 223, 233, 234, 234],
//     },

//   ],
// };

// const options = {
//   maintainAspectRatio: false,
//           scales: {
//             y:{
//               min: 210,
//               max: 240
//             }
//         }
// }
// export default function BarChart() {
//   return (
//     <div style={{ height: "300px" }}>
//       <Bar
//         data={dataBar}
//         options={options}
//       />
//     </div>
//   );
// }
