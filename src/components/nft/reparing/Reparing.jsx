import React, { useEffect, useState } from "react";
import Web3 from "web3";
import axios from "axios";
import numeral from "numeral";
import { useParams } from "react-router-dom";
import { useLandshareFunctions } from "../../../contexts/LandshareFunctionsProvider";
import { ReparingCost } from "../reparingCost/ReparingCost";
import { InputCost } from "../inputCost/InputCost";
import "./Reparing.css";
import {
  validateResource,
  getMinimumValue,
} from "../../../contexts/game/validator";
import RepairButton from "./RepairButton";
const { BN, fromWei, toWei, toBN } = Web3.utils;

export const Reparing = ({
  deadTime,
  repairCost,
  currentDurability,
  maxDurability,
  activated,
  setHouse,
  setUserResource,
  resource,
}) => {
  const { tokenId } = useParams();
  const { state, notifySuccess, notifyError } = useLandshareFunctions();
  const { account, game, houseNFT, helper } = state;

  const [repairPercent, setRepairPercent] = useState(0);
  const [displayPercent, setDisplayPercent] = useState(0);
  const [repairStatus, setRepariStatus] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    calcMaxAmount();
  }, []);

  const vaildRepair = async () => {
    if (!activated) {
      setRepariStatus(false);
      return notifyError("Please Activate First");
    }

    if (deadTime != "0") {
      setRepariStatus(false);
      return notifyError("This house has been expired");
    }

    let cost = new Array(5);
    for (var i = 0; i < 5; i++) {
      if (repairCost[i] != "0") {
        cost[i] = parseFloat(fromWei(repairCost[i]));
      } else {
        cost[i] = 0;
      }
    }

    if (await validateResource(state, cost, setUserResource, tokenId)) {
      setRepariStatus(true);
    } else {
      setRepariStatus(false);
    }
  };
  const repair = async () => {
    if (!jwtToken) {
      setIsLoading(false);
      return notifyError("Please login!");
    }
    if (!activated) {
      return notifyError("Please Activate First");
    }
    if (!repairStatus) {
      setRepariStatus(false);
      return;
    }

    if (deadTime != "0") {
      setRepariStatus(false);
      return notifyError("This house has been expired");
    }

    let cost = new Array(5);
    for (var i = 0; i < 5; i++) {
      if (repairCost[i] != "0") {
        cost[i] = parseFloat(fromWei(repairCost[i]));
      } else {
        cost[i] = 0;
      }
    }
    if (repairPercent > 0) {
      if ((Number(fromWei(currentDurability)) + Number(fromWei(repairPercent))) > Number(fromWei(maxDurability))) {
        return notifyError("Overflow maximium durability");
      }
      if (Number(fromWei(maxDurability)) - Number(fromWei(currentDurability)) >= 10 ) {
        if (fromWei(repairPercent) < 10) return notifyError("Should repair at least 10%");
      } else {
        if ((Number(fromWei(currentDurability)) + Number(fromWei(repairPercent))) != Number(fromWei(maxDurability)))
          return notifyError("Should repair to max durability");
      }

      setIsLoading(true);
      if (await validateResource(state, cost, setUserResource, tokenId)) {
        await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/repair`, {
          "tokenId": tokenId,
          "percent": repairPercent
        }, {
          headers: {
            'Authorization': jwtToken
          }
        }).then(async (res) => {
          if (res.data.status == 'Failed') {
            setIsLoading(false);
            notifyError(res.reason);
          } else {
            setUserResource((prevState) => ({
              ...prevState,
              resource: res.data.resource,
            }));
            setIsLoading(false);

            setHouse((prevState) => ({
              ...prevState,
              currentDurability: new BN(prevState.currentDurability)
                .add(new BN(repairPercent))
                .toString(),
              repairCost: [0, 0, 0, 0, 0],
            }));
            notifySuccess(
              `${numeral(Number(fromWei(repairPercent).toString()))
                .format("0.[00]")
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}% repaired successfully!`
            );
          }
        }).catch((err, res) => {
          console.log("repair error", err);
          setIsLoading(false);
          notifyError("Repair failed");
        });
      } else {
        notifyError("Not enough resource");
        setIsLoading(false)
      }
    } else {
      notifyError("Not amount repair");
      setIsLoading(false)
    }
  };

  const changeRepairAmount = async (percent) => {
    const maxPercent = Number.parseFloat(
      fromWei(toBN(maxDurability).sub(toBN(currentDurability)).toString())
    );

    if (maxPercent == 0 || isNaN(percent)) {
      percent = 0;
    }

    if (parseFloat(percent) == 0 || percent == "") {
      setRepairPercent(0);
      setHouse((prevState) => ({
        ...prevState,
        repairCost: [0, 0, 0, 0, 0],
      }));
      setDisplayPercent(percent);
      setRepariStatus(false);
    } else {
      if (percent > maxPercent) {
        percent = maxPercent.toString();
      }

      setRepairPercent(toWei(percent).toString());
      const cost = await helper.methods
        .getRepairCost(tokenId, toWei(percent).toString())
        .call();
      setHouse((prevState) => ({
        ...prevState,
        repairCost: cost,
      }));
      setDisplayPercent(percent);
      vaildRepair();
    }
  };

  const calcMaxAmount = async () => {
    let percent = toBN(maxDurability).sub(toBN(currentDurability)).toString();

    if (percent != "0") {
      let cost = await helper.methods.getRepairCost(tokenId, percent).call();

      let floatCost = new Array(5);
      for (var i = 0; i < 5; i++) {
        if (cost[i] != "0") {
          floatCost[i] = parseFloat(fromWei(cost[i]));
        } else {
          floatCost[i] = 0;
        }
      }

      if (!(await validateResource(state, floatCost, setUserResource, tokenId))) {
        const repairOnePercent = await helper.methods
          .getRepairCost(tokenId, toWei("1").toString())
          .call();
        let compareValues = new Array(5);

        for (var i = 0; i < 5; i++) {
          if (Number.parseFloat(fromWei(repairOnePercent[i])) == 0) {
            compareValues[i] = 120;
          } else {
            compareValues[i] =
              Number.parseFloat(fromWei(resource[i])) /
              Number.parseFloat(fromWei(repairOnePercent[i]));
          }
        }

        var minValue = getMinimumValue(compareValues);
        percent = toWei(minValue.toString()).toString();
        cost = await helper.methods.getRepairCost(tokenId, percent).call();
      }

      setHouse((prevState) => ({
        ...prevState,
        repairCost: cost,
      }));
      setRepariStatus(true);
    }

    const displayPercent = Number.parseFloat(
      fromWei(percent.toString())
    ).toFixed(2);
    setRepairPercent(percent);
    setDisplayPercent(displayPercent);
  };

  return (
    <>
      <div className="input-group mb-4 reparing-section position-relative">
        <div
          className={`main-reparing-cost d-flex justify-content-between main-reparing-cost-${
            (repairStatus && activated) ? "allow" : "disable"
          }`}
        >
          <div className="d-flex flex-grow-1 justify-content-between align-items-center py-1 me-sm-3 me-0">
            <span className="me-2 fs-14 text-black-700">Amount: </span>
            <InputCost
              width={70}
              value={displayPercent}
              changeRepairAmount={changeRepairAmount}
              calcMaxAmount={calcMaxAmount}
            />
          </div>
          <div
            className={`d-none d-sm-flex repair-cost w-100 repair-cost-${
              (repairStatus && activated) ? "allow" : "disable"
            }`}
          >
            <ReparingCost
              minWidth={316}
              cost={{
                power: fromWei(repairCost[0].toString()),
                lumber: fromWei(repairCost[1].toString()),
                brick: fromWei(repairCost[2].toString()),
                concrete: fromWei(repairCost[3].toString()),
                steel: fromWei(repairCost[4].toString()),
              }}
            />
          </div>
        </div>
        <div className="d-none d-sm-block">
          <RepairButton repair={repair} repairStatus={repairStatus} isLoading={isLoading} activated={activated} />
        </div>
      </div>
      <div className="input-group d-block d-sm-none mb-3 mobile-reparing-section reparing-section position-relative">
        <div
          className={`main-reparing-cost h-100 d-flex py-2 justify-content-between main-reparing-cost-${
            repairStatus ? "allow" : "disable"
          }`}
        >
          <div className='d-flex d-sm-none repair-cost w-100'>
            <ReparingCost
              minWidth={316}
              cost={{
                power: fromWei(repairCost[0].toString()),
                lumber: fromWei(repairCost[1].toString()),
                brick: fromWei(repairCost[2].toString()),
                concrete: fromWei(repairCost[3].toString()),
                steel: fromWei(repairCost[4].toString()),
              }}
            />
          </div>
        </div>
        <div className="d-block d-sm-none">
          <RepairButton repair={repair} repairStatus={repairStatus} isLoading={isLoading} activated={activated} />
        </div>
      </div>
    </>
  );
};
