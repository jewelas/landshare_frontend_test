import React from "react";
import BarChart from "../chart/BarChart";

const EstimatedAnnual = () => {
  return (
    <>
      <div className="container w-80 my-4">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-6 order-1 order-lg-0">
            <BarChart />
          </div>
          <div
            className="
              col-12 col-lg-5
              my-4
              d-flex
              flex-sm-column
              text-center
              align-items-center
              my-auto
              order-0 order-lg-1
            "
          >
            <ul className="list-unstyled text-start mt-4">
              <li className="bar-details-heading my-0">
                Estimated Annual Yields
              </li>
              <hr className="w-75 hr my-0" />
              <li className="bar-details my-2">
                Appreciation:<span className="color-6FCF97"> $6,920</span>
              </li>
              <li className="bar-details my-2">
                BUSD Return: <span className="color-6FCF97"> 13%</span>
              </li>
              <li className="bar-details my-2">
                Rental Value: <span className="color-6FCF97"> $20,689</span>
              </li>
              <li className="bar-details my-2">
                LAND Token Return: <span className="color-6FCF97">0% </span>
              </li>
              <li className="bar-details my-2">
                Yield Bonus: <span className="color-6FCF97">$17,300</span>
              </li>
              <li className="bar-details my-2">
                Total Vault ROI: <span className="color-6FCF97">13%</span>
              </li>
              <li className="bar-details my-2">
                Total Value: <span className="color-6FCF97"> $44,909 </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default EstimatedAnnual;
