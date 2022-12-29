import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import Web3 from "web3";
import { useLandshareFunctions } from "../../../contexts/LandshareFunctionsProvider";
import { data, upgradeNames } from "../UpgradeBoxData";
import { YieldUpgrade } from "../yieldUpgrade/YieldUpgrade";
import { FirepitUpgrade } from "../yieldUpgrade/FirepitUpgrade";
import {
  validateDependency,
  validateFortDependency,
  validateResource,
} from "../../../contexts/game/validator";
import gameSetting from "../../../contexts/game/setting.json";
import "./UpgradeSection.css";
import axios from "axios";
const { fromWei, toWei, toBN } = Web3.utils;

export const UpgradeSection = ({
  isOwn,
  hasAddon,
  lastFortTime,
  expireGardenTime,
  lastFertilizedGardenTime,
  activated,
  setHouse,
  setUserResource,
  deadTime
}) => {
  const { tokenId } = useParams();
  const { state, notifyError, notifySuccess } = useLandshareFunctions();
  const [firepitRemainDays, setFirepitRemainDays] = useState("0");
  const [salvageAddonId, setSalvageAddonId] = useState(-1);
  const [openSalvageModal, setOpenSalvageModal] = useState(false);
  const { account, setting, game, web3 } = state;
  const [isLoading, setIsLoading] = useState({ type: -1, loading: false });
  const [addonCost, setAddonCost] = useState(gameSetting.addonCost);
  const [addonMultiplier, setAddonMultiplier] = useState(
    gameSetting.addonMultiplier
  );
  const [fertilizeCost, setFertilizeCost] = useState(
    gameSetting.addon[2].fertilizeCost
  );
  const [fertilizeMultiplier, setFertilizeMultiplier] = useState(
    gameSetting.addon[2].fertilizeMultiplier
  );
  const [fertilizeDuration, setFertilizeDuration] = useState(
    gameSetting.addon[2].fertilizeDuration
  );
  const [showData, setShowData] = useState(data)
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    loadSetting();
  }, [state]);

  const loadSetting = async () => {
    if (setting) {
      const addonData = await state.setting.methods.getAddonSetting().call();
      setAddonCost(addonData[0]);
      setAddonMultiplier(addonData[1]);
      setFertilizeCost(addonData[2]);
      setFertilizeDuration(addonData[3]);
      setFertilizeMultiplier(addonData[4]);
    }
  };

  async function getFirepitRemainDays() {
    if (state.houseNFT) {
      const firepitDays = await state.houseNFT.methods
        .getFirepitRemainDays(tokenId)
        .call();
      setFirepitRemainDays(fromWei(firepitDays).toString());
    }
  }

  async function loadLumbers(lumberCount) {
    setIsLoading({ type: 11, loading: true });
    const cost = [0, lumberCount, 0, 0, 0];

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
      if (Number(firepitRemainDays) > 9) {
        setIsLoading({ type: -1, loading: false });
        return notifyError("Exceed Frontload Lumbers");
      }

      if (Number(lumberCount) > 0) {
        if (Number(lumberCount) + Number(firepitRemainDays) <= 10) {
          await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/frontLoadFirepit`, {
            "tokenId": tokenId,
            "lumber": toWei(lumberCount)
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
    
            setFirepitRemainDays(fromWei(res.data.firepitDays).toString());
            setIsLoading({ type: -1, loading: false });
            notifySuccess("Load lumber successfully");
          }).catch((err) => {
            console.log("load lumber error: ", err);
            setIsLoading({ type: -1, loading: false });
            notifyError("Load lumber failed");
          });
        } else {
          setIsLoading({ type: -1, loading: false });
          notifyError("Max lumber limit is 10.");
        }
      } else {
        setIsLoading({ type: -1, loading: false });
        notifyError("Min lumber count is 1.");
      }
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough lumber");
    }
  }

  const fertilizeGardenAction = async () => {
    setIsLoading({ type: 2, isLoading: true });

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

    if (!hasAddon[2]) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Garden shoule be active");
    }

    if (await validateResource(state, fertilizeCost, setUserResource, tokenId)) {
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/fertilizeGarden`, {
        "tokenId": tokenId
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
          gardenFertilize: true,
          lastFertilizedGardenTime: res.data.lastFertilizedGardenTime
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess("Garden Fertilized Successfully");
      }).catch((err) => {
        setIsLoading({ type: -1, loading: false });
        console.log('fertilize garden addon error', err);
        notifyError("Fertilize garden error. Try again later");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    }
  };

  const buyAddon = async (addonId) => {
    setIsLoading({ type: addonId, loading: true });
    let cost = addonCost[addonId];

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

    if (hasAddon[addonId] &&
      Number(expireGardenTime) * 1000 > Date.now()) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("You've already buy this addon");
    }

    if (validateDependency(hasAddon, addonId)) {
      if (validateFortDependency(lastFortTime, addonId)) {
        if (await validateResource(state, cost, setUserResource, tokenId)) {
          await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/buyAddon`, {
            "tokenId": tokenId,
            "addonId": addonId
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
              hasAddon: res.data.hasAddon,
              expireGardenTime: res.data.expireGardenTime,
              multiplier: res.data.multiplier,
            }));
            
            const addonIndex = data.indexOf(data.filter(item => item.id == addonId)[0]);
            setShowData((prevState) => [
              ...prevState.slice(0, addonIndex),
              {
                ...prevState[addonIndex],
                salvageCost: [
                  fromWei(res.data.salvageAddonData[1][0]),
                  fromWei(res.data.salvageAddonData[1][1]),
                  fromWei(res.data.salvageAddonData[1][2]),
                  fromWei(res.data.salvageAddonData[1][3]),
                  fromWei(res.data.salvageAddonData[1][4]),
                ],
                salvageReceive: [
                  fromWei(res.data.salvageAddonData[0][0]),
                  fromWei(res.data.salvageAddonData[0][1]),
                  fromWei(res.data.salvageAddonData[0][2]),
                  fromWei(res.data.salvageAddonData[0][3]),
                  fromWei(res.data.salvageAddonData[0][4]),
                ]
              },
              ...prevState.slice(Number(addonIndex) + 1)
            ])
            setIsLoading({ type: -1, loading: false });
            notifySuccess(`${upgradeNames[addonId]} purchased successfully!`);
          }).catch((err) => {
            setIsLoading({ type: -1, loading: false });
            console.log('buy addon error', err);
            notifyError("Buy addon error. Try again later");
          });
        } else {
          setIsLoading({ type: -1, loading: false });
          notifyError("Not enough resource");
        }
      } else {
        setIsLoading({ type: -1, loading: false });
        notifyError("Requires Fortification");
      }
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Requires dependency");
    }
  };

  const confirmSalvageAddon = async (addonId) => {
    setOpenSalvageModal(true)
    setSalvageAddonId(addonId)
  }

  const salvageAddon = async (addonId) => {
    setIsLoading({ type: addonId, loading: true });
    if (!jwtToken) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Please login!");
    }

    if (!activated) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Please Activate First");
    }

    if (!hasAddon[addonId]) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Addon doesn't exist");
    }

    if (deadTime != "0") {
      setIsLoading({ type: -1, loading: false });
      return notifyError("This house has been expired");
    }
    
    if (await validateResource(state, showData[addonId].salvageCost, setUserResource, tokenId)) {
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/salvageAddon`, {
        "tokenId": tokenId,
        "addonId": addonId
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
          hasAddon: res.data.hasAddon,
          multiplier: res.data.multiplier,
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess(`${upgradeNames[addonId]} salvaged successfully!`);
      }).catch((err) => {
        setIsLoading({ type: -1, loading: false });
        console.log('salvage addon error', err);
        notifyError("Salvage addon error. Try again later");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    }
    
  };

  useEffect(() => {
    getFirepitRemainDays();
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      getFirepitRemainDays();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container px-0 my-5">
      <div className="upgrade-section" style={{ rowGap: "45px" }}>
        {showData.map((item) => {
          let btnType = 1;
          const { message } = gameSetting.addon[item.id];
          let btnTitle = "BUY";
          let showAlert = false;
          let durationTime = 0;
          let durationDate = item.id === 2 ? 7 : 0;
          const having =
            (item.id !== 2 && hasAddon[item.id]) ||
            (item.id === 2 &&
              (hasAddon[item.id] &&
              Number(expireGardenTime) * 1000 > Date.now()));
          if (having) {
            btnTitle = "SALVAGE";
            if (item.title == "Garden") btnTitle = "FERTILIZE";
            btnType = 4;
            if (item.id === 2 && ((hasAddon[item.id] && Number(expireGardenTime) * 1000 > Date.now()))) {
              durationDate = Math.floor(
                (Number(expireGardenTime) * 1000 - Date.now()) /
                  gameSetting.SECONDS_IN_A_DAY /
                  1000
                  );
              if (Number(lastFertilizedGardenTime) * 1000 > Date.now()) {
                let durationCoolTime = (Number(lastFertilizedGardenTime) * 1000) - Date.now();
                let durationDays = parseInt(durationCoolTime / gameSetting.SECONDS_IN_A_DAY / 1000);
                let durationMins = (durationCoolTime - (durationDays * gameSetting.SECONDS_IN_A_DAY)) / gameSetting.SECONDS_IN_A_DAY * 24 * 60;
                let durationHours = parseInt(durationMins / 60) >= 0 ? 
                  (parseInt(durationMins / 60) >= 10 ? (parseInt(durationMins / 60) <= 24 ? parseInt(durationMins / 60) : '24') : `0${parseInt(durationMins / 60)}`) : '00'
                durationMins = (durationMins - durationHours * 24) > 0 ? 
                  ((durationMins - durationHours * 24) >= 10 ? ((durationMins - durationHours * 24) <= 60 ? (durationMins - durationHours * 24) : 60) : `0${(durationMins - durationHours * 24)}`) : '00'
                durationTime = durationDays > 0 ? `${durationDays} D : ${durationHours} H` : `${durationHours} H : ${durationMins} M`;
              }
            }
          } else if (
            !validateDependency(hasAddon, item.id) ||
            !validateFortDependency(lastFortTime, item.id)
          ) {
            btnTitle += "*";
            btnType = 0;
          }

          if (!activated || !isOwn)
            btnType = 0;

          if (item.title == "Steel Siding" || item.title == "Cellar" || item.title == "Finished Basement") {
            if (hasAddon[item.id] && (!validateFortDependency(lastFortTime, item.id)))
              showAlert = true;
          }
          if (item.title == "Fireplace") {
            return (
              <div
                key={`yield-upgrade-${item.id}`}
                className="yield-upgrade-mobile"
              >
                <FirepitUpgrade
                  item={item}
                  costs={addonCost[item.id]}
                  multiplier={Number(addonMultiplier[item.id]) / 100}
                  btnTitle={btnTitle}
                  colorType={btnType}
                  message={message}
                  onPurcharse={(lumber) =>
                    having ? loadLumbers(lumber) : buyAddon(item.id)
                  }
                  onSalvage={() => confirmSalvageAddon(item.id)}
                  type="yield"
                  durationDate={firepitRemainDays}
                  disabled={(btnType === 0 && !having) || !activated || !isOwn}
                  isLoading={isLoading}
                />
              </div>
            );
          }
          return (
            <div
              key={`yield-upgrade-${item.id}`}
              className="yield-upgrade-mobile"
            >
              <YieldUpgrade
                item={item}
                cost={
                  btnTitle === "FERTILIZE" ? fertilizeCost : addonCost[item.id]
                }
                multiplier={
                  btnTitle === "FERTILIZE"
                    ? fertilizeMultiplier / 100
                    : Number(addonMultiplier[item.id]) / 100
                }
                btnTitle={btnTitle}
                colorType={btnType}
                message={message}
                onPurcharse={() =>
                  having
                    ? item.title == "Garden"
                      ? fertilizeGardenAction()
                      : confirmSalvageAddon(item.id)
                    : buyAddon(item.id)
                }
                type="yield"
                durationDate={durationDate}
                // btnTitle === "FERTILIZE" && (fertilizeGarden) ? fertilizeDuration : durationDate
                disabled={(btnType === 0 && !having) || !activated || !isOwn}
                isLoading={isLoading}
                showAlert={showAlert}
                durationTime={durationTime}
              />
            </div>
          );
        })}
      </div>
      <Modal
        show={openSalvageModal}
        onHide={() => setOpenSalvageModal(false)}
        className="modal_content">
        <div className="modal_body">
          <div className="modal_header">Warning: Salvaging will remove this upgrade. Proceed?</div>
          <div className="modal_buttons">
            <div className="modal_buttons_yes cursor-pointer" onClick={()=> {
              setOpenSalvageModal(false);
              salvageAddon(salvageAddonId);
            }}>  
              Yes          
            </div>
            <div className="modal_buttons_no cursor-pointer" onClick={() => {
              setIsLoading({ type: -1, loading: false });
              setOpenSalvageModal(false);
              setSalvageAddonId(-1);
            }}>
              No
            </div>
          </div>
          
        </div>        
      </Modal>
    </div>
  );
};
