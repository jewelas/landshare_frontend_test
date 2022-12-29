import React from "react";
import Slider from "../common/Slider";

const CarouselDetails = () => {
  return (
    <>
      <div className="container">
        <div className="row mt-lg-5 pt-lg-4">
          <div className="col-lg-6 col-12 mt-4 order-lg-0 order-1">
            <Slider />
          </div>
          <div className="col-lg-6 col-12 mt-4 order-lg-1 order-0 pe-lg-5">
            <h1 className="north-dakota mb-1">North Dakota</h1>
            <p className="usa">USA</p>
            <button className="specification green-outline-btn-hover py-2 px-28 my-2 me-2">
              6 bedrooms
            </button>
            <button
              className="
                specification
                green-outline-btn-hover
                py-2
                px-28 px-full
                my-2
              "
            >
              3 bath
            </button>
            <br />
            <button className="specification green-outline-btn-hover py-2 px-37 my-2 me-2">
              2900 sqft
            </button>
            <button className="specification green-outline-btn-hover py-2 px-28 my-2">
              Built in 1970's
            </button>
            <p className="Description mb-0 pt-4 pt-lg-0">Description</p>
            <hr className="w-100 hr my-0" />
            <p className="para mb-4">
              A spacious 3-story house including
              <span className="highlishts">
                6 bedrooms, 3 bathrooms, 2 stall garage,
              </span>
              and more than
              <span className="highlishts"> 2,900 sqft</span> of livable area.
              This property features a newly remodeled kitchen with granite
              countertops, new stainless steel appliances, and plenty of natural
              lighting. The basement has been renovated to include a large
              family room, 2 bedrooms, and a private bath. The main level offers
              access to a large yard with privacy fencing including a fully
              furnished patio complete with fireplace located directly off the
              dining room. With these fresh renovations, new paint and flooring,
              there is nothing not to love about this property.
            </p>
          </div>
        </div>
        <div className="row mb-lg-5">
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

export default CarouselDetails;
