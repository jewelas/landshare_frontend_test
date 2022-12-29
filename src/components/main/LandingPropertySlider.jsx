import React from "react";
import { withRouter } from "react-router-dom";
import sliderImage from "../../assets/img/base-images/front-webp-img.webp";

const LandingPropertySlider = ({ history }) => {
  return (
    <>
      <div className="container pt-5 mt-0 mt-sm-5">
        <div>
          <div className="d-flex flex-column">
            {/* COMING SOON IN TOP  */}
            <div className="header-coming-soon">Current Offering</div>

            <div className="d-flex flex-column flex-md-row">
              <div className="col-12 col-md-6 p-0">
                <img
                  className="w-100 current-image-dimensions"
                  src={sliderImage}
                  alt="sliderImage"
                />
              </div>
              <div className="col-12 col-md-6 p-0 bg-white">
                <div className="d-flex flex-column align-items-center justify-content-center px-3 px-sm-5 px-md-0 py-3 mx-0 mx-sm-3 h-100">
                  <h5 className="text-center slider-main-heading">
                    817 12th Ave N <br /> Fargo, ND 58102
                  </h5>
                  <div className="d-flex px-3 w-100 justify-content-between mb-1 mt-2 mt-md-3 small-size-table">
                    <span>Min Investment:</span> <span>$50</span>
                  </div>
                  <div className="d-flex px-3 w-100 justify-content-between small-size-table">
                    <span>Est. 1-Year Return:</span> <span>16.94%</span>
                  </div>

                  <div className="mt-4 px-3 w-100 d-flex justify-content-center  align-items-center ">
                    <button
                      onClick={() => history.push("/property-details")}
                      className="view-property-btn text-nowrap "
                    >
                      View Property
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(LandingPropertySlider);
