import React, { useState } from "react";
import { BuyOrUpgrade } from "../buyOrUpgrade/BuyOrUpgrade";
import { Badge } from "../../common/badge/Badge";
import facility1 from "../../../assets/img/production-facilities/adsonNft1.png";
import facility2 from "../../../assets/img/production-facilities/adsonNft2.png";
import facility3 from "../../../assets/img/production-facilities/adsonNft3.png";
import facility4 from "../../../assets/img/production-facilities/adsonNft4.png";
import facility5 from "../../../assets/img/production-facilities/adsonNft5.png";
import windfarm1 from "../../../assets/img/production-facilities/windfarm1.png";
import windfarm2 from "../../../assets/img/production-facilities/windfarm2.png";
import windfarm3 from "../../../assets/img/production-facilities/windfarm3.png";
import windfarm4 from "../../../assets/img/production-facilities/windfarm4.png";
import windfarm5 from "../../../assets/img/production-facilities/windfarm5.png";
import brick1 from "../../../assets/img/production-facilities/brick1.png";
import brick2 from "../../../assets/img/production-facilities/brick2.png";
import brick3 from "../../../assets/img/production-facilities/brick3.png";
import brick4 from "../../../assets/img/production-facilities/brick4.png";
import brick5 from "../../../assets/img/production-facilities/brick5.png";
import concrete1 from "../../../assets/img/production-facilities/concrete1.png";
import concrete2 from "../../../assets/img/production-facilities/concrete2.png";
import concrete3 from "../../../assets/img/production-facilities/concrete3.png";
import concrete4 from "../../../assets/img/production-facilities/concrete4.png";
import concrete5 from "../../../assets/img/production-facilities/concrete5.png";
import lumber1 from "../../../assets/img/production-facilities/lumber1.png";
import lumber2 from "../../../assets/img/production-facilities/lumber2.png";
import lumber3 from "../../../assets/img/production-facilities/lumber3.png";
import lumber4 from "../../../assets/img/production-facilities/lumber4.png";
import lumber5 from "../../../assets/img/production-facilities/lumber5.png";
import steel1 from "../../../assets/img/production-facilities/steel1.png";
import steel2 from "../../../assets/img/production-facilities/steel2.png";
import steel3 from "../../../assets/img/production-facilities/steel3.png";
import steel4 from "../../../assets/img/production-facilities/steel4.png";
import steel5 from "../../../assets/img/production-facilities/steel5.png";
import BoostImg from "../../../assets/img/icons/boost.png";
import {
  ChargeIcon,
  BrickIcon,
  LumberIcon,
  ConcreteIcon,
  SteelIcon,
} from "../NftIcon";
import gameSetting from "../../../contexts/game/setting.json";
import { FacilityContent } from "../buyOrUpgrade/FacilityContent";
import { CustomModal } from "../../common/modal/Modal";
import "./Facility.css";
import { OpenModalICon } from "../../common/Icons";

export const Facility = ({
  type,
  name,
  level,
  currentYield,
  nextLevelYield,
  nextLevelCost,
  upgradeFacility,
  isBoosts = false,
  isLoading,
  facilityYield,
  activated
}) => {
  const facilityIndex = gameSetting.facility.indexOf(name);
  const [openModal, setOpenModal] = useState(false);
  const facilities = [facility1, facility2, facility3, facility4, facility5];
  const colors = [
    "grey",
    "green",
    "yellow",
    "blue",
    "dark-blue",
    "light-yellow",
    "light-blue",
  ];
  const icons = [
    <ChargeIcon className="" iconColor="#161616" />,
    <LumberIcon className="" iconColor="#161616" />,
    <BrickIcon className="" iconColor="#161616" />,
    <ConcreteIcon className="" iconColor="#161616" />,
    <SteelIcon className="" iconColor="#161616" />,
  ];
  const modalIcons = {
    "Wind Farm": <ChargeIcon className="" iconColor="#00000090" />,
    "Lumber Mill": <LumberIcon className="" iconColor="#00000090" />,
    "Brick Factory": <BrickIcon className="" iconColor="#00000090" />,
    "Concrete Plant": <ConcreteIcon className="" iconColor="#00000090" />,
    "Steel Mill": <SteelIcon className="" iconColor="#00000090" />,
  };
  const facilityImages = {
    "Wind Farm": [windfarm1, windfarm2, windfarm3, windfarm4, windfarm5],
    "Lumber Mill": [lumber1, lumber2, lumber3, lumber4, lumber5],
    "Brick Factory": [brick1, brick2, brick3, brick4, brick5],
    "Concrete Plant": [concrete1, concrete2, concrete3, concrete4, concrete5],
    "Steel Mill": [steel1, steel2, steel3, steel4, steel5],
  };
  const description = (
    <div>
      <p></p>
      <p>
        The {name} {name == "Wind Farm" && "automatically"} produces{" "}
        {name == "Wind Farm" ? "Power" : name.split(/(\s+)/)[0]} over time.
      </p>
      <p>
        <b>{name == "Wind Farm" && "Baseline Power "}LVL 1:</b>{" "}
        {facilityYield[facilityIndex][0]} {modalIcons[name]}/day
      </p>
      <p>
        <b>LVL 2:</b> {facilityYield[facilityIndex][1]}{" "}
        {modalIcons[name]}/day
      </p>
      <p>
        <b>LVL 3:</b> {facilityYield[facilityIndex][2]}{" "}
        {modalIcons[name]}/day
      </p>
      <p>
        <b>LVL 4:</b> {facilityYield[facilityIndex][3]}{" "}
        {modalIcons[name]}/day
      </p>
      <p>
        <b>LVL 5:</b> {facilityYield[facilityIndex][4]}{" "}
        {modalIcons[name]}/day
      </p>
    </div>
  );

  return (
    <>
      <div className="d-flex flex-column facility cards-hover-animation">
        <div className="d-flex align-items-center justify-content-between facility-head">
          <span className="facility-label">{name}</span>
          {level > 0 ? (
            <Badge label1="LVL" label2={level} color="default" />
          ) : (
            <Badge label1="" label2="" color="" />
          )}
        </div>
        <div
          className={`facility-status position-relative ${
            colors[Number(level) + 1]
          }`}
        >
          {isBoosts && (
            <img src={BoostImg} alt={name} className="facility-boosts" />
          )}
          <img
            src={
              level == 0
                ? facilityImages[name][0]
                : facilityImages[name][level - 1]
            }
            alt={name}
            className="facility-img position-absolute"
          />
          <div className="d-flex position-absolute align-items-end w-100 justify-content-between px-3 facility-current-yield">
            {currentYield ? (
              <div className="current-yield">
                <span className="label me-2 fs-12 fw-600">Current Yield: </span>
                {icons[type]}
                <span className="value ms-1 fs-16 fw-600">{currentYield} </span>
                <span className="ms-1 fs-12 fw-600 text-161616">/day</span>
              </div>
            ) : (
              <div></div>
            )}
            <div className="facility-svg">
              <div onClick={() => setOpenModal(true)}>
                <OpenModalICon />
              </div>
            </div>
          </div>
        </div>
        <div className="next-yield-section">
          <div className="d-flex next-yield-status">
            <BuyOrUpgrade
              type={type}
              nextLevel={Number(level) + 1}
              color={
                activated ? (
                  level > 0 ? (level == 5 ? "light-blue" : "yellow") : "green"
                ) : 'grey'
              }
              upgradeFacility={upgradeFacility}
              isLoading={isLoading}
              activated={activated}
            >
              <FacilityContent
                nextYield={nextLevelYield}
                nextCost={nextLevelCost}
                type={type}
              />
            </BuyOrUpgrade>
          </div>
        </div>
      </div>
      <div className="text-center">
        {level > 0 ? (
          <span className="level-descriptor fw-500">
            {`You own ${name} `}
            <b>Level {Number(level)}</b>
          </span>
        ) : (
          <span className="level-descriptor fw-500">
            {`You do not own any ${name}`}
          </span>
        )}
      </div>
      {description && (
        <CustomModal
          modalOptions={{
            centered: true,
            size: "lg",
          }}
          modalShow={openModal}
          setModalShow={setOpenModal}
        >
          <CustomModal.Body className="d-flex min-h-100 justify-content-center align-items-center">
            <span className="my-2 mx-3 fs-14 fw-400">{description}</span>
          </CustomModal.Body>
        </CustomModal>
      )}
    </>
  );
};
