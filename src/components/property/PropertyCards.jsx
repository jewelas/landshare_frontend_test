import React from "react";
import infoicon from "../../assets/img/info-icon.svg";

const PropertyCards = () => {
  return (
    <>
      <div
        className="
            col-12 col-xl-6
            mt-5
            mb-3
            d-flex
            justify-content-center
            align-items-center
          "
      >
        <div className="cards-bg w-100">
          <p className="card-heading text-center">
            2750 Greenway St, Toledo, OH 41607
          </p>
          <div className="row justify-content-center justify-content-lg-between justify-content-xl-around">
            <div
              className="
                  col-6 col-sm-4  col-xl-6
                  card-br-right
                  border-end border-1 border-dark
                "
            >
              <p className="pricing-text mb-0 text-start">Total Price</p>
              <p className="mx-4 dollar-text">$$$$</p>
            </div>
            <div className="col-6 col-sm-4 col-xl-6">
              <p className="pricing-text mb-0 text-end">Token Price</p>
              <p className="mx-4 text-end dollar-text">$$$$</p>
            </div>
          </div>

          <p
            className="
                d-flex
                justify-content-between
                br-bottom
               mt-2rem
                Expected-text
              "
          >
            <span>
              Expected Yield
              <img className="px-2" src={infoicon} alt="" />
            </span>
            <span>10%</span>
          </p>
          <p className="d-flex justify-content-between br-bottom card-text">
            <span>Gross Rent</span>
            <span className="cards-side-font">$50,00/year</span>
          </p>
          <p className="d-flex justify-content-between  mb-4 card-text">
            <span>
              Rent Per Token
              <img className="px-2" src={infoicon} alt="" />
            </span>
            <span className="cards-side-font">$10/year</span>
          </p>

          <div className="d-flex justify-content-center">
            <button className="View-property-btn">View Property</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCards;
