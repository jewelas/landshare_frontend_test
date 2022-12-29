import React from "react";
import { SquareFootageIcon } from "../common/Icons";
import InvestmentAccordian from "./InvestmentAccordian";
import TableAccordian from "./TableAccordian";

const InvestementTable = () => {
  return (
    <>
      <div className="container py-3 py-sm-5 my-2 px-2 w-65">
        <div className="row">
          <div className="col-12 col-lg-6">
            <div className="d-flex flex-column">
              <div className="box-shadow mb-3">
                <p className="fs-26 fs-sm-20 fw-600 mb-4">Investment Summary</p>
                <InvestmentAccordian />

                <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                  <span className="mb-3 fw-600">Net Annual Cash Flow</span>
                  <span className="mb-3 fw-400">$13,587.24</span>
                </p>
                <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                  <span className="mb-3 fw-600">Est. Net 1-Year Appreciation</span>
                  <span className="mb-3 fw-400">$15,000</span>
                </p>
                <p className="fs-18 fs-sm-16 fw-600  d-flex justify-content-between ">
                  <span className="mb-3">Est. 1 Year Return</span>
                  <span className="mb-3">16.81%</span>
                </p>

                <p className="fw-400 fs-14 fst-italic">
                Note: Net appreciation is assessed based on market 
                projections and renovation return estimates, minus 
                the renovation budget. Estimations are subject to 
                change at any time.
                </p>
              </div>

              <div className="box-shadow">
                <p className="fs-26 fs-sm-20 fw-600 mb-4">Property Details</p>

                <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                  <span className="mb-3 fw-600">Construction Year</span>
                  <span className="mb-3 fw-400">1941</span>
                </p>
                <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                  <span className="mb-3 fw-600">
                    Square Footage
                    <span className="ms-1">
                      <SquareFootageIcon />
                    </span>
                  </span>
                  <span className="mb-3 fw-400">1,500 sqft</span>
                </p>
                <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                  <span className="mb-3 fw-600">Total units</span>
                  <span className="mb-3 fw-400">1 Unit</span>
                </p>
                <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                  <span className="mb-3 fw-600">Bedroom/Bath</span>
                  <span className="mb-3 fw-400">3/2</span>
                </p>
                <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                  <span className="mb-3 fw-600">Rental Status</span>
                  <span className="mb-3 fw-400">Occupied Nov 1st</span>
                </p>
                <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                  <span className="mb-3 fw-600">Property Type</span>
                  <span className="mb-3 fw-400">Single Family</span>
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 ">
            <div className="box-shadow my-3 my-lg-0 ">
              <p className="fs-26 fs-sm-20 fw-600 mb-4">Financials</p>

              <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                <span className="mb-3 fw-600">Gross Rent per Year</span>
                <span className="mb-3 fw-400">$16,800.00</span>
              </p>
              <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 mb-2">
                <span className="mb-3 fw-600">Gross Rent per Month </span>
                <span className="mb-3 fw-400">$1,400.00</span>
              </p>

              <div className="table-accordian">
                <TableAccordian />
              </div>

              {/* ACCORDIAN  */}

              <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                <span className="mb-3 mt-3 fw-600">Net Rent per Month</span>
                <span className="mb-3 mt-3 fw-400">$1,132.27</span>
              </p>
              <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                <span className="mb-3 fw-600">Net Annual Rent</span>
                <span className="mb-3 fw-400">$13,587.24</span>
              </p>
              <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                <span className="mb-3 fw-600">Payout Period</span>
                <span className="mb-3 fw-400">Monthly</span>
              </p>
              <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                <span className="mb-3 fw-600">
                  Rental Yield/Token{" "}
                  <span className="ms-1">
                    <img src="./assets/img/info-icon.svg" alt="" />
                  </span>
                </span>
                <span className="mb-3 fw-400">$3.99/year</span>
              </p>
              <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                <span className="mb-3 fw-600">Token Price</span>
                <span className="mb-3 fw-400">$50.00</span>
              </p>
              <p className="fs-15 fs-sm-14  d-flex justify-content-between br-bottom-1 ">
                <span className="mb-3 fw-600">Total Tokens</span>
                <span className="mb-3 fw-400">3,400</span>
              </p>
              <p className="fs-18 fs-md-xl-20 fs-sm-16 fw-600  d-flex justify-content-between  ">
                <span className="mb-3">Cash On Cash Return </span>
                <span className="mb-4">7.98%</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestementTable;
