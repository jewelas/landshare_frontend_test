import React from "react";
import numeral from "numeral";
import { Dropdown } from "react-bootstrap";
import ReparingCostList from "./ReparingCostList";
import { ChargeIcon } from "../NftIcon";
import './ReparingCost.css';
export const ReparingCost = ({ cost, minWidth }) => {
  return (
    <div className="w-100 d-flex align-items-center" style={{ minWidth: minWidth, paddingRight: 20 }}>
      <span className="mx-1 fs-14 text-black-700">Cost:</span>
      <div className="d-none w-100 d-md-flex">
        <ReparingCostList cost={cost} />
      </div>
      <div className="d-flex dropdown-list-style d-md-none">
        <Dropdown>
          <Dropdown.Toggle variant="success" dropdown="end" id="dropdown-basic">
            {numeral(cost["power"]).format('0.[00]')} <ChargeIcon />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <div className="d-flex flex-column px-3">
              <ReparingCostList cost={cost} />
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
};
