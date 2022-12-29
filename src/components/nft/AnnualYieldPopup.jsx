import React, { useRef } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

import SteelSiding from "../../assets/img/steelSiding.png";
import { SliderNextIcon, SliderPrevIcon } from "../common/Icons";

import { BlackChargeIcon, EditBlackIcon, LikeEditIcon } from "./NftIcon";
const AnnualYieldPopup = () => {
  const slider = useRef();
  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 2,
    dots: false,
    dotsClass: "adson-slick-dots slick-thumb",
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 578,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={`position-relative`}>
      <div className="model-wrapper">
        <div className="d-flex w-100 px-3 py-4 align-items-center justify-content-between">
          <h3 className="m-0 fs-sm text-black-800">Total Annual Yields </h3>
          <h1 className="m-0 land-heading">125 LAND</h1>
        </div>
        <div className="divider light-line"></div>
        <div className="position-relative">
          <button
            onClick={() => slider?.current?.slickPrev()}
            className="prev top-43 next-prev bg-transparent border-0"
          >
            <SliderPrevIcon />
          </button>

          <button
            onClick={() => slider?.current?.slickNext()}
            className="next top-43 next-prev bg-transparent border-0"
          >
            <SliderNextIcon />
          </button>
          <div className="px-md-2 py-5 px-2">
            <div className="mx-4 overflow-hidden">
              <Slider ref={slider} {...settings}>
                {" "}
                <div className="px-2">
                  <div className="model-post-box d-flex justify-content-center py-4">
                    <img src={SteelSiding} alt="" />
                  </div>
                  <p className="fs-xs m-0 mt-1 ">Steel siding</p>
                  <h2 className="fs-sm m-0 font-semibold text-green">
                    {" "}
                    10 LAND
                  </h2>
                </div>{" "}
                <div className="px-2">
                  <div className="model-post-box d-flex justify-content-center py-4">
                    <img src={SteelSiding} alt="" />
                  </div>
                  <p className="fs-xs m-0 mt-1 ">Steel siding</p>
                  <h2 className="fs-sm m-0 font-semibold text-green">
                    {" "}
                    10 LAND
                  </h2>
                </div>{" "}
                <div className="px-2">
                  <div className="model-post-box d-flex justify-content-center py-4">
                    <img src={SteelSiding} alt="" />
                  </div>
                  <p className="fs-xs m-0 mt-1 ">Steel siding</p>
                  <h2 className="fs-sm m-0 font-semibold text-green">
                    {" "}
                    10 LAND
                  </h2>
                </div>{" "}
                <div className="px-2">
                  <div className="model-post-box d-flex justify-content-center py-4">
                    <img src={SteelSiding} alt="" />
                  </div>
                  <p className="fs-xs m-0 mt-1 ">Steel siding</p>
                  <h2 className="fs-sm m-0 font-semibold text-green">
                    {" "}
                    10 LAND
                  </h2>
                </div>{" "}
                <div className="px-2">
                  <div className="model-post-box d-flex justify-content-center py-4">
                    <img src={SteelSiding} alt="" />
                  </div>
                  <p className="fs-xs m-0 mt-1 ">Steel siding</p>
                  <h2 className="fs-sm m-0 font-semibold text-green">
                    {" "}
                    10 LAND
                  </h2>
                </div>{" "}
                <div className="px-2">
                  <div className="model-post-box d-flex justify-content-center py-4">
                    <img src={SteelSiding} alt="" />
                  </div>
                  <p className="fs-xs m-0 mt-1 ">Steel siding</p>
                  <h2 className="fs-sm m-0 font-semibold text-green">
                    {" "}
                    10 LAND
                  </h2>
                </div>{" "}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualYieldPopup;
