import React, { useState, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactLoading from "react-loading";
import numeral from "numeral";
import {
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon,
} from "../NftIcon";
import { CustomModal } from "../../common/modal/Modal";
import "./YieldUpgrade.css";
import "../buyOrUpgrade/BuyOrUpgrade.css";
import { OpenModalICon } from "../../common/Icons";

export const FirepitUpgrade = ({
  item,
  costs,
  btnTitle,
  multiplier,
  colorType,
  onPurcharse,
  type = "yield",
  durationDate = 0,
  onSalvage,
  disabled = false,
  isLoading,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [maxLumberLimit, setMaxLumberLimit] = useState(
    (10 - Number(Math.ceil(durationDate))).toString()
  );
  const [lumberCount, setLumberCount] = useState(
    (10 - Number(Math.ceil(durationDate))).toString()
  );
  const colors = [
    "grey",
    "green",
    "yellow",
    "blue",
    "dark-blue",
    "light-yellow",
    "light-blue",
  ];

  useEffect(() => {
    setMaxLumberLimit((10 - Number(Math.ceil(durationDate))).toString());
    setLumberCount((10 - Number(Math.ceil(durationDate))).toString());
  }, [durationDate]);
  
  const activeIcons = [
    <ChargeIcon className="" iconColor="#263238" />,
    <LumberIcon className="" iconColor="#263238" />,
    <BrickIcon className="" iconColor="#263238" />,
    <ConcreteIcon className="" iconColor="#263238" />,
    <SteelIcon className="" iconColor="#263238" />,
  ];
  const disabledIcons = [
    <ChargeIcon className="" iconColor='#00000080' />,
    <LumberIcon className="" iconColor='#00000080' />,
    <BrickIcon className="" iconColor='#00000080' />,
    <ConcreteIcon className="" iconColor='#00000080' />,
    <SteelIcon className="" iconColor='#00000080' />
  ]
  const durationDateNode =
    Number(durationDate) > 1 ? (
      <>
        <span className={`duration-date ${type}`}>
          {numeral(Number(durationDate)).format("0.[00]")}
        </span>{" "}
        days
      </>
    ) : Number(durationDate) === 1 ? (
      <>
        <span className={`duration-date ${type}`}>
          {numeral(Number(durationDate)).format("0.[00]")}
        </span>{" "}
        day
      </>
    ) : (
      <span className={`duration-date ${type}`}>less than 1 day</span>
    );
  

  return (
    <div className="yield-upgrade d-flex flex-column cards-hover-animation">
      <div className="yield-upgrade-content-section">
        <div className="yield-upgrade-content d-flex flex-column align-items-center yield">
          <div className="yield-title w-100 d-flex justify-content-center yield-head">
            <span className="fs-xs text-white fw-600">{item.title}</span>
          </div>
          <div className="d-flex flex-column w-100 yield-upgrade-content-image position-relative">
            <img
              className="position-absolute yield-upgrade-main-image"
              src={item.imgUrl}
              alt={item.title}
            />
            {Number(durationDate) ? (
              <div className="duration-section d-flex w-100 justify-content-between align-items-center align-items-end px-3 py-2 position-absolute">
                <span className="duration">
                  Duration: {durationDateNode} {colorType == 3 && "left"}
                </span>
                <div>
                  {(durationDate == 0) && (
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip
                          id={'tooltip-firepit'}
                        >
                          No lumber loaded. Multiplier not active.
                        </Tooltip>
                      }
                    >
                      <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg"
                        x="0px" y="0px" width="26px" height="26px" viewBox="0 0 20 16" className="cursor-pointer show-alert">
                        <path fill="#D61F33" opacity="0.7" d="M10,0L0,16h20L10,0z M11,13.908H9v-2h2V13.908z M9,10.908v-6h2v6H9z"/>
                      </svg>
                    </OverlayTrigger>
                  )}
                  <div onClick={() => setOpenModal(true)}>
                    <OpenModalICon />
                  </div>
                </div>
              </div>
            ) : (
              <div className="duration-section d-flex w-100 justify-content-end px-4 py-2 position-absolute">
                {(btnTitle == "SALVAGE" && durationDate == 0) && (
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip
                          id={'tooltip-firepit'}
                        >
                          No lumber loaded. Multiplier not active.
                        </Tooltip>
                      }
                    >
                      <svg version="1.2" baseProfile="tiny" xmlns="http://www.w3.org/2000/svg"
                        x="0px" y="0px" width="26px" height="26px" viewBox="0 0 20 16" className="cursor-pointer show-alert">
                        <path fill="#D61F33" opacity="0.7" d="M10,0L0,16h20L10,0z M11,13.908H9v-2h2V13.908z M9,10.908v-6h2v6H9z"/>
                      </svg>
                    </OverlayTrigger>
                  )}
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
              <div className="d-flex align-items-center">
                <span className="status-label">
                  {btnTitle == "BUY" ? "Yield: " : "Load:  "}
                </span>
                <div className="status-value">
                  {btnTitle == "BUY" ? (
                    <>
                      <span className="status-value1">x{multiplier}</span>
                      <span className="status-value1-land"> LAND</span>
                      <span className="status-value2 grey"> /year</span>
                    </>
                  ) : (
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <input
                          className="lumber-count me-1"
                          type="number"
                          step="1"
                          max={maxLumberLimit}
                          value={lumberCount}
                          disabled={btnTitle === "BUY"}
                          onChange={(e) => setLumberCount(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-start align-items-center">
                        <span className="status-label me-1">Remain:</span>
                        <div className="next-cost-icons fw-600 mt-1 yield-cost-value">
                          {`${numeral(Number(durationDate)).format("0.[00]")} `}
                          {activeIcons[1]}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="divider w-100 my-1"></div>
              <div>
                {btnTitle === "BUY" ? (
                  <div className="d-flex align-items-center">
                    <span className="status-label">Cost: </span>
                    <div className="status-value w-100">
                      <div className="d-flex justify-content-between">
                        {costs.map((cost, index) => {
                          if (Number(cost) > 0)
                            return (
                              <div
                                key={`next-cost-${index}`}
                                className="next-cost-icons fw-600 mt-1 yield-cost-value"
                              >
                                {colorType == 0 ? (
                                  <>
                                    {`${cost} `}
                                    {disabledIcons[index]}
                                  </>
                                ) : (
                                  <>
                                    {`${cost} `}
                                    {activeIcons[index]}
                                  </>
                                )}
                              </div>
                            );
                        })}
                        {costs.map((cost, index) => {
                          if (Number(cost) <= 0)
                            return (
                              <div
                                key={`next-empty-${index}`}
                                className="next-cost-icons fw-600 mt-1 yield-cost-value"
                              ></div>
                            );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="d-flex justify-content-start align-items-center">
                    <span className="status-label me-1">Cost:</span>
                    <div className="next-cost-icons fw-600 mt-1 yield-cost-value">
                      {`${numeral(Number('10')).format("0.[00]")} `}
                      {activeIcons[0]}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() =>
                Number(lumberCount) ? onPurcharse(lumberCount) : onSalvage()
              }
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
                <span className="upgrade-status">
                  {btnTitle == "BUY"
                    ? "BUY"
                    : Number(lumberCount)
                    ? "LOAD"
                    : "SALVAGE"}
                </span>
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
          <span className="my-2 mx-3 fs-14 fw-400">{`Add an outdoor fireplace to your property, increasing yields by x${multiplier}. Must load lumber to activate yield multiplier, with 1 lumber being burned per day. Up to 10 lumber can be loaded at one time.`}</span>
        </CustomModal.Body>
      </CustomModal>
    </div>
  );
};
