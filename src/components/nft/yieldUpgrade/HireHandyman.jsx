import React, { useState } from "react";
import ReactLoading from "react-loading";
import numeral from "numeral";
import Web3 from "web3";
import {
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon,
} from "../NftIcon";
import { CustomModal } from "../../common/modal/Modal";
import "./YieldUpgrade.css";
import { OpenModalICon } from "../../common/Icons";

export const HireHandymanUpgrade = ({
  item,
  cost,
  btnTitle,
  colorType,
  onPurcharse,
  type = "yield",
  durationDate = 0,
  disabled = false,
  houseDurability = 0,
  houseMaxDurability = 100,
  isLoading,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const colors = [
    "grey",
    "green",
    "yellow",
    "blue",
    "dark-blue",
    "light-yellow",
    "light-blue",
  ];
  const activeIcons = [
    <ChargeIcon className="" iconColor="#263238" />,
    <LumberIcon className="" iconColor="#263238" />,
    <BrickIcon className="" iconColor="#263238" />,
    <ConcreteIcon className="" iconColor="#263238" />,
    <SteelIcon className="" iconColor="#263238" />,
  ];

  return (
    <div className="yield-upgrade d-flex flex-column cards-hover-animation">
      <div className="yield-upgrade-content-section">
        <div className="yield-upgrade-content d-flex flex-column align-items-center production">
          <div className="yield-title w-100 d-flex justify-content-center yield-head">
            <span className="fs-xs text-white fw-600">{item.title}</span>
          </div>
          <div className="d-flex flex-column w-100 yield-upgrade-content-image position-relative">
            <img
              className="position-absolute yield-upgrade-main-image"
              src={item.imgUrl}
              alt={item.title}
            />
            {durationDate ? (
              <div className="duration-section d-flex w-100 justify-content-between align-items-center align-items-end px-3 py-2 position-absolute">
                <span className="duration">
                  Duration: {durationDateNode} {colorType == 3 && "left"}
                </span>
                <div onClick={() => setOpenModal(true)}>
                  <OpenModalICon />
                </div>
              </div> 
            ) : (
              <div className="duration-section d-flex w-100 justify-content-end px-4 py-2 position-absolute">
                <div onClick={() => setOpenModal(true)}>
                  <OpenModalICon />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="yield-upgrade-cost">
          <div
            className={`d-flex flex-column w-100 buy-or-upgrade-section position-relative ${colors[colorType]}`}
          >
            <div className="d-flex flex-column yield-cost-value-content">
              <div className="d-flex justify-content-start align-items-center">
                <span className="status-label">Restore Durability: </span>
                <span className="status-production">
                  {Number(Web3.utils.fromWei(houseMaxDurability))}%
                </span>
              </div>
              <div className="divider w-100 my-2"></div>
              <div>
                <div>
                  <span className="status-label">Cost: </span>
                  <span
                    className={`status-production ${
                      houseDurability == houseMaxDurability
                        ? "text-grey-800"
                        : ""
                    }`}
                  >
                    1 LAND
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => onPurcharse()}
              className={`btn nav-btn w-100 buy-or-upgrade-btn position-absolute ${
                colors[colorType]
              } ${
                isLoading.type == item.id && isLoading.loading
                  ? "d-flex justify-content-center align-items-center"
                  : ""
              }`}
              disabled={
                disabled || (isLoading.type == item.id && isLoading.loading)
              }
            >
              {isLoading.type == item.id && isLoading.loading ? (
                <>
                  <ReactLoading
                    type="spin"
                    className="me-2 button-spinner"
                    width="24px"
                    height="24px"
                  />
                  <span className="upgrade-status">Loading</span>
                </>
              ) : (
                <span className="upgrade-status">{btnTitle}</span>
              )}
            </button>
          </div>
        </div>
      </div>
      <CustomModal
        modalOptions={{
          centered: true,
          size: "lg",
        }}
        modalShow={openModal}
        setModalShow={setOpenModal}
      >
        <CustomModal.Body className="d-flex min-h-100 justify-content-center align-items-center">
          <span className="my-2 mx-3 fs-14 fw-400">The Hire Handyman consumable allows you to restore your property to 100% once per week for a flat rate of 1 LAND.</span>
        </CustomModal.Body>
      </CustomModal>
    </div>
  );
};
