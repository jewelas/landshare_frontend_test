import "./Chart.css";
import LineChart from "./LineChart";
import BarChart from "./BarChart";

export default function Chart() {
  return (
    <div className="App mt-4">
      <LineChart />
      <br></br>

      <BarChart />
      {/* <div className="d-flex justify-content-center mt-3">
        <div className="d-flex mr-24">
          <img src={legendrent} style={{ width: "100%" }} />
          <span className="px-2">Rent</span>
        </div>
        <div className="d-flex ">
          <img src={legendapplication} style={{ width: "100%" }} />
          <span className="px-2">Application</span>
        </div>
      </div> */}
    </div>
  );
}
