import React, { useEffect, useState } from "react";
import Web3 from "web3";
import numeral from "numeral";
import { withRouter } from "react-router-dom";
import HouseNft from "../../../assets/img/house/house_big.bmp";
import HouseRareNft from "../../../assets/img/house/house_rare_big.bmp";
import HouseLandNft from "../../../assets/img/house/house_land_big.bmp";
import HouseLandRareNft from "../../../assets/img/house/house_land_rare_big.bmp";
import HouseGardenNft from "../../../assets/img/house/house_garden_big.bmp";
import HouseGardenRareNft from "../../../assets/img/house/house_garden_rare_big.bmp";
import { ReparingStatus } from "../../nft/reparingStatus/ReparingStatus";
import {
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon,
  InfoIcon,
} from "../../nft/NftIcon";
import "./NftItem.css";

import { useLandshareFunctions } from "../../../contexts/LandshareFunctionsProvider";

const { fromWei } = Web3.utils;

const NftItem = ({ history, tokenId, house }) => {
  const { state } = useLandshareFunctions();
  const [multiplier, setMultiplier] = useState("0");
  
  
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

  useEffect(() => {
    const getdata = async () => {
      if (state.houseNFT) {
        const houseDetails = await state.helper.methods.getHouseDetails(tokenId).call();
        setMultiplier(houseDetails[2]);
      }
    }
    return getdata()
  }, [state]);

  const getHouseImageUrl = () => {
    if (house) {
      if (house.isRare) {
        if (house.activated && house.hasAddon[1]) {
          if (house.hasAddon[2] && (Number(house.expireGardenTime)*1000) > Date.now()) {
            return HouseGardenRareNft;
          } else {
            return HouseLandRareNft;
          }
        } else {
          return HouseRareNft;
        }
      } else {
        if (house.activated && house.hasAddon[1]) {
          if (house.hasAddon[2] && (Number(house.expireGardenTime)*1000) > Date.now()) {
            return HouseGardenNft;
          } else {
            return HouseLandNft;
          }
        } else {
          return HouseNft;
        }
      }
    }

    return HouseNft;
  }
  
  return (
    <div className="nft-house-item cards-hover-animation d-flex flex-column">
      <div className="nft-house-header position-relative">
        <div className="nft-house-title position-absolute top-0 w-100 text-center p-2">
          {house.name.length > 10 ? 
            `${house.name.slice(0, 10)}... ${house.isRare ? `Rare #${(Number(house.rareId) + 1)}` : `#${(Number(tokenId) + 1)}`}` 
          : `${house.name} ${house.isRare ? `Rare #${(Number(house.rareId) + 1)}` : `#${(Number(tokenId) + 1)}`}`}
        </div>
        <img
          className="nft_img"
          src={ getHouseImageUrl() }
          alt="nft-house-image"
        />
        <div className="d-flex align-items-end position-absolute w-100 justify-content-between nft-card-current-multipler">
          <div className="current-multiplier">
            <span className="value fs-14 fw-600">
              x
              {multiplier > 999999999999? numeral(fromWei(Math.floor(multiplier).toString()))
                      .format("0.[00]")
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}{" "}
            </span>
            <span className="label fw-600">LAND &nbsp;Yield/Year</span>
          </div>
          {/* <div className="mb-1 info-icon">
            <InfoIcon />
          </div> */}
        </div>
      </div>
      <div className="nft-house-body d-flex flex-column p-3">
        <div className="nft-house-content">
          <div className="d-flex justify-content-between nft-house-durability align-items-end">
            <div className="house-item-label1 fs-15 fw-600">Durability</div>
            <ReparingStatus
              max={fromWei(house.maxDurability).toString()}
              now={fromWei(house.currentDurability).toString()}
              usePercentWidth={true}
            />
          </div>
          <div className="nft-house-facility-level py-2 pr-1">
            {house.facilityLevel.map((facility, index) => {
              if (facility > 0) {
                return (
                  <div
                    className="d-flex align-items-center nft-house-facility-haslevel"
                    key={`nft-house-facility-${index}`}
                  >
                    <div>{activeIcons[index]}</div>
                    <div className="ms-2 nft-house-facility-value fs-15 fw-600">{`Lv. ${facility}`}</div>
                  </div>
                );
              } else {
                return (
                  <div
                    className="d-flex align-items-center nft-house-facility-nonelevel"
                    key={`nft-house-facility-${index}`}
                  >
                    <div>{disabledIcons[index]}</div>
                    <div className="ms-2 nft-house-facility-value fs-15 fw-600">{`Lv. ${facility}`}</div>
                  </div>
                );
              }
            })}
          </div>
          <div className="d-flex justify-content-between align-items-end pe-2">
            <div className="house-item-label2 fs-xxs fw-600">
              Token Deposited:
            </div>
            <div className="house-item-value fs-xxs fw-600">{`${house.depositedBalance} LSNF`}</div>
          </div>
          <div className="d-flex justify-content-between align-items-end pe-2">
            <div className="house-item-label2 fs-xxs fw-600">
              Harvest Amount:
            </div>
            <div className="house-item-value fs-xxs fw-600">{`${numeral(
              Number(fromWei(house.tokenReward).toString())
            ).format("0.[00]")} LAND`}</div>
          </div>
        </div>
        <div className="nft-house-selectable d-flex justify-content-center pt-2">
          <button
            className="btn nav-btn fs-16 fw-600 cursor-pointer"
            onClick={() => history.push(`/nft/${tokenId}`)}
          >
            SELECT
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(NftItem);
