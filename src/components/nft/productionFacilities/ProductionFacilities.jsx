import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Web3 from "web3";
import { Facility } from "./Facility";
import { useLandshareFunctions } from "../../../contexts/LandshareFunctionsProvider";
import { validateResource } from "../../../contexts/game/validator";
import gameSetting from "../../../contexts/game/setting.json";
import "./ProductionFacilities.css";
const { fromWei, toWei, toBN } = Web3.utils;

export const ProductionFacilities = ({
  isOwn,
  levels,
  activated,
  setHouse,
  setUserResource,
  hasBoost,
  deadTime
}) => {
  const { tokenId } = useParams();
  const { state, notifySuccess, notifyError } = useLandshareFunctions();
  const { account, setting, game } = state;
  const [isLoading, setIsLoading] = useState({ type: -1, loading: false });
  const [facilityCost, setFacilityCost] = useState(gameSetting.facilityCost);
  const [facilityYield, setFacilityYield] = useState(gameSetting.facilityYield);
  const [overdriveDays, setOverdriveDays] = useState(gameSetting.overdriveDays);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    loadSetting();
  }, [state]);

  const loadSetting = async () => {
    if (setting) {
      const overdriveDays = await state.setting.methods
        .getOverdriveDays()
        .call();
      setOverdriveDays(
        toBN(overdriveDays)
          .divRound(toBN(gameSetting.SECONDS_IN_A_DAY))
          .toString()
      );
      const data = await state.setting.methods.getFacilitySetting().call();
      setFacilityCost(data[0]);
      setFacilityYield(data[1]);
    }
  };

  const upgradeFacility = async (type) => {
    setIsLoading({ type: type, loading: true });
    if (type > 4) return notifyError("Invalid facility type");

    let cost = facilityCost[type][levels[type]];

    if (!jwtToken) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Please login!");
    }

    if (!activated) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Please Activate First");
    }

    if (deadTime != "0") {
      setIsLoading({ type: -1, loading: false });
      return notifyError("This house has been expired");
    }

    if (await validateResource(state, cost, setUserResource, tokenId)) {
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/upgradeFacility`, {
        "tokenId": tokenId,
        "facilityType": type
      }, {
        headers: {
          'Authorization': jwtToken
        }
      }).then(async (res) => {
        if (res.data.status != 'success') {
          setIsLoading({ type: -1, loading: false });
          return notifyError(res.reason);
        }

        setUserResource((prevState) => ({
          ...prevState,
          resource: res.data.resource,
        }));

        setHouse((prevState) => ({
          ...prevState,
          facilityLevel: prevState.facilityLevel.map((level, t) => {
            if (t === type) {
              return (Number(level) + 1).toString();
            }
            return level;
          }),
        }));

        if (levels[type] == "0") {
          notifySuccess(
            `${gameSetting.facility[type]} purchased successfully!`
          );
        } else {
          notifySuccess(
            `${gameSetting.facility[type]} upgraded to Level ${
              Number(levels[type]) + 1
            } successfully!`
          );
        }
        setIsLoading({ type: -1, loading: false });
      }).catch((err) => {
        notifyError("Upgrade facility error");
        console.log("upgrade facility error: ", err);
        setIsLoading({ type: -1, loading: false });
      });
    } else {
      notifyError("Not enough resource");
      setIsLoading({ type: -1, loading: false });
    }
  };

  return (
    <div className="container px-0 my-5">
      <div className="production-facilities-section">
        {levels.map((level, type) => (
          <div key={`facility-levels-${type}`}>
            <Facility
              type={type}
              name={gameSetting.facility[type]}
              level={level}
              currentYield={facilityYield[type][level - 1]}
              nextLevelYield={facilityYield[type][level]}
              nextLevelCost={facilityCost[type][level]}
              facilityYield={facilityYield}
              upgradeFacility={upgradeFacility}
              activated={activated && isOwn}
              isBoosts={
                type > 0
                  ? hasBoost[type] ? true : false
                  : false
              }
              isLoading={isLoading}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
