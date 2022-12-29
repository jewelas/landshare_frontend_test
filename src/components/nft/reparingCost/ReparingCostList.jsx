import React from "react";
import {
  BrickIcon,
  ChargeIcon,
  ConcreteIcon,
  LumberIcon,
  SteelIcon,
} from "../NftIcon";
const ReparingCostList = ({ cost }) => {
  const icons = {
    power: <ChargeIcon className="" />,
    lumber: <LumberIcon className="" />,
    brick: <BrickIcon className="" />,
    concrete: <ConcreteIcon className="" />,
    steel: <SteelIcon className="" />,
  };
  return (
    <>
      {Object.keys(cost).map((key, index) => (
        <div
          key={key}
          className=" d-flex flex-grow-1 p-1 align-items-center fs-14 cost-resource"
          style={{ color: "#4D4D4D" }}
        >
          <span className="fw-bold">{Math.ceil(cost[key] * 10) / 10}</span>
          {icons[key]}
        </div>
      ))}
    </>
  );
};

export default ReparingCostList;
