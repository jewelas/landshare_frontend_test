import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import numeral from "numeral";
import axios from "axios";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import HouseNft from "../../assets/img/house/house.bmp";
import HouseRareNft from "../../assets/img/house/house_rare.bmp";
import HouseLandNft from "../../assets/img/house/house_land.png";
import HouseLandRareNft from "../../assets/img/house/house_land_rare.bmp";
import HouseGardenNft from "../../assets/img/house/house_garden.bmp";
import HouseGardenRareNft from "../../assets/img/house/house_garden_rare.bmp";
import { Harvestable } from "./harvestable/Harvestable";
import {
  ChargeIcon,
  DurabilityIcon,
  NftDurabilityIcon,
  Question,
} from "./NftIcon";
import { ReparingStatus } from "./reparingStatus/ReparingStatus";
import { Reparing } from "./reparing/Reparing";
import { EditableNft } from "./editableNft/editableNft";
import { TotalYieldMultiModal } from "./totalYieldMultiModal/TotalYieldMultiModal";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import {
  validateResource,
  validateLandtokenBalance,
} from "../../contexts/game/validator";
import { InputCost } from "./inputCost/InputCost";
import { CustomModal } from "../common/modal/Modal";
import gameSetting from "../../contexts/game/setting.json";
import "./nftDetails.css";

const { fromWei, toWei, toBN } = Web3.utils;

const NftDetails = ({
  isOwn,
  isRare,
  depositedBalance,
  currentDurability,
  maxDurability,
  multiplier,
  repairCost,
  tokenReward,
  resourceReward,
  facilityLevel,
  hasHarvester,
  hasAddon,
  activated,
  deadTime,
  house,
  getHouse,
  setHouse,
  setUserResource,
  resource,
  totalHarvestedToken,
  tokenHarvestLimit,
  lastFortTime,
  firepitRemainDays
}) => {
  const { tokenId } = useParams();
  const { state, notifySuccess, notifyError } = useLandshareFunctions();
  const {
    account,
    nftStake,
    assetToken,
    nftStakeAddress,
    setting,
    game,
    landTokenContract,
  } = state;
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [depositeAmount, setDepositeAmount] = useState("");
  const [isShowDropdrown, setIsShowDropdown] = useState(false);
  const [selectedToken, setSelectedToken] = React.useState(false);
  const [selectedResource, setSelectedResource] = React.useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [saleOpen, setSaleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState([false, false, false, false]);
  const [nftName, setNftName] = useState(house.name);
  const [nftSeries, setNftSeries] = useState(house.series);
  const [harvestCost, setHarvestCost] = useState(gameSetting.harvestCost);
  const [reductionPercent, setReductionPercent] = useState(
    gameSetting.harvester.reductionPercent
  );
  const [addonData, setAddonData] = useState([]);
  const [durabilityModal, setDurabilityModal] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");

  let totalHarvestCost =
    (selectedResource.filter((r) => r).length + selectedToken) * harvestCost;
  if (hasHarvester) {
    totalHarvestCost = (totalHarvestCost * reductionPercent) / 100;
  }

  useEffect(() => {
    loadSetting();
  }, [state]);

  useEffect(() => {
    setNftName(house.name);
    setNftSeries(house.series);
  }, [house]);

  const loadSetting = async () => {
    if (setting) {
      const cost = await state.setting.methods
        .getPowerAmountForHarvest()
        .call();
      const addon = await state.setting.methods.getAddonSetting().call();
      setAddonData(addon)
      setHarvestCost(fromWei(toBN(cost)));
      setReductionPercent(
        await state.setting.methods.getHarvesterReductionRatio().call()
      );

    }
  };

  const renameNft = async (target, value) => {
    if (value.length > 0) {
      if (value.length < 32) {
        if (target === "nftName") {
          await state.houseNFT.methods
            .setHouseName(tokenId, value)
            .send({ from: state.account })
            .on("receipt", (receipt) => {
              setHouse((prevState) => ({
                ...prevState,
                name: value,
              }));
              notifySuccess("Rename NFT successfully!");
            })
            .on("error", (error, receipt) => {
              console.log("Rename NFT error: ", error);
              return notifyError("Rename NFT error.");
            });
        } else {
          return notifyError("Invalid field type.");
        }
      } else {
        return notifyError("This field maximum length is 31.")
      }
    } else {
      return notifyError("This field value is not empty.");
    }
  };

  const dropdownHandler = () => {
    setIsShowDropdown(!isShowDropdrown);
  };

  const totalMultiplier = fromWei(
    toBN(multiplier).mul(toBN(currentDurability))
  )
    .toString()
    .toString();
  const annualYield = Number(depositedBalance) * fromWei(currentDurability) * fromWei(multiplier);


  const stake = () => {
    nftStake.methods
      .stake(depositeAmount, tokenId)
      .send({ from: account })
      .on("receipt", (receipt) => {
        notifySuccess(
          `${depositeAmount} Asset Tokens!`
        );
        setHouse((prevState) => ({
          ...prevState,
          depositedBalance: (Number(depositeAmount) + Number(prevState.depositedBalance)).toString(),
        }));
        setDepositeAmount("");
        setIsLoading([false, false, false, false]);
      })
      .on("error", (error, receipt) => {
        // TODO: handle error
        console.log("deposite error", error);
        setIsLoading([false, false, false, false]);

        notifyError("Deposit failed");
      });
  };

  const handleDeposite = async () => {
    setIsLoading([true, false, false, false]);
    const maxAssetTokenBalance = await assetToken.methods
      .balanceOf(account)
      .call();
    if (!activated) {
      setIsLoading([false, false, false, false]);

      return notifyError("Please Activate First");
    }

    if (depositeAmount === "" || depositeAmount === "0") {
      setIsLoading([false, false, false, false]);
      return notifyError("No deposit amount");
    }

    if(depositeAmount % 1 != "0") {
      setIsLoading([false, false, false, false]);
      return notifyError("Please input Integer value");
    }

    if (depositeAmount < 1) {
      setIsLoading([false, false, false, false]);
      return notifyError("Please input Integer value");
    }

    if (Number(depositeAmount) > maxAssetTokenBalance) {
      setIsLoading([false, false, false, false]);
      return notifyError("Deposite amount could not bigger than max amount");
    }

    const allowance = await assetToken.methods
      .allowance(account, nftStakeAddress)
      .call();
    if (allowance >= depositeAmount) {
      stake();
    } else {
      assetToken.methods
        .approve(
          nftStakeAddress,
          "100000"
        )
        .send({ from: account })
        .on("receipt", (hash) => {
          stake();
        })
        .on("error", (error, receipt) => {
          console.log('Deposite Error', error);
          setIsLoading([false, false, false, false]);
          notifyError("Approve error");
        });
    }
  };

  const handleWithdraw = async () => {
    if (!activated) {
      setIsLoading([false, false, false, false]);
      return notifyError("Please Activate First");
    }

    if(depositeAmount % 1 != "0") {
      setIsLoading([false, false, false, false]);
      return notifyError("Please input Integer value");
    }

    if (depositedBalance === "0") {
      setIsLoading([false, false, false, false]);
      return notifyError("No withdraw amount");
    }

    if (!depositeAmount) {
      setIsLoading([false, false, false, false]);
      return notifyError("Please input Withdraw amount");
    }

    if (depositeAmount < 1) {
      setIsLoading([false, false, false, false]);
      return notifyError("Please input Integer value");
    }

    if (Number((house.depositedBalance)) < Number(depositeAmount)) {
      setIsLoading([false, false, false, false]);
      return notifyError("Withdraw amount should be less than deposited balance");
    }

    setIsLoading([false, true, false, false]);
    nftStake.methods
      .unstake(depositeAmount, tokenId)
      .send({ from: account })
      .on("receipt", (receipt) => {
        notifySuccess(
          `${depositeAmount} LAND withdraw successfully!`
        );
        setHouse((prevState) => ({
          ...prevState,
          depositedBalance: (Number(prevState.depositedBalance) - Number(depositeAmount)).toString(),
        }));
        setIsLoading([false, false, false, false]);
      })
      .on("error", (error, receipt) => {
        // TODO: handle error
        console.log("Withdraw error", error);
        setIsLoading([false, false, false, false]);
        notifyError("Withdraw failed");
      });
  };

  const handleHarvest = async () => {
    if (!jwtToken) {
      setIsLoading([false, false, false, false]);
      return notifyError("Please login!");
    }
    
    if (!activated) {
      return notifyError("Please Activate First");
    }

    if (totalHarvestCost === 0) {
      return notifyError("Select resources to harvest");
    }

    if (
      selectedToken &&
      !(await validateLandtokenBalance(state, tokenReward))
    ) {
      return notifyError("Not enough landtoken in game");
    }

    const cost = [totalHarvestCost, 0, 0, 0, 0];
    if ((deadTime != "0") || await validateResource(state, cost, setUserResource, tokenId)) {
      setIsLoading([false, false, true, false]);
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/harvest`, {
        "tokenId": tokenId,
        "harvestingReward": [selectedToken, ...selectedResource.slice(1)]
      }, {
        headers: {
          'Authorization': jwtToken
        }
      }).then(async (res) => {
        if (res.data.status != 'success') {
          setIsLoading([false, false, false, false]);
          return notifyError(res.reason);
        }
        const landTokenBalance = await landTokenContract.methods
            .balanceOf(account)
            .call();
        setUserResource((prevState) => ({
          ...prevState,
          resource: res.data.resource,
          landTokenBalance,
        }));

        var notificaitonWords = "";
        var harvestCount = selectedResource.filter((r) => r).length;
        if (selectedToken) {
          setHouse((prevState) => ({
            ...prevState,
            tokenReward: "0",
          }));
          setSelectedToken(false);
          notificaitonWords = `${numeral(Number(fromWei(tokenReward)))
            .format("0.[00000]")
            .toString()
            .split(".")[0]
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${
            numeral(Number(fromWei(tokenReward)).toString())
              .format("0.[00000]")
              .toString()
              .split(".")[1]
              ? `.${
                  numeral(Number(fromWei(tokenReward)).toString())
                    .format("0.[00000]")
                    .toString()
                    .split(".")[1]
                }`
              : ""
          } Land`;

          if (harvestCount != 0) {
            notificaitonWords += ", ";
          } else {
            notificaitonWords += " ";
          }
        }

        let count = 0;
        selectedResource.map((status, idx) => {
          if (status) {
            notificaitonWords += `${numeral(
              Number(fromWei(resourceReward[idx].toString()))
            )
              .format("0.[00000]")
              .toString()
              .split(".")[0]
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${
              numeral(Number(fromWei(resourceReward[idx].toString())))
                .format("0.[00000]")
                .toString()
                .split(".")[1]
                ? `.${
                    numeral(Number(fromWei(resourceReward[idx].toString())))
                      .format("0.[00000]")
                      .toString()
                      .split(".")[1]
                  }`
                : ""
            } ${gameSetting.resources[idx]}`;
            count++;

            if (harvestCount != count) {
              notificaitonWords += ", ";
            }
          }
        });
        setHouse((prevState) => ({
          ...prevState,
          resourceReward: prevState.resourceReward.map((r, idx) =>
            selectedResource[idx] ? "0" : r
          ),
        }));
        setSelectedResource([false, false, false, false, false]);
        setIsLoading([false, false, false, false]);

        notifySuccess(`${notificaitonWords} harvested successfully!`);
      }).catch((err) => {
        console.log("Buy Overdrive Error: ", err);
        setIsLoading([false, false, false, false]);
        notifyError("Not enough resource");
      });
    } else {
      setIsLoading([false, false, false, false]);
      notifyError("Not enough resource");
    }
  };

  const activate = async () => {
    setIsLoading([false, false, false, true]);

    if (!jwtToken) {
      setIsLoading([false, false, false, false]);
      return notifyError("Please login!");
    }

    if (activated) {
      setIsLoading([false, false, false, false]);
      return notifyError("Already activated");
    }
    
    await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/activateHouse`, {
      "tokenId": tokenId
    }, {
      headers: {
        'Authorization': jwtToken
      }
    }).then((res) => {
      if (res.data.status == 'Failed') {
        setIsLoading([false, false, false, false]);
        notifyError(res.reason);
      } else {
        setUserResource((prevState) => ({
          ...prevState,
          maxPowerLimit: res.data.maxPowerLimit
        }));
        setHouse((prevState) => ({
          ...prevState,
          activated: true,
        }));
        setIsLoading([false, false, false, false]);
        notifySuccess("Activated successfully!");
      }
    }).catch(function (error) {
      if (error.response) {
        // Request made and server responded
        console.log("case 1")
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("case 2")
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error

        console.log("case 3")
        console.log('Error', error.message);
      }
      console.log("activate error", error);
    setIsLoading([false, false, false, false]);
    notifyError("Something went wrong. Try again later.");
    });
  };

  const calcDepositMax = async () => {
    const userAssetTokenBalance = await assetToken.methods
      .balanceOf(account)
      .call();
    setDepositeAmount(userAssetTokenBalance);
  };

  const getHouseImageUrl = () => {
    if (house) {
      if (isRare) {
        if (activated && hasAddon[1]) {
          if (hasAddon[2] && (Number(house.expireGardenTime)*1000) > Date.now()) {
            return HouseGardenRareNft;
          } else {
            return HouseLandRareNft;
          }
        } else {
          return HouseRareNft;
        }
      } else {
        if (activated && hasAddon[1]) {
          if (hasAddon[2] && (Number(house.expireGardenTime)*1000) > Date.now()) {
            return HouseGardenNft;
          } else {
            return HouseLandNft;
          }
        } else {
          return HouseNft;
        }
      }
    }
  }

  useEffect(() => {
    if (house.name) {
      setTimeout(() => {
        setIsPageLoading(false);
      }, 500)
    }
  }, [house])
  
  return (
    <>
      {isPageLoading ? (
        <div className="d-flex w-100 min-h-60vh h-100 align-items-center justify-content-center">
          <ReactLoading type="bars" color="#0ed145" />
        </div>
      ) : (
        <>
          <div className=" justify-content-center nft-house mb-5 pb-4">
            <div className="px-xl-0">
              <div>
                <div className="d-flex flex-wrap justify-content-between nft-title-section pb-2">
                  <EditableNft
                    className="fs-xxl"
                    defaultValue={nftName}
                    onChangeValue={renameNft}
                    target="nftName"
                    activated={(activated && isOwn)}
                  >
                    <h2 className="fs-xxl font-semibold property-title">
                      {`${nftName} ${house.isRare ? `Rare #${(Number(house.rareId) + 1)}` : `#${(Number(tokenId) + 1)}`}`}
                    </h2>
                  </EditableNft>
                  <div className="d-flex align-items-center for-sale">
                    <span className="fs-xs text-black-700">For Sale:</span>
                    <div className="on-off-toggle ms-sm-3 ms-1">
                      <input
                        className="on-off-toggle__input"
                        type="checkbox"
                        disabled={!saleOpen}
                        id="bopis"
                      />
                      <label
                        htmlFor="bopis"
                        className="on-off-toggle__slider round"
                      ></label>
                    </div>
                  </div>
                </div>
                <div className="divider"></div>
                <div className="nft-detail-content-section">
                  <div className="house-desc d-flex">
                    <h6 className="fw-600 fs-sm text-black mb-0">
                      {`${nftSeries} ${house.isRare ? `Rare #${(Number(house.rareId) + 1)}` : `#${(Number(tokenId) + 1)}`}`}
                    </h6>
                  </div>
                  <div className="d-flex flex-column flex-xl-row nft-house-action-status">
                    <div className="d-flex flex-column align-items-center mb-3 position-relative">
                      {activated ?
                        <img
                          className="br-sm mb-xl-0 nft-house-image"
                          src={getHouseImageUrl()}
                          alt="house image"
                        />:
                        <img
                          className="br-sm mb-xl-0 nft-house-image"
                          src={isRare ? HouseRareNft : HouseNft}
                          alt="house image"
                        />
                      }   
                      {isOwn && !activated && (
                        <button
                          className={`btn nav-btn btn_active w-auto d-flex align-items-center justify-content-center px-5 fs-xs fw-700 ${
                            isLoading[3]
                              ? "d-flex justify-content-center align-items-center"
                              : ""
                          }`}
                          onClick={activate}
                          disabled={isLoading[3]}
                        >
                          {isLoading[3] ? (
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
                            "Activate"
                          )}
                        </button>
                      )}
                    </div>
                    <div className="d-flex flex-grow nft-house-action-status-actions">
                      <div className="d-flex flex-column w-100">
                        <div className="dashed-divider"></div>
                        <div className="d-flex flex-column flex-sm-row py-3 justify-content-sm-between">
                          <div className="fs-xs mb-sm-0 font-normal d-flex flex-nowrap align-items-center justify-content-start text-black-700">
                            Durability
                            <div onClick={() => setDurabilityModal(true)} className="cursor-pointer">
                              <NftDurabilityIcon />
                            </div>
                          </div>
                          <div className="d-flex  justify-content-between justify-content-sm-end">
                            <div className="now-reparing-status">
                              <ReparingStatus
                                max={fromWei(maxDurability.toString())}
                                now={fromWei(currentDurability.toString())}
                              />
                            </div>
                            <span className="fs-12 font-normal text-black ps-2 fs-xxs fw-600">
                              MAX {fromWei(maxDurability.toString())}%
                            </span>
                          </div>
                        </div>
                        <Reparing
                          deadTime={house.deadTime}
                          repairCost={repairCost}
                          currentDurability={currentDurability}
                          maxDurability={maxDurability}
                          activated={(activated && isOwn)}
                          setHouse={setHouse}
                          setUserResource={setUserResource}
                          resource={resource}
                        />
                        <div className="dashed-divider"></div>
                        <div className="d-flex justify-content-between mt-2 py-2">
                          <span className="font-semibold fs-16 text-black-700">
                            Asset Tokens Deposited:
                          </span>
                          <span className="text-black fw-normal fs-xs">
                            {depositedBalance} LSNF
                          </span>
                        </div>
                        {/*============ ASSET TOKENS DEPOSITED ROW ============*/}
                        <div className="my-1 pt-1 d-flex flex-column mb-4">
                          <div className="d-flex flex-column flex-sm-row justify-content-between">
                            <div className="deposite-input-box mt-2">
                              <InputCost
                                height={34}
                                value={depositeAmount}
                                changeRepairAmount={setDepositeAmount}
                                calcMaxAmount={calcDepositMax}
                              />
                            </div>
                            <div className="d-flex mt-2 mt-sm-0 button-group">
                              <button
                                onClick={handleDeposite}
                                className={`btn nav-btn  w-auto me-3 px-4 py-2 br-md fs-xs fw-700 
                                ${(!activated || !isOwn) && " btn-repair-disable "}
                                ${isLoading[0]
                                    ? " d-flex justify-content-center align-items-center"
                                    : ""
                                }`}
                                disabled={isLoading[0] || !activated || !isOwn}
                              >
                                {isLoading[0] ? (
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
                                  "DEPOSIT"
                                )}
                              </button>
                              <button
                                onClick={handleWithdraw}
                                className={`btn nav-btn  w-auto px-4 py-2 br-md fs-xs fw-700 
                                ${(!activated || !isOwn) && " btn-repair-disable "}
                                ${
                                  isLoading[1]
                                    ? "d-flex justify-content-center align-items-center"
                                    : ""
                                }`}
                                disabled={isLoading[0] || !activated || !isOwn}
                              >
                                {isLoading[1] ? (
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
                                  "WITHDRAW"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="dashed-divider"></div>
                        <div className="d-flex flex-column justify-content-between h-100 my-3">
                          <div className="d-flex justify-content-between py-1">
                            <span className="d-flex fs-xs text-black-700 align-items-center">
                              Total Yields Multiplier:
                              <div
                                className="cursor-pointer ms-1 d-flex align-items-center"
                                onClick={dropdownHandler}
                              >
                                <Question />
                              </div>
                            </span>
                            <span className="text-black fs-xs">
                              x
                              {numeral(
                                (Number(
                                  fromWei(
                                    (totalMultiplier).split(".")[0]
                                  )
                                ) / 100)
                              )
                                .format("0.[00]")
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                              LAND
                            </span>
                          </div>
                          <div className="d-flex justify-content-between py-1">
                            <span className="d-flex fs-xs text-black-700 align-items-center">
                              Annual Yield:
                            </span>
                            <span className="text-black fx-xs">
                              {numeral((annualYield / 100).toString()).format('0.[00]')}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between py-1">
                            <span className="d-flex fs-xs text-black-700 align-items-center">
                              LAND Remaining:
                            </span>
                            <span className="text-black fx-xs">
                              {`${numeral(Number(fromWei(tokenHarvestLimit)) - Number(fromWei(totalHarvestedToken))).format('0.[00]') - numeral(Number(fromWei(tokenReward))).format('0.[00]')} / ${Number(fromWei(tokenHarvestLimit))} LAND`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dashed-divider"></div>
                  <Harvestable
                    tokenReward={tokenReward}
                    resourceReward={resourceReward}
                    facilityLevel={facilityLevel}
                    selectedToken={selectedToken}
                    selectedResource={selectedResource}
                    setSelectedToken={setSelectedToken}
                    setSelectedResource={setSelectedResource}
                    activated={(house.activated && isOwn)}
                    hasBoost={house.hasBoost}
                    house={house}
                    setHouse={setHouse}
                    setUserResource={setUserResource}
                    lastHandymanHiredTime={house.lastHandymanHiredTime}
                  />
                  {/*================ HARVEST AND COST BUTTON ================*/}
                  <div className="d-flex pt-5 pb-4 justify-content-end harvest-cost">
                    <div className={`d-flex switch-btn active align-items-center position-relative ${(!activated || !isOwn) && "activate-disable"}`}>
                      <span className="d-flex fs-14 text-black-700 align-items-center justify-content-center ps-4">
                        Cost:{" "}
                        <span className="fw-bold ms-1">
                          {totalHarvestCost} {<ChargeIcon iconColor="#4C4C4C" />}
                        </span>
                      </span>
                      <button
                        onClick={handleHarvest}
                        className={`btn btn-switch-sale fs-16 fw-700 d-flex align-items-center justify-content-center position-absolute
                        ${(!activated || !isOwn) && " btn-repair-disable "} 
                        ${isLoading[2] ? 
                          "d-flex justify-content-center align-items-center"
                          : ""
                        }`}
                        disabled={isLoading[0] || !activated || !isOwn}
                      >
                        {isLoading[2] ? (
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
                          "Harvest"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <TotalYieldMultiModal
            hasAddon={hasAddon}
            gardenexpiretime={house.expireGardenTime}
            lastFertilizedGardenTime={house.lastFertilizedGardenTime}
            multiplier={fromWei(numeral(totalMultiplier / 100).format("0"))
              .toString()
              .toString()}
            modalShow={isShowDropdrown}
            setModalShow={setIsShowDropdown}
            lastFortTime={lastFortTime}
            firepitRemainDays={firepitRemainDays}
            addonData={addonData}
          />
          <CustomModal
            modalOptions={{
              centered: true,
              size: "lg",
            }}
            modalShow={durabilityModal}
            setModalShow={setDurabilityModal}
          >
            <CustomModal.Body className="d-flex min-h-100 justify-content-center align-items-center">
              <span className="my-2 mx-3 fs-14 fw-400">
                Durability determines the current repair status of your property. Your yield multiplier for a given period of time is multiplied by your durability amount. For example, if your durability is 90%, your yields will be multiplied by 0.9. Durability decreases by 
                <b>{` ${house.hasConcreteFoundation ? '8%' : '10%'} `}</b>per day.
              </span>
            </CustomModal.Body>
          </CustomModal>
        </>
      )}
      
    </>
  );
};

export default NftDetails;
