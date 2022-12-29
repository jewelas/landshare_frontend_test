import React from "react";

const ProgressBar = () => {
  return (
    <>
      <div className="container w-80">
        <div className="row mb-lg-5 align-items-center">
          <div className="col-lg-6 col-12 mb-4">
            <div className="text-center tokens my-3 pt-4">
              Tokens Sold: xxxx/xxxx
            </div>
            <div className="progress">
              <div
                className="bg-dark progress-bars"
                style={{ height: "15px", width: "43%" }}
              ></div>
            </div>
          </div>
          <div className="col-lg-6 col-12 mb-4 mt-auto">
            <div className="text-center">
              <button className="px-5 my-2 py-2 me-sm-3 buy-sell green-btn-hover">
                Buy
              </button>
              <button className="px-5 py-2 ms-sm-3 my-2 buy-sell green-btn-hover">
                Sell
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressBar;
