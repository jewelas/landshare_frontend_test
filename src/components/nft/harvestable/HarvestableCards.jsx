import React, { useState } from 'react';
import { Form } from "react-bootstrap";
import numeral from "numeral";
import Web3 from "web3";
import gameSetting from '../../../contexts/game/setting.json';
import { HarvestCostUpgrade } from "../buyOrUpgrade/HarvestCostUpgrade";
import { HarvestCostContent } from "../buyOrUpgrade/HarvestCostContent";
import { CustomModal } from "../../common/modal/Modal";
import { OpenModalICon, ResourceIcons } from "../../common/Icons";
import Timer from "../../../assets/img/icons/timer.png";
import {
  LumberMainIcon,
  BrickMainIcon,
  ConcreteMainIcon,
  SteelMainIcon,
} from '../NftIcon'

export const HarvestableCards = ({
  type,
  reward,
  facilityLevel,
  selectedResource,
  setSelectedResource,
  item,
  cost,
  multiplier = "",
  btnTitle,
  colorType,
  message,
  onPurcharse,
  typeproduct = "yield",
  disabled = false,
  className = "",
  isLoading,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const colors = [
    "disable",
    "grey",
    "yellow",
    "blue"
  ];
  const resourceActiveIcons = [
    <LumberMainIcon color="black" opacity="1" />,
    <BrickMainIcon color="black" opacity="1" />,
    <ConcreteMainIcon color="black" opacity="1" />,
    <SteelMainIcon color="black" opacity="1" />
  ];
  const resourceIcons = [
    <LumberMainIcon color="black" opacity="0.6" />,
    <BrickMainIcon color="black" opacity="0.6" />,
    <ConcreteMainIcon color="black" opacity="0.6" />,
    <SteelMainIcon color="black" opacity="0.6" />
  ];
  const resourceDisabledIcons = [
    <LumberMainIcon color="black" opacity="0.1" />,
    <BrickMainIcon color="black" opacity="0.1" />,
    <ConcreteMainIcon color="black" opacity="0.1" />,
    <SteelMainIcon color="black" opacity="0.1" />
  ];
  const descriptions = {
    "Lumber Overdrive": `Boost the production of ${item.title} by ${cost.reductionPercent[1]}% for 24 hours. Only one production boost can be active at a time. Costs ${cost.cost[0]} power.`,
    "Brick Overdrive": `Boost the production of ${item.title} by ${cost.reductionPercent[2]}% for 24 hours. Only one production boost can be active at a time. Costs ${cost.cost[0]} power.`,
    "Concrete Overdrive": `Boost the production of ${item.title} by ${cost.reductionPercent[3]}% for 24 hours. Only one production boost can be active at a time. Costs ${cost.cost[0]} power.`,
    "Steel Overdrive": `Boost the production of ${item.title} by ${cost.reductionPercent[4]}% for 24 hours. Only one production boost can be active at a time. Costs ${cost.cost[0]} power.`,
    "Token Overdrive": `Boost the production of ${item.title} by ${cost.reductionPercent[5]}% for 24 hours (increase yield multiplier by 1.05x). Only one boost can be active at a time. Costs ${cost.cost[0]} power.`,
  };
  const resourceNames = gameSetting.facility;
  const harvestSelect = () => {
    if ((facilityLevel[type] < 1) || (parseFloat(Web3.utils.fromWei(reward).toString()) < 0.00001)) return;
    setSelectedResource((prevState) => [...prevState.slice(0, type), !prevState[type], ...prevState.slice(type + 1)])
  }
  return (
    <div 
      // className= {facilityLevel[type] > 0 ? (selectedResource[type] ? "harvestable-card-selected cards-hover-animation" : "harvestable-card-enable cards-hover-animation") : "harvestable-card cards-hover-animation"}
      className= "harvestable-card cards-hover-animation"
      // onClick={() => harvestSelect()}
    >
      <div className="harvestable-card-header cursor-pointer">
        <Form.Check 
          type='checkbox'
          id={`checkbox-${type}`}
          label={<span className="fs-16 fw-600 text-black-700 cursor-pointer">{resourceNames[type]}</span>}
          className="custom-checkbox"
          checked={selectedResource[type]}
          disabled={(facilityLevel[type] < 1) || (parseFloat(Web3.utils.fromWei(reward).toString()) < 0.00001)}
          onChange={(e) => {
            setSelectedResource((prevState) => [...prevState.slice(0, type), e.target.checked, ...prevState.slice(type + 1)])
          }}
        />
        <div className="fs-16 fw-600 text-black-700 ps-4 cursor-pointer" onClick={() => harvestSelect()}>{facilityLevel[type] == 0 ? "Not Available yet" : `Level ${facilityLevel[type]}`}</div>
      </div>
      <div className="harvestable-card-body d-flex justify-content-center position-relative cursor-pointer" onClick={() => harvestSelect()}>
        {facilityLevel[type] > 0 ? (selectedResource[type] ? resourceActiveIcons[type - 1] : resourceIcons[type-1]) : resourceDisabledIcons[type - 1]}
        <div className="position-absolute reward-value fs-16 fw-600">
          {numeral(Number(Web3.utils.fromWei(reward))).format('0.[00000]').toString().split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{numeral(Number(Web3.utils.fromWei(reward))).format('0.[00000]').toString().split('.')[1] ? `.${numeral(Number(Web3.utils.fromWei(reward))).format('0.[00000]').toString().split('.')[1]}` : ''}
        </div>
      </div>
      <div className="harvestable-upgrade-cost position-relative">
        <HarvestCostUpgrade
          color={colors[colorType]}
          btnLabel={btnTitle}
          onPurcharse={onPurcharse}
          isLoading={isLoading}
          type={item.id}
          disabled={disabled}
        >
          <HarvestCostContent
            costs={cost}
            colorType={colorType}
            color={colors[colorType]}
            type={item.type}
          />
        </HarvestCostUpgrade>
      </div>
    </div>
  )
}
