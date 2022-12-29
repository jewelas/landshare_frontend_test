import React, { useState } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { YieldCostUpgrade } from "../buyOrUpgrade/YieldCostUpgrade";
import { YieldCostContent } from "../buyOrUpgrade/YieldCostContent";
import { ProductionCostContent } from "../buyOrUpgrade/ProductionCostContent";
import { CustomModal } from "../../common/modal/Modal";
import "./YieldUpgrade.css";
import { OpenModalICon } from "../../common/Icons";

String.prototype.stringToSlug = function () {
  var str = this; // <-- added this statement

  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();
  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes
  return str;
};

export const YieldUpgrade = ({
  item,
  cost,
  multiplier = "",
  btnTitle,
  colorType,
  message = "",
  onPurcharse,
  type = "yield",
  durationDate = 0,
  disabled = false,
  className = "",
  isLoading,
  showAlert = false,
  durationTime,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const descriptions = {
    "Hardwood Floors": `Install natural hardwood floors to your property. Increases LAND yields by x${
      multiplier ?? ""
    }. Increase lumber repair cost by 1 per 10% repaired.`,
    Landscaping: `Add brick landscaping to your property. Unlocks the Garden upgrade and increases LAND yields by x${
      multiplier ?? ""
    }. Increase brick repair cost by 1 per 10% repaired.`,
    Garden: `Add a garden to your property for ${
      durationDate ?? ""
    } days. Requires the landscaping upgrade. Increases LAND yields by x${
      multiplier ?? ""
    }.`,
    Trees: `Plant additional trees on your property, increasing LAND yields by x${
      multiplier ?? ""
    }. Allows user to gather up to 3 lumber per day using the Gather Lumber function, up from 2.`,
    "Kitchen Remodel": `Remodel your kitchen, increasing yields by x${
      multiplier ?? ""
    }. Unlocks Steel Appliances upgrade. Increases lumber, brick, and concrete repair costs by 1 per 10% repaired.`,
    "Bathroom Remodel": `Remodel your bathroom, increasing yields by x${
      multiplier ?? ""
    }. Unlocks Jacuzzi Tub upgrade. Increases lumber, brick, and concrete repair costs by 1 per 10% repaired.`,
    "Jacuzzi Tub": `Add a Jacuzzi Tub to your bathroom, increasing yields by x${
      multiplier ?? ""
    }. Increases concrete repair cost by 1 per 10% repaired.`,
    "Steel Siding": `Install steel siding to your property, increasing yields by x${
      multiplier ?? ""
    }. Requires a concrete fortification. Increases steel repair cost by 1 per 10% repaired.`,
    "Steel Appliances": `Modernize your kitchen with steel appliances, increasing LAND yields by x${
      multiplier ?? ""
    }. Requires the Kitchen Renovation upgrade. Increases steel repair cost by 1 per 10% repaired.`,
    Cellar: `Add a cellar to your property, increasing yields by x${
      multiplier ?? ""
    }. Requires an ACTIVE brick fortification to gain multiplier. User only needs to build upgrade once, and multiplier will be active any time brick fortification is active. Increases steel, lumber, and brick repair cost by 1 per 10% repaired.`,
    "Finished Basement": `Finish your basement to increase yields by x${
      multiplier ?? ""
    }. Requires ACTIVE steel fortification to gain multiplier. User only needs to build upgrade once, and multiplier will be active any time steel fortification is active. Increases steel, lumber, concrete, and brick repair cost by 1 per 10% repaired.`,
    Firepit: `Burn lumber in your outdoor firepit to increase LAND yields by x${
      multiplier ?? ""
    }. Burns 1 lumber per day and allows user to frontload up to 10 lumber. If lumber is depleted, the upgrade multiplier will be removed. Increases brick repair cost by 1 per 10% repaired.`,
    "Hire Handyman": `Hire a Handyman to restore your durability to 100%. Costs ${
      cost.cost ?? ""
    } LAND per 10% repaired. Useable once per ${durationDate ?? ""} days.`,
    "Lumber Toolshed": `The Toolshed reduces repair costs for your property. Only one toolshed type (Lumber, Brick, Concrete, or Steel) can be active at a time. Lumber Toolshed decreases power costs on repairs by ${
      cost.reductionPercent ? cost.reductionPercent[0] : ""
    }% and resource costs on repairs for lumber by ${
      cost.reductionPercent ? cost.reductionPercent[1] : ""
    }%.`,
    "Brick Toolshed": `The Toolshed reduces repair costs for your property. Only one toolshed type (Lumber, Brick, Concrete, or Steel) can be active at a time. Brick Toolshed decreases power costs on repairs by ${
      cost.reductionPercent ? cost.reductionPercent[0] : ""
    }% and resource costs on repairs for the brick by ${
      cost.reductionPercent ? cost.reductionPercent[2] : ""
    }%.`,
    "Concrete Toolshed": `The Toolshed reduces repair costs for your property. Only one toolshed type (Lumber, Brick, Concrete, or Steel) can be active at a time. Concrete Toolshed decreases power costs on repairs by ${
      cost.reductionPercent ? cost.reductionPercent[0] : ""
    }% and resource costs on repairs for concrete by ${
      cost.reductionPercent ? cost.reductionPercent[3] : ""
    }%.`,
    "Steel Toolshed": `The Toolshed reduces repair costs for your property. Only one toolshed type (Lumber, Brick, Concrete, or Steel) can be active at a time. Steel Toolshed decreases power costs on repairs by ${
      cost.reductionPercent ? cost.reductionPercent[0] : ""
    }% and resource costs on repairs for steel by ${
      cost.reductionPercent ? cost.reductionPercent[4] : ""
    }%.`,
    "Concrete Foundation": `Pour a concrete foundation for your property. Reduces daily durability loss from 10% to ${
      cost.durability / 2 ?? 0
    }%.`,
    Harvester: `Reduces harvest cost from 10 power to ${
      (10 * Number(cost.reductionPercent ?? 0)) / 100
    } power for each resource type harvested.`,
    "Fortification Brick": `Fortifies your property with bricks, increasing maximum durability by ${
      cost.durability ?? 0
    }%. Stacks with other fortification types for a maximum durability of ${
      cost.maxDurability ?? 0
    }%. Must have an active Brick Fortification to benefit from Cellar upgrade.`,
    "Fortification Concrete": `Fortifies your property with concrete, increasing maximum durability by ${
      cost.durability ?? 0
    }%. Stacks with other fortification types for a maximum durability of ${
      cost.maxDurability ?? 0
    }%. Must have an active Concrete Fortification to build Steel Siding upgrade.`,
    "Fortification Steel": `Fortifies your property with bricks, increasing maximum durability by ${
      cost.durability ?? 0
    }%. Stacks with other fortification types for a maximum durability of ${
      cost.maxDurability ?? 0
    }%. Must have an active Steel Fortification to benefit from the Finished Basement upgrade.`,
  };
  const colors = [
    "grey",
    "green",
    "yellow",
    "blue",
    "dark-blue",
    "light-yellow",
    "light-blue",
  ];

  let durationDateNode
  if (item.title === "Garden") {
    durationDateNode =
      durationDate > 1 ? (
        <>
          Garden: <span className={`duration-date ${type}`}>{durationDate}</span> days
        </>
      ) : durationDate === 1 ? (
        <>
          Garden: <span className={`duration-date ${type}`}>{durationDate}</span> day
        </>
      ) : (
        <>
          Garden: <span className={`duration-date ${type}`}>less than 1 day</span>
        </>
      );
  } else {
    durationDateNode =
      durationDate > 1 ? (
        <>
          <span className={`duration-date ${type}`}>{durationDate}</span> days
        </>
      ) : durationDate === 1 ? (
        <>
          <span className={`duration-date ${type}`}>{durationDate}</span> day
        </>
      ) : (
        <span className={`duration-date ${type}`}>less than 1 day</span>
      );
  }
  return (
    <>
      <div
        className={`yield-upgrade d-flex flex-column cards-hover-animation ${className}`}
      >
        <div className="yield-upgrade-content-section">
          <div
            className={`yield-upgrade-content d-flex flex-column align-items-center ${type}`}
          >
            <div className="yield-title w-100 d-flex justify-content-center yield-head">
              <span className="fs-xs text-white fw-600">{item.title}</span>
            </div>
            <div className="d-flex flex-column w-100 yield-upgrade-content-image position-relative">
              {durationTime != 0 && (
                <span className="yield-upgrade-duration-time-value">{durationTime}</span>
              )}
              <img
                className="position-absolute yield-upgrade-main-image"
                src={item.imgUrl}
                alt={item.title}
              />
              {durationDate ? (
                item.title === "Garden" ? (
                  btnTitle === "FERTILIZE" ? (
                    <div className="duration-section d-flex w-100 justify-content-between align-items-end py-2 position-absolute">
                      <div className={`duration ${type}`}>
                        {durationDateNode}
                      </div>
                      <div>
                        {message &&
                          (showAlert) && (
                            <OverlayTrigger
                              key="top"
                              placement="top"
                              overlay={
                                <Tooltip
                                  id={`tooltip-${btnTitle.stringToSlug()}`}
                                >
                                  Missing Dependency: <br />
                                  {message}.<br />
                                  Multiplier not active.
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
                      {message &&
                        (showAlert) && (
                          <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                              <Tooltip
                                id={`tooltip-${btnTitle.stringToSlug()}`}
                              >
                                Missing Dependency: <br />
                                {message}.<br />
                                Multiplier not active.
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
                  )
                ) : (
                  <div className="duration-section d-flex w-100 justify-content-between align-items-end py-2 position-absolute">
                    <span className={`duration ${type}`}>
                      Duration: {durationDateNode}{" "}
                      {durationDate !== 7 && "left"}
                    </span>
                    <div>
                      {message &&
                        (showAlert) && (
                          <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                              <Tooltip
                                id={`tooltip-${btnTitle.stringToSlug()}`}
                              >
                                Missing Dependency: <br />
                                {message}.<br />
                                Multiplier not active.
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
                )
              ) : (
                <div className="duration-section d-flex w-100 justify-content-end px-4 py-2 position-absolute">
                  {message &&
                    (showAlert) && (
                      <OverlayTrigger
                        key="top"
                        placement="top"
                        overlay={
                          <Tooltip id={`tooltip-${btnTitle.stringToSlug()}`}>
                            Missing Dependency: <br />
                            {message}.<br />
                            Multiplier not active.
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
            <YieldCostUpgrade
              color={colors[colorType]}
              btnLabel={btnTitle}
              onPurcharse={onPurcharse}
              disabled={disabled}
              isLoading={isLoading}
              type={item.id}
            >
              {type == "yield" ? (
                <YieldCostContent
                  costs={btnTitle == 'SALVAGE' ? item.salvageCost : cost}
                  colorType={colorType}
                  color={colors[colorType]}
                  multiplier={multiplier}
                  receiveCost={item.salvageReceive}
                  btnLabel={btnTitle}
                />
              ) : (
                <ProductionCostContent
                  costs={cost}
                  colorType={colorType}
                  color={colors[colorType]}
                  type={item.type}
                />
              )}
            </YieldCostUpgrade>
          </div>
        </div>
      </div>
      <div className="yield-description text-center mt-2">
        {message &&
        (disabled ? (btnTitle === "FERTILIZE" ? false : true) : false) ? (
          <span className="yield-level-descriptor fw-500">
            {`*requires ${message}`}
          </span>
        ) : (
          ""
        )}
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
          <span className="my-2 mx-3 fs-14 fw-400">
            {descriptions[item.title] ?? ""}
          </span>
        </CustomModal.Body>
      </CustomModal>
    </>
  );
};
