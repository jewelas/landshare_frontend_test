import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  {
    name: "Jul",
    uv: 1800,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Aug",
    uv: 2000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Sep",
    uv: 1600,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Oct",
    uv: 1100,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Nov",
    uv: 1000,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Dec",
    uv: 800,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Jan",
    uv: 700,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Feb",
    uv: 1000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Mar",
    uv: 1200,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Apr",
    uv: 1500,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "May",
    uv: 1600,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Jun",
    uv: 3600,
    pv: 4300,
    amt: 2100,
  },
];

function LineChart() {
  return (
    <div className="border p-xl-3 p-2">
      <h6 className="area-text ">Area Maket Trends</h6>
      <span className="b-bottom"></span>
      <div className="d-flex justify-content-center align-items-center">
        <span className="circle"></span>
        <p className="median-text mb-0 ps-2">Median List Price (1Y)</p>
      </div>
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="50%" stopColor="#219653" stopOpacity={0.4} />
              <stop offset="60%" stopColor="#219653" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="uv"
            stroke="#219653"
            strokeWidth={2}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export default LineChart;

// import React from "react";
// import { Line } from "react-chartjs-2";
// import legendrent from "../../assets/img/icons/bar_legent_rent.png";
// import legendapplication from "../../assets/img/icons/bar_chart_application.png";

// const LineChart = () => (
//   <>
//     <div className="fs-28 fw-600 br-b mb-5 pb-1">
//       Area Market Trends
//     </div>
//     <div className="h-250">
//       <Line
//         data={dataLine}
//         options={{
//           maintainAspectRatio: true,
//           legend: {
//             display: false,
//           },
//         }}
//       />
//     </div>
//   </>
// );

// const dataLine = {
//   labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   datasets: [
//     {
//       label: "Median List Price (1Y)",
//       data: [
//         260000, 261000, 258000, 256000, 256000, 257000, 254000, 254000, 254000,
//         263000, 273000, 279000,
//       ],
//       fill: false,
//       backgroundColor: "#1f78b4",
//       borderColor: "#1f78b4",
//       height: 1500,
//       tension: 0.6,
//       pointStyle: "line"
//     },
//   ],
//   options: {
//     scaleShowLabels: false,
//   },
// };

// export default LineChart;
