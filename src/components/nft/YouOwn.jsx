import React from "react";
import Web3 from "web3";
import numeral from "numeral";
import { useHistory } from "react-router-dom";
import {
  AddICon,
  LogoIcon,
  EnergyIcon,
  Lumber,
  Brick,
  Concrete,
  Steel,
} from "./NftIcon";
const { fromWei } = Web3.utils;

const YouOwn = ({ resource, maxPowerLimit ,landTokenBalance }) => {
  let history = useHistory();
  const styleObject = {
    maxWidth: "220px",
    width: "100%",
  };
  return (
    <section className="youown-section py-3">
      <div className="d-flex justify-content-center">
        <div className="container">
          <div className="d-flex flex-wrap">
            <span
              style={styleObject}
              className="mb-2 d-inline-block text-grey-800 fw-600"
            >
              You own:
            </span>
            <div className="flex-grow-1 d-flex flex-wrap ">
              <div className="d-flex mb-3 flex-grow-1 flex-column">
                <div className="d-flex align-items-center flex-grow-1">
                  <LogoIcon />
                  <span
                    style={{ minWidth: "133px" }}
                    className="d-inline-block ps-2 pe-3 fw-bold fs-sm"
                  >
                    {landTokenBalance>999999999999? numeral(fromWei(landTokenBalance.toString()))
                      .format("0.[00]")
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}{" "}
                    <span className="fs-xs">LAND</span>
                  </span>
                  <span
                    className="cursor-pointer btn-buy-resources"
                    onClick={() => history.push("/nft/resources")}
                  >
                    +
                  </span>
                </div>
                <div className="d-flex mt-3 align-items-center flex-grow-1">
                  <span className="">
                    <EnergyIcon />
                  </span>
                  <span
                    style={{ minWidth: "133px" }}
                    className="d-inline-block ps-2 pe-3 fw-bold fs-sm"
                  >
                    {resource[0]>999999999999? numeral(fromWei(resource[0].toString()))
                      .format("0.[00]")
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ","):"0"}{" "}
                    /{" "}
                    {maxPowerLimit>999999999999? numeral(Number(fromWei(maxPowerLimit.toString())))
                      .format("0.[00]")
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ","):"0"}{" "}
                    <span className="fs-xs">Power</span>
                  </span>
                  <span
                    className="cursor-pointer btn-buy-resources"
                    onClick={() => history.push("/nft/resources")}
                  >
                    +
                  </span>
                </div>
              </div>
              <div className="d-flex mb-3 flex-grow-1 flex-column">
                <div className="d-flex align-items-center flex-grow-1">
                  <Lumber />
                  <span className="d-inline-block ps-2 pe-3 fw-bold fs-sm">
                    {resource[1]>999999999999? numeral(fromWei(resource[1].toString()))
                      .format("0.[00]")
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ","):"0"}{" "}
                    <span className="fs-xs">Lumber</span>
                  </span>
                </div>
                <div className="d-flex mt-3 align-items-center flex-grow-1">
                  <span className="">
                    <Brick />
                  </span>
                  <span className="d-inline-block ps-2 pe-3 fw-bold fs-sm">
                    {resource[2]>999999999999? numeral(fromWei(resource[2].toString()))
                      .format("0.[00]")
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ","):"0"}{" "}
                    <span className="fs-xs">Brick</span>
                  </span>
                </div>
              </div>
              <div className="d-flex mb-3 flex-grow-1 flex-column">
                <div className="d-flex align-items-center flex-grow-1">
                  <Concrete />
                  <span className="d-inline-block ps-2 pe-3 fw-bold fs-sm">
                    {resource[3]>999999999999? numeral(fromWei(resource[3].toString()))
                      .format("0.[00]")
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ","):"0"}{" "}
                    <span className="fs-xs">Concrete</span>
                  </span>
                </div>
                <div className="d-flex mt-3 align-items-center flex-grow-1">
                  <span className="">
                    <Steel />
                  </span>
                  <span className="d-inline-block ps-2 pe-3 fw-bold fs-sm">
                    {resource[4]>999999999999? numeral(fromWei(resource[4].toString()))
                      .format("0.[00]")
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ","):"0"}{" "}
                    <span className="fs-xs">Steel</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouOwn;
