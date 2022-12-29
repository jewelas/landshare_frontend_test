import React, { useState } from "react";
import numeral from "numeral";
import ReactLoading from "react-loading";
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

export const FireplaceUpgrade = ({
  item,
  cost,
  btnTitle,
  colorType,
  onPurcharse,
  type = "yield",
  durationDate = 0,
  disabled = false,
  isLoading,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [lumberCount, setLumberCount] = useState("10");
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
  const disabledIcons = [
    <ChargeIcon className="" iconColor='#00000080' />,
    <LumberIcon className="" iconColor='#00000080' />,
    <BrickIcon className="" iconColor='#00000080' />,
    <ConcreteIcon className="" iconColor='#00000080' />,
    <SteelIcon className="" iconColor='#00000080' />
  ]

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
                <span className="status-label">
                  {btnTitle == "BUY" ? "Burn lumber for power: " : "Consume: "}
                </span>
                {btnTitle == "BUY" ? (
                  <span className="status-production">
                    {cost.burnRatio / 100} {activeIcons[0]} / 1 {activeIcons[1]}
                  </span>
                ) : (
                  <input
                    className="lumber-count"
                    type="number"
                    value={lumberCount}
                    disabled={btnTitle === "BUY"}
                    onChange={(e) => setLumberCount(e.target.value)}
                  />
                )}
              </div>
              <div className="divider w-100 my-2"></div>
              <div>
                {btnTitle === "BUY" ? (
                  <div className="d-flex align-items-center">
                    <span className="status-label">Cost: </span>
                    <span className="status-value">
                      {cost.cost.map((cost, index) => {
                        if (Number(cost) > 0)
                          return (
                            <div
                              key={`next-cost-${index}`}
                              className={`next-cost-icons fw-600 yield-cost-value ${colors[colorType]}`}
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
                      {cost.cost.map((cost, index) => {
                        if (Number(cost) <= 0)
                          return (
                            <div
                              key={`next-empty-${index}`}
                              className="next-cost-icons"
                            ></div>
                          );
                      })}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className="status-label">Recive: </span>
                    <span className="status-production">
                      {numeral(
                        (Number(lumberCount) * cost.burnRatio) / 100
                      ).format("0.[00]")}{" "}
                      {activeIcons[0]}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => onPurcharse(lumberCount)}
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
          <span className="my-2 mx-3 fs-14 fw-400">{`Burn lumber for power with the Firepit upgrade. Each lumber generates ${
            Number(cost.burnRatio) / 100
          } power.`}</span>
        </CustomModal.Body>
      </CustomModal>
    </div>
  );
};
