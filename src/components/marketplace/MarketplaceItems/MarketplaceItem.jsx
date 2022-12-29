import React from "react";
import Web3 from "web3";
import numeral from "numeral";
import { withRouter } from "react-router-dom";
import Nft1 from "../../../assets/img/house/nftList1.png";
import { ReparingStatus } from "../../nft/reparingStatus/ReparingStatus";
import {
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon,
} from "../../nft/NftIcon";
import "./MarketplaceItem.css";
import { InfoIconMarketPlaceItem } from "../../common/Icons";

const { fromWei } = Web3.utils;

const MarketplaceItem = ({ history, marketplaceId, marketplace }) => {
  const disabledIcons = [
    <ChargeIcon className="" iconColor="#767e8280" />,
    <LumberIcon className="" iconColor="#767e8280" />,
    <BrickIcon className="" iconColor="#767e8280" />,
    <ConcreteIcon className="" iconColor="#767e8280" />,
    <SteelIcon className="" iconColor="#767e8280" />,
  ];
  const activeIcons = [
    <ChargeIcon className="" iconColor="#767E82" />,
    <LumberIcon className="" iconColor="#767E82" />,
    <BrickIcon className="" iconColor="#767E82" />,
    <ConcreteIcon className="" iconColor="#767E82" />,
    <SteelIcon className="" iconColor="#767E82" />,
  ];

  return (
    <div className="marketplace-item cards-hover-animation d-flex flex-column">
      <div className="marketplace-header position-relative">
        <div className="marketplace-title position-absolute top-0 w-100 text-center p-2">
          {`Property #${marketplaceId}`}
        </div>
        <img src={Nft1} alt="marketplace-image" />
        <div className="d-flex align-items-end position-absolute w-100 justify-content-between card-current-multipler">
          <div className="current-multiplier">
            <span className="value fs-14 fw-600">
              x
              {numeral(
                Number(fromWei(marketplace.multiplier).toString())
              ).format("0.[00]")}{" "}
            </span>
            <span className="label fw-600">LAND &nbsp;Yield/Year</span>
          </div>
          <div className="mb-1 info-icon">
            <InfoIconMarketPlaceItem />
          </div>
        </div>
      </div>
      <div className="marketplace-body d-flex flex-column p-3">
        <div className="d-flex flex-column justify-content-between marketplace-content">
          <div className="d-flex durability-box flex-column w-100">
            <div className="d-flex justify-content-between marketplace-durability align-items-end">
              <div className="marketplace-item-label1 fs-15 fw-600">
                Durability
              </div>
              <ReparingStatus
                max={fromWei(marketplace.maxDurability).toString()}
                now={fromWei(marketplace.currentDurability).toString()}
                usePercentWidth={true}
              />
            </div>
            <div className="marketplace-facility-level py-2 pr-1">
              {marketplace.facilityLevel.map((facility, index) => {
                if (facility > 0) {
                  return (
                    <div
                      className="d-flex mx-auto mx-sm-0 align-items-center marketplace-facility-haslevel"
                      key={`marketplace-facility-${index}`}
                    >
                      <div>{activeIcons[index]}</div>
                      <div className="ms-2 marketplace-facility-value fs-15 fw-600">{`Lv. ${facility}`}</div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      className="d-flex mx-auto mx-sm-0 align-items-center marketplace-facility-nonelevel"
                      key={`marketplace-facility-${index}`}
                    >
                      <div>{disabledIcons[index]}</div>
                      <div className="ms-2 marketplace-facility-value fs-15 fw-600">{`Lv. ${facility}`}</div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <span className="show-nft-detail fs-14 fw-500 cursor-pointer">
            {marketplace.activated ? ">View NFT Page" : ">View Details"}
          </span>
        </div>
        <div
          className={`d-flex pt-3 w-100 justify-content-sm-end marketplace-buy ${
            marketplace.activated ? "market-active" : "market-buy"
          }`}
        >
          <div className="d-flex switch-btn  active align-items-center position-relative">
            <span className="d-flex fs-14 text-black-700 align-items-end justify-content-center">
              <span className="fs-14 fw-600">{marketplace.tokenReward}</span>
              <span className="fs-10 fw-600 ms-1"> LAND</span>
            </span>
            <button
              onClick={() => {}}
              disabled={marketplace.activated}
              className="btn btn-switch-sale fs-16 fw-700 d-flex align-items-center justify-content-center position-absolute"
            >
              {marketplace.activated ? "OWNED" : "BUY"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MarketplaceItem);
