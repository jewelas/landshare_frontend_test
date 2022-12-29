import React from "react";
import LineChart from "../chart/LineChart";

const Investment = () => {
  return (
    <>
      <div className="container w-80">
        <div className="row justify-content-between">
          <div
            className="
              col-12 col-lg-5
              my-4
              d-flex
              flex-sm-column
              text-center
              align-items-center
              my-auto
            "
          >
            <ul className="list-unstyled text-start">
              <li className="bar-details-heading mt-4">Investment Summary</li>
              <hr className="w-75 hr my-0" />
              <li className="bar-details my-2">
                Property Value:<span className="color-6FCF97"> $340,000</span>
              </li>
              <li className="bar-details my-2">
                Net Rental Value: <span className="color-6FCF97"> $1,724</span>
              </li>
              <li className="bar-details my-2">
                Monthly Rental Value:{" "}
                <span className="color-6FCF97">$2,200</span>
              </li>
              <li className="bar-details my-2">
                Estimated Appreciation: <span className="color-6FCF97">2%</span>
              </li>
              <li className="bar-details my-2">
                Property Taxes: <span className="color-6FCF97">$318</span>
              </li>
              <li className="bar-details my-2">
                Cap Rate: <span className="color-6FCF97"> 6%</span>
              </li>
              <li className="bar-details my-2">
                Homeowners Insurance:{" "}
                <span className="color-6FCF97"> $158</span>
              </li>
            </ul>
          </div>
          <div className="col-12 col-lg-7 my-4">
            <LineChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Investment;
