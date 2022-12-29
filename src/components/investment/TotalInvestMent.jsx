import React from "react";

const TotalInvestMent = () => {
  return (
    <>
      <div className="bg-f5fff7 py-3 py-sm-5 d-flex flex-column text-center justify-content-center">
        <div className="container">
          <div className="col text-center">
            <h2 className="total-invest-text mb-0">
              Total Investment: $170,000
            </h2>
            <p className="fs-18 fs-md-xl-20 fs-sm-16 fw-600 my-1  ">
              Est. 1 Year Return: 16.81%
            </p>

            <div className="my-3 ">
              <a
                href="https://dashboard.landshare.io/dashboard/investment-opportunities"
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <button className="apply-for-white-btn mb-md-0 mb-sm-3">
                  Buy on Dashboard
                </button>
              </a>
            </div>

            <span className="invest-date ">Sale Now Live</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TotalInvestMent;
