import numeral from "numeral";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Web3 from "web3";
import ResourceLandshare from "../../assets/img/icons/resource-landshare.png";
import ResourceLumber from "../../assets/img/icons/resource-lumber.png";
import ResourcePower from "../../assets/img/icons/resource-power.png";
import gameSetting from "../../contexts/game/setting.json";
import {
  validateMaxPower,
  validateResource,
} from "../../contexts/game/validator";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import { useScreenFixedProvider } from "../../contexts/ScreenFixedProvider";
import { ChargeIcon, LumberIcon } from "../nft/NftIcon";
import Topbar from "../nft/topbar/Topbar";
import YouOwn from "../nft/YouOwn";
import "./NftResource.css";
import { ResourceCard } from "./resource-card/ResourceCard";
import HeaderModal from "../HeaderModal";

const { fromWei, toWei, toBN } = Web3.utils;

const NftResource = () => {
  const { setNftRoute, setShowNftFooter } = useScreenFixedProvider();
  const { state, notifySuccess, notifyError } = useLandshareFunctions();
  const {
    account,
    setting,
    game,
    houseNFT,
    landTokenContract,
    web3,
    isConnected,
    gameAddress,
  } = state;
  const [gatheringLumberStatus, setGatheringLumberStatus] = useState({
    canGather: true,
    remainingTime: 0,
  });
  const [isLoading, setIsLoading] = useState([false, false]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [powerToBuy, setPowerToBuy] = useState("5");
  const [gatheringLumber, setGatheringLumber] = useState("1");
  const [userResource, setUserResource] = useState({
    resource: ["0", "0", "0", "0", "0"],
    maxPowerLimit: "0",
    landTokenBalance: "0",
  });
  const [landtokenPrice, setLandtokenPrice] = useState("");
  const [isHavingTree, setIsHavingTree] = useState(false);
  const [powerPerLandtoken, setPowerPerLandtoken] = useState(
    gameSetting.powerPerLandtoken
  );
  const [powerPerLumber, setPowerPerLumber] = useState(
    gameSetting.powerPerLumber
  );
  const [todayLumber, setTodayLumber] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
      setTimeout(() => {
        setIsPageLoading(false);
      }, 1500)   
  }, []);

  useEffect(() => {
    setNftRoute(true);
    setShowNftFooter(true);
    loadSetting();
    setGatherStatus();
    return () => {
      setShowNftFooter(false);
      setNftRoute(false);
    };
  }, []);

  useEffect(() => {
    getUserResources();
    getLandtokenPrice();
    getHavingTreeData();
    setGatherStatus();
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      getUserResources();
      getLandtokenPrice();
      getHavingTreeData();
      setGatherStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  

  const loadSetting = async () => {
    if (setting) {
      const power = await state.setting.methods.getPowerPerLandtoken().call();
      setPowerPerLandtoken(power);
      const lumber = await state.setting.methods.getPowerPerLumber().call();
      setPowerPerLumber(lumber);
    }
  };

  const getHavingTreeData = async () => {
    if (houseNFT) {
      const houseTokenId = await state.houseNFT.methods
        .getActiveHouseByOwner(account)
        .call();
      if (houseTokenId != 1000000000) {
        const havingTree = await houseNFT.methods.checkHavingTree(houseTokenId).call();
        setIsHavingTree(havingTree);
      } else {
        setIsHavingTree(false);
      }
    }
  };

  const getUserResources = async () => {
    if (houseNFT) {
      const houseTokenId = await state.houseNFT.methods
        .getActiveHouseByOwner(account)
        .call();
      let resource = ['0', '0', '0', '0', '0'];
      let maxPowerLimit = 0;
      if (houseTokenId != 1000000000) {
        resource = await state.game.methods
          .getResource(state.account, houseTokenId)
          .call();
        maxPowerLimit = await houseNFT.methods
          .calculateMaxPowerLimitByUser(houseTokenId)
          .call();
      }
      const landTokenBalance = await landTokenContract.methods
        .balanceOf(account)
        .call();

      setUserResource({
        resource,
        maxPowerLimit,
        landTokenBalance,
      });
    }
  };

  async function setGatherStatus() {
    if (game === null) return;
    const lastGatherLumberTime = await game.methods
      .getLastGatherLumberTime(state.account)
      .call({from: state.account} );
   
    
    const maxCountToGather = isHavingTree ? 3 : 2;
    let countGatheredToday = 0;

    for (let i = 0; i < 3; i++)
      if (
        (Number(lastGatherLumberTime[i].toString()) +
          gameSetting.SECONDS_IN_A_DAY) *
          1000 >
        Date.now()
      ) {
        countGatheredToday++;
      }
    setTodayLumber(countGatheredToday);

    if (
      Number(countGatheredToday) + Number(gatheringLumber) >
      Number(maxCountToGather)
    ) {
      if (Number(countGatheredToday) >= Number(maxCountToGather)) {
        const max = Math.max(...lastGatherLumberTime);
        const maxIndex = lastGatherLumberTime.indexOf(max.toString());
        if (lastGatherLumberTime[2] != "0") {
          if (maxIndex == 0) {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
            return;
          } else if (maxIndex == 1) {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[1]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
            return;
          } else {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[maxIndex - maxCountToGather + 1]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
            return;
          }
        } else {
          if (maxIndex == 0) {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
                ) > gameSetting.SECONDS_IN_A_DAY ? gameSetting.SECONDS_IN_A_DAY : Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
            return;
          } else {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
                ) > gameSetting.SECONDS_IN_A_DAY ? gameSetting.SECONDS_IN_A_DAY : Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
            return;
          }
        }
      } else {
        setGatheringLumberStatus({
          canGather: true,
          remainingTime: 0,
        });
        return;
      }
    } else {
      setGatheringLumberStatus({
        canGather: true,
        remainingTime: 0,
      });
      return;
    }
  }

  const buyPowerWithLandtoken = async (requiredLandToken) => {
    setIsLoading([true, false]);
    const houseTokenId = await state.houseNFT.methods
      .getActiveHouseByOwner(account)
      .call();
    if (houseTokenId != 1000000000) {
      game.methods
        .buyPowerWithLandtoken(requiredLandToken.toString(), houseTokenId)
        .send({ from: account })
        .on("receipt", async (receipt) => {
          const {
            events: {
              UpdateResource: {
                returnValues: { updatedResource: resource },
              },
            },
          } = receipt;

          const landTokenBalance = await landTokenContract.methods
            .balanceOf(account)
            .call();
          setUserResource((prevState) => ({
            ...prevState,
            resource,
            landTokenBalance,
          }));

          setIsLoading([false, false]);
          notifySuccess(
            `${numeral(Number(powerToBuy)).format(
              "0.[00]"
            )} power purchased successfully!`
          );
        })
        .on("error", (error, receipt) => {
          // TODO: handle error
          console.log("Buy Power Error: ", error);
          setIsLoading([false, false]);
          notifyError("Buy Power Error");
        });
    } else {
      setIsLoading([false, false]);
      notifyError("Invalid house token");
    }
    
  };

  const buyPower = async () => {
    if (!jwtToken) {
      setIsLoading([false, false]);
      return notifyError("Please login!");
    }
    
    const requiredLandToken = toBN(toWei(powerToBuy)).div(
      toBN(powerPerLandtoken.toString())
    );
    if (requiredLandToken.gt(toBN(userResource.landTokenBalance))) {
      setIsLoading([false, false]);
      notifyError("Not enough landtoken");
    } else {
      const houseTokenId = await state.houseNFT.methods
        .getActiveHouseByOwner(account)
        .call();
      
      if (houseTokenId != 1000000000) {
        if (await validateMaxPower(state, powerToBuy, setUserResource, houseTokenId)) {
          const allowance = await landTokenContract.methods
            .allowance(account, gameAddress)
            .call();
          if (toBN(allowance).gte(requiredLandToken)) {
            setIsLoading([true, false]);
            buyPowerWithLandtoken(requiredLandToken);
          } else {
            setIsLoading([true, false]);
            landTokenContract.methods
              .approve(
                gameAddress,
                "115792089237316195423570985008687907853269984665640564039457584007913129639935"
              )
              .send({ from: account })
              .on("receipt", (hash) => {
                buyPowerWithLandtoken(requiredLandToken);
              })
              .on("error", (error, receipt) => {
                console.log('Deposite Error', error);
                setIsLoading([false, false, false, false]);
                notifyError("Approve error");
              });
            setIsLoading([false, false]);
          }
        } else {
          setIsLoading([false, false]);
          notifyError(
            "User could not be able to purchase power beyond their max"
          );
        }
      } else {
        setIsLoading([false, false]);
        notifyError("Invalid house token");
      }
    }
  };

  const gatherLumber = async () => {
    if (!jwtToken) {
      setIsLoading([false, false]);
      return notifyError("Please login!");
    }

    if (
      gatheringLumber != "1" &&
      gatheringLumber != "2" &&
      gatheringLumber != "3"
    ) {
      return notifyError("You can gather limit is 3 lumbers");
    }

    const lastGatherLumberTime = await game.methods
      .getLastGatherLumberTime(state.account)
      .call();

    if (isHavingTree) {
      if (
        !(
          gatheringLumber == "1" ||
          gatheringLumber == "2" ||
          gatheringLumber == "3"
        )
      ) {
        setIsLoading([false, false]);
        return notifyError("Invaild amount to gather");
      }
    } else {
      setIsLoading([false, false]);
      if (!(gatheringLumber == "1" || gatheringLumber == "2"))
        return notifyError("Invaild amount to gather");
    }

    const maxCountToGather = isHavingTree ? 3 : 2;
    let countGatheredToday = 0;

    for (let i = 0; i < 3; i++)
      if (
        (Number(lastGatherLumberTime[i].toString()) +
          gameSetting.SECONDS_IN_A_DAY) *
          1000 >
        Date.now()
      )
        countGatheredToday++;
    if (
      Number(countGatheredToday) + Number(gatheringLumber) >
      Number(maxCountToGather)
    ) {
      if (Number(countGatheredToday) >= Number(maxCountToGather)) {
        const max = Math.max(...lastGatherLumberTime);
        const maxIndex = lastGatherLumberTime.indexOf(max.toString());
        if (lastGatherLumberTime[2] != "0") {
          if (maxIndex == 0) {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
                ) > gameSetting.SECONDS_IN_A_DAY ? gameSetting.SECONDS_IN_A_DAY : Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
            return;
          } else if (maxIndex == 1) {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
                ) > gameSetting.SECONDS_IN_A_DAY ? gameSetting.SECONDS_IN_A_DAY : Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
            return;
          } else {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
                ) > gameSetting.SECONDS_IN_A_DAY ? gameSetting.SECONDS_IN_A_DAY : Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
            return;
          }
        } else {
          if (maxIndex == 0) {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
                ) > gameSetting.SECONDS_IN_A_DAY ? gameSetting.SECONDS_IN_A_DAY : Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
          } else {
            setGatheringLumberStatus({
              canGather: false,
              remainingTime: Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
                ) > gameSetting.SECONDS_IN_A_DAY ? gameSetting.SECONDS_IN_A_DAY : Math.ceil(
                Number(lastGatherLumberTime[0]) +
                  gameSetting.SECONDS_IN_A_DAY -
                  Date.now() / 1000
              ),
            });
          }
        }
        setIsLoading([false, false]);
        return notifyError("Exceed limit of gathering per day");
      } else {
        setIsLoading([false, false]);
        setGatheringLumberStatus({
          canGather: true,
          remainingTime: 0,
        });
        return notifyError("Exceed limit of gathering per day");
      }
    } else {
      setIsLoading([false, false]);
      setGatheringLumberStatus({
        canGather: true,
        remainingTime: 0,
      });
    }

    const cost = [powerPerLumber * Number(gatheringLumber), 0, 0, 0, 0];
    const houseTokenId = await state.houseNFT.methods
      .getActiveHouseByOwner(account)
      .call();
    if (houseTokenId != 1000000000) {
      if (await validateResource(state, cost, setUserResource, houseTokenId)) {
        setIsLoading([false, true]);
        await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/gatherLumberWithPower`, {
          "tokenId": houseTokenId,
          "lumber": gatheringLumber
        }, {
          headers: {
            'Authorization': jwtToken
          }
        }).then(async (res) => {
          if (res.data.status != 'success') {
            setIsLoading([false, false]);
            return notifyError(res.reason);
          }
          setUserResource((prevState) => ({
            ...prevState,
            resource: res.data.resource,
          }));
  
          setIsLoading([false, false]);
          setGatherStatus();
          notifySuccess(`${gatheringLumber} Lumber gathered successfully!`);
        }).catch((err) => {
          console.log("Gather Lumber error", err);
          setIsLoading([false, false]);
          notifyError("Gather Lumber failed");
        });
      } else {
        setIsLoading([false, false]);
        notifyError("Not enough resource");
      }
    } else {
      setIsLoading([false, false]);
      notifyError("Invalid house token");
    }
  };

  const getLandtokenPrice = async () => {
    fetch(gameSetting.landshareCostApi)
      .then((res) => res.json())
      .then((json) => {
        let price = numeral(Number(json.data.price))
          .format("0.[00]")
          .toString();
        setLandtokenPrice(price);
      });
  };

  return (
    <>
      <section>
        <div className="container d-flex flex-column ">
          {web3 === "undefined" || !isConnected ? (
            <div className="text-center min-h-60vh d-flex flex-column justify-content-center align-items-center">
              <button
                className='btn nav-btn d-flex align-items-center justify-content-center px-5 fs-xs fw-700'
                onClick={() => setIsOpen(true)}
              >
                Connect Wallet
              </button>
            </div>
          ) : (
            <>
              <Topbar isNftList />
              <span className="fw-bold fs-md">Resources</span>
              <div className="divider w-100 mb-5"></div>
              <div className={`d-flex w-100 min-h-60vh h-100 align-items-center justify-content-center ${isPageLoading?'page-loading':'page-loading-disable'}`}>
                <ReactLoading type="bars" color="#0ed145" />
              </div>
              <div className={`resources-section mb-5 ${!isPageLoading?'page-loading':'page-loading-disable'}`}>
                <ResourceCard
                  title="LAND TOKENS"
                  subTitle={`Your Balance: ${numeral(
                    Number(fromWei(userResource.landTokenBalance.toString()))
                  )
                    .format("0.[00]")
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")} LAND`}
                  imgSrc={ResourceLandshare}
                  cost={{ value: landtokenPrice, description: "USD/LAND" }}
                  background="linear-gradient(180deg, #31AF52 0%, #80CED9 100%)"
                >
                  <div className="d-flex flex-column resource-body justify-content-between">
                    <div className="position-relative d-flex flex-column align-items-center  h-100">
                      <span className="fs-14 fw-500 resource-description text-center">
                        Use LAND Tokens to purchase additional power or repair your house.
                      </span>
                      <div className="resource-selectable d-flex justify-content-center align-items-center position-absolute">
                        <a
                          href="https://pancakeswap.finance/info/pool/0x468cde4ad48cbafa3cdfb68fd9f2c114ddfe6c08"
                          target="_blank"
                        >
                          <button className="btn nav-btn fs-16 fw-600">
                            BUY
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                </ResourceCard>
                <ResourceCard
                  title="Power"
                  subTitle={`${numeral(
                    Number(fromWei(userResource.resource[0]).toString())
                  ).format("0.[00]")}/${fromWei(userResource.maxPowerLimit.toString())}`}
                  imgSrc={ResourcePower}
                  cost={{
                    value: powerPerLandtoken,
                    description: "Power/LAND",
                  }}
                  background="linear-gradient(180deg, #4896F1 0%, rgba(119, 161, 210, 0.55) 100%)"
                >
                  <div className="d-flex flex-column resource-body justify-content-between">
                    <div className="d-flex flex-column gather-power-resource bg-white position-relative resource-body-content">
                      <div className="gather-resource-content">
                        <div className="d-flex justify-content-start align-items-center">
                          <span className="status-label me-2">POWER: </span>
                          <input
                            className="lumber-count me-1"
                            type="number"
                            step="1"
                            value={powerToBuy}
                            onChange={(e) => setPowerToBuy(e.target.value)}
                          />
                          <ChargeIcon />
                        </div>
                        <div className="divider w-100"></div>
                        <div className="d-flex justify-content-start">
                          <div>
                            <span className="status-label me-2">Cost: </span>
                            <span className="status-production">{`${numeral(
                              Number(powerToBuy) / Number(powerPerLandtoken)
                            ).format("0.[00]")} LAND`}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        className={`btn nav-btn w-100 buy-or-upgrade-btn position-absolute green ${
                          isLoading[0]
                            ? "d-flex justify-content-center align-items-center"
                            : ""
                        }`}
                        onClick={buyPower}
                        disabled={isLoading[0]}
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
                          "BUY"
                        )}
                      </button>
                    </div>
                  </div>
                </ResourceCard>
                <ResourceCard
                  title="Gather Lumber"
                  subTitle={
                    gatheringLumberStatus.canGather
                      ? `Available: ${isHavingTree ? (3 - todayLumber) : (2 - todayLumber)} Lumber`
                      : `Cooldown: ${parseInt(
                          (gatheringLumberStatus.remainingTime /
                            gameSetting.SECONDS_IN_A_DAY) *
                            24
                        )} : ${
                          ((gatheringLumberStatus.remainingTime /
                            gameSetting.SECONDS_IN_A_DAY) *
                            24 -
                            parseInt(
                              (gatheringLumberStatus.remainingTime /
                                gameSetting.SECONDS_IN_A_DAY) *
                                24
                            )) *
                            60 >=
                          10
                            ? ""
                            : "0"
                        }${parseInt(
                          ((gatheringLumberStatus.remainingTime /
                            gameSetting.SECONDS_IN_A_DAY) *
                            24 -
                            parseInt(
                              (gatheringLumberStatus.remainingTime /
                                gameSetting.SECONDS_IN_A_DAY) *
                                24
                            )) *
                            60
                        )}`
                  }
                  imgSrc={ResourceLumber}
                  cost={{
                    value: `1 Lumber/${powerPerLumber} Power`,
                    description: "",
                  }}
                  background="linear-gradient(180deg, #A27E23 0%, rgba(167, 148, 83, 0.55) 100%)"
                >
                  <div className="d-flex flex-column resource-body justify-content-between">
                    <div className="d-flex flex-column gather-lumber-resource bg-white position-relative resource-body-content">
                      <div className="gather-resource-content">
                        <div className="d-flex justify-content-start align-items-center">
                          <span className="status-label me-2">Gather: </span>
                          <input
                            className="lumber-count me-1"
                            type="number"
                            step="1"
                            max={isHavingTree ? "3" : "2"}
                            disabled={!gatheringLumberStatus.canGather}
                            value={gatheringLumber}
                            onChange={(e) => setGatheringLumber(e.target.value)}
                          />
                          <LumberIcon />
                        </div>
                        <div className="divider w-100"></div>
                        <div className="d-flex justify-content-start">
                          <div>
                            <span className="status-label me-2">Cost: </span>
                            <span className="status-production">
                              {Number(gatheringLumber) * Number(powerPerLumber)}{" "}
                              <ChargeIcon />
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        className={`btn nav-btn w-100 buy-or-upgrade-btn position-absolute yellow ${
                          isLoading[1]
                            ? "d-flex justify-content-center align-items-center"
                            : ""
                        }`}
                        onClick={gatherLumber}
                        disabled={
                          !gatheringLumberStatus.canGather || isLoading[1]
                        }
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
                          "Gather"
                        )}
                      </button>
                    </div>
                  </div>
                </ResourceCard>
              </div>
              
            </>
          )}
        </div>
      </section>
      {web3 !== "undefined" && isConnected && (
        <YouOwn
          resource={userResource.resource}
          maxPowerLimit={userResource.maxPowerLimit}
          landTokenBalance={userResource.landTokenBalance}
        />
      )}
      <HeaderModal
        isOpen={modalIsOpen}
        closeModal={() => setIsOpen(false)}
      />
    </>
  );
};

export default NftResource;
