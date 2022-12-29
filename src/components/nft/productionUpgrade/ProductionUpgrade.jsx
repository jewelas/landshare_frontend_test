import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";
import { useLandshareFunctions } from "../../../contexts/LandshareFunctionsProvider";
import { Carousel } from "react-responsive-carousel";
import { YieldUpgrade } from "../yieldUpgrade/YieldUpgrade";
import { FireplaceUpgrade } from "../yieldUpgrade/FireplaceUpgrade";
import { HireHandymanUpgrade } from "../yieldUpgrade/HireHandyman";
import { validateResource } from "../../../contexts/game/validator";
import gameSetting from "../../../contexts/game/setting.json";
import Toolshed1 from "../../../assets/img/production-upgrade/toolshed1.png";
import Toolshed2 from "../../../assets/img/production-upgrade/toolshed2.png";
import Toolshed3 from "../../../assets/img/production-upgrade/toolshed3.png";
import Toolshed4 from "../../../assets/img/production-upgrade/toolshed4.png";
import FatificationBrick from "../../../assets/img/production-upgrade/fatification_brick.png";
import FatificationConcrete from "../../../assets/img/production-upgrade/fatification_concrete.png";
import FatificationSteel from "../../../assets/img/production-upgrade/fatification_steel.png";
import Harvester from "../../../assets/img/production-upgrade/harvester.png";
import ConcreteFoundation from "../../../assets/img/production-upgrade/concrete_foundation.png";
import Fireplace from "../../../assets/img/production-upgrade/fireplace.png";
import Firepit from "../../../assets/img/production-upgrade/firepit.png";
import carouselIcon from "../../../assets/img/icons/carousel-icon.png";
import Handyman from "../../../assets/img/production-upgrade/handyman.png";
import "./ProductionUpgrade.css";
const { fromWei, toWei, toBN } = Web3.utils;

export const ProductionUpgrade = ({
  isOwn,
  hasToolshed,
  hasHarvester,
  hasFireplace,
  hasConcreteFoundation,
  activeToolshedType,
  lastHandymanHiredTime,
  userResource,
  lastFortTime,
  activated,
  house,
  setHouse,
  setUserResource,
  deadTime
}) => {
  const [toolshedIndex, setToolshedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState({ type: -1, loading: false });
  const { tokenId } = useParams();
  const { state, notifySuccess, notifyError } = useLandshareFunctions();
  const [toolshed, setToolshed] = useState(gameSetting.toolshed);
  const [fireplaceCost, setFireplaceCost] = useState(gameSetting.fireplace);
  const [harvesterCost, setHarvesterCost] = useState(gameSetting.harvester);
  const [concreteFundationCost, setConcreteFundationCost] = useState(
    gameSetting.concreteFundation
  );
  const [hireHandymanCost, setHireHandymanCost] = useState(
    gameSetting.hireHandyman
  );
  const [toolshedSwitchCost, setToolshedSwitchCost] = useState(
    gameSetting.toolshedSwitchCost
  );
  const [fortifications, setFortifications] = useState([
    {
      id: 7,
      name: "Brick",
      cost: [gameSetting.fortification.powerCost, 0, 7, 0, 0],
      imgUrl: FatificationBrick,
    },
    {
      id: 8,
      name: "Concrete",
      cost: [gameSetting.fortification.powerCost, 0, 0, 7, 0],
      imgUrl: FatificationConcrete,
    },
    {
      id: 9,
      name: "Steel",
      cost: [gameSetting.fortification.powerCost, 0, 0, 0, 7],
      imgUrl: FatificationSteel,
    },
  ]);
  const [lastingDays, setLastingDays] = useState(
    gameSetting.fortification.lastingDays
  );
  const jwtToken = localStorage.getItem("jwtToken");
  const {
    account,
    setting,
    game,
    web3,
    landTokenContract,
    gameAddress
  } = state;
  const toolshedImages = [Toolshed1, Toolshed2, Toolshed3, Toolshed4];
  const prefixTitle = ["Lumber ", "Brick ", "Concrete ", "Steel "];

  const harvesterItem = {
    id: 6,
    type: "harvester",
    title: `Harvester`,
    imgUrl: Harvester,
  };
  const fireplaceItem = {
    id: 4,
    type: "firepit",
    title: `Firepit`,
    imgUrl: Firepit,
  };
  const concreteFoundation = {
    id: 5,
    type: "concreteFoundation",
    title: "Concrete Foundation",
    imgUrl: ConcreteFoundation,
  };
  const hireHandyman = {
    id: 10,
    type: "hireHandyman",
    title: "Hire Handyman",
    imgUrl: Handyman,
  };

  useEffect(() => {
    loadSetting();
  }, [state]);

  const loadSetting = async () => {
    if (setting) {
      const toolshedData = await state.setting.methods
        .getToolshedSetting()
        .call();
      const specialAddonSetting = await state.setting.methods
        .getSpecialAddonSetting()
        .call();
      const fortdata = await state.setting.methods
        .getDurabilitySetting()
        .call();
      setToolshed((prevState) => [
        {
          ...prevState[0],
          cost: toolshedData[0][0],
          reductionPercent: toolshedData[2][0],
        },
        {
          ...prevState[1],
          cost: toolshedData[0][1],
          reductionPercent: toolshedData[2][1],
        },
        {
          ...prevState[2],
          cost: toolshedData[0][2],
          reductionPercent: toolshedData[2][2],
        },
        {
          ...prevState[3],
          cost: toolshedData[0][3],
          reductionPercent: toolshedData[2][3],
        },
      ]);
      setToolshedSwitchCost(toolshedData[1]);
      setFireplaceCost((prevState) => ({
        ...prevState,
        cost: specialAddonSetting[0],
        burnRatio: specialAddonSetting[1],
      }));
      setHarvesterCost((prevState) => ({
        ...prevState,
        cost: specialAddonSetting[2],
        reductionPercent: specialAddonSetting[3],
      }));
      setConcreteFundationCost((prevState) => ({
        ...prevState,
        cost: specialAddonSetting[5],
        durability: specialAddonSetting[4],
      }));
      setHireHandymanCost((prevState) => ({
        ...prevState,
        cost: Number(specialAddonSetting[10]) / 100,
        duration: specialAddonSetting[9],
      }));
      setFortifications((prevState) => [
        { ...prevState[0], cost: fortdata[1][0] },
        { ...prevState[1], cost: fortdata[1][1] },
        { ...prevState[2], cost: fortdata[1][2] },
      ]);
      setLastingDays(fortdata[0]);
    }
  };

  const handleToolshedSelect = (selectedIndex, e) => {
    setToolshedIndex(selectedIndex);
  };

  const buyToolshed = async (toolshedType) => {
    setIsLoading({ type: 2, loading: true });
    const cost = toolshed[toolshedType - 1].cost;

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

    if (toolshedType < 0 && toolshedType > 4) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Invalid toolshed type");
    }

    if (await validateResource(state, cost, setUserResource, tokenId)) {
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/buyToolshed`, {
        "tokenId": tokenId,
        "toolshedType": toolshedType
      }, {
        headers: {
          'Authorization': jwtToken
        }
      }).then(async (res) => {
        if (res.data.status != 'success') {
          setIsLoading({ type: -1, loading: false });
          return notifyError(res.reason);
        }

        const { resource } = res.data;
        setUserResource((prevState) => ({
          ...prevState,
          resource,
        }));

        setHouse((prevState) => ({
          ...prevState,
          hasToolshed: prevState.hasToolshed.map((having, type) => {
            if (toolshedType === type) return true;
            return having;
          }),
          activeToolshedType: toolshedType.toString(),
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess(
          `${prefixTitle[toolshedType - 1]} Toolshed purchased successfully!`
        );
      }).catch((err) => {
        console.log("Buy Toolshed Error: ", err);
        setIsLoading({ type: -1, loading: false });
        notifyError("Buy toolshed error");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    }
  };

  const switchToolshed = async (toolshedType) => {
    setIsLoading({ type: 2, loading: true });
    const cost = toolshedSwitchCost;

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

    if (toolshedType < 0 && toolshedType > 4) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Invalid toolshed type");
    }

    if (!hasToolshed[toolshedType]) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Did not buy yet");
    }

    if (activeToolshedType == toolshedType) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Already actived this one.");
    }

    if (await validateResource(state, cost, setUserResource, tokenId)) {
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/switchToolshed`, {
        "tokenId": tokenId,
        "toolshedType": toolshedType
      }, {
        headers: {
          'Authorization': jwtToken
        }
      }).then(async (res) => {
        if (res.data.status != 'success') {
          setIsLoading({ type: -1, loading: false });
          return notifyError(res.reason);
        }

        const { resource } = res.data;
        setUserResource((prevState) => ({
          ...prevState,
          resource,
        }));

        setHouse((prevState) => ({
          ...prevState,
          activeToolshedType: toolshedType.toString(),
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess(
          `Switeched to ${
            prefixTitle[toolshedType - 1]
          } Toolshed successfully!`
        );
      }).catch((err) => {
        console.log("Switch Toolshed Error: ", err);
        setIsLoading({ type: -1, loading: false });
        notifyError("Switch Toolshed Error");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    }
  };

  const hireHandymanAction = async () => {
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
    
    if (Number(fromWei(house.currentDurability)) < Number(fromWei(house.maxDurability))) {
      setIsLoading({ type: 10, loading: false });
      const requiredLandToken = 1

      if (toBN(requiredLandToken).gt(toBN(userResource.landTokenBalance))) {
        notifyError("Not enough landtoken");
      } else {
        const allowance = await landTokenContract.methods
          .allowance(account, gameAddress)
          .call();
        if (toBN(allowance).gte(toBN(requiredLandToken))) {
          hireHandymanCall();
        } else {
          landTokenContract.methods
            .approve(
              gameAddress,
              "115792089237316195423570985008687907853269984665640564039457584007913129639935"
            )
            .send({ from: account })
            .on("transactionHash", (hash) => {
              hireHandymanCall();
            })
            .on("error", (error, receipt) => {
              console.log('Deposite Error', error);
              setIsLoading([false, false, false, false]);
              notifyError("Approve error");
            });
          setIsLoading({ type: -1, loading: false });
        }
      }
    } else {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Reair Durability should more than 90%");
    }
  };

  const hireHandymanCall = () => {
    setIsLoading({ type: 10, loading: true });
    game.methods
      .hireHandyman(tokenId)
      .send({ from: state.account })
      .on("receipt", async (receipt) => {
        const { blockNumber } = receipt;
        const block = await web3.eth.getBlock(blockNumber);
        const newHiredTime =
          block.timestamp +
          hireHandymanCost.duration * gameSetting.SECONDS_IN_A_DAY;
        const landTokenBalance = await landTokenContract.methods
          .balanceOf(account)
          .call();

        setUserResource((prevState) => ({
          ...prevState,
          landTokenBalance,
        }));
        setHouse((prevState) => ({
          ...prevState,
          lastHandymanHiredTime: newHiredTime,
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess("Handyman Hired successfully!");
      })
      .on("error", (error, receipt) => {
        // TODO: handle error
        console.log("Handyman Hired Error: ", error);
        setIsLoading({ type: -1, loading: false });
        notifyError("Handyman Hired Error");
      });
  };

  const fortify = async (type) => {
    setIsLoading({ type: 7 + Number(type), loading: true });

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

    if ((type < 0) && (type > 2)) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Invalid fortification type");
    }

    if (
      await validateResource(state, fortifications[type].cost, setUserResource, tokenId)
    ) {
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/fortify`, {
        "tokenId": tokenId,
        "type": type
      }, {
        headers: {
          'Authorization': jwtToken
        }
      }).then(async (res) => {
        console.log(res)
        if (res.data.status != 'success') {
          setIsLoading({ type: -1, loading: false });
          return notifyError(res.reason);
        }

        const { resource } = res.data;
        const blockNumber = res.data.blockNumber;
        const block = await web3.eth.getBlock(blockNumber);
        const newFortTime =
            block.timestamp + lastingDays * gameSetting.SECONDS_IN_A_DAY;
        setUserResource((prevState) => ({
          ...prevState,
          resource,
        }));

        setHouse((prevState) => ({
          ...prevState,
          lastFortTime: [
            ...prevState.lastFortTime.slice(0, type),
            newFortTime,
            ...prevState.lastFortTime.slice(type + 1),
          ],
          currentDurability: toBN(prevState.currentDurability)
            .add(toBN(toWei("10")))
            .toString(),
          maxDurability: toBN(prevState.maxDurability)
            .add(toBN(toWei("10")))
            .toString(),
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess(
          `Fortification ${fortifications[type].name} done successfully!`
        );
      }).catch((err) => {
        console.log("Fortify Error: ", err);
        setIsLoading({ type: -1, loading: false });
        notifyError("Buy Fortification Error");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    }
  };

  const buyFireplace = async () => {
    setIsLoading({ type: 4, loading: true });
    const cost = fireplaceCost.cost;

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
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/buyFireplace`, {
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

        const { resource } = res.data;
        setUserResource((prevState) => ({
          ...prevState,
          resource,
        }));

        setHouse((prevState) => ({
          ...prevState,
          hasFireplace: true,
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess("Fireplace purchased successfully!");
      }).catch((err) => {
        console.log("Buy Fireplace Error: ", err);
        setIsLoading({ type: -1, loading: false });
        notifyError("Buy Fireplace Error");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    }
  };

  const buyConcreteFoundation = async () => {
    setIsLoading({ type: 5, loading: true });
    const cost = concreteFundationCost.cost;

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
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/buyConcreteFoundation`, {
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

        const { resource } = res.data;
        setUserResource((prevState) => ({
          ...prevState,
          resource,
        }));

        setHouse((prevState) => ({
          ...prevState,
          hasConcreteFoundation: true,
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess("Concrete Foundation buyed successfully!");
      }).catch((err) => {
        console.log("Buy Concrete Foundation Error: ", err);
        setIsLoading({ type: -1, loading: false });
        notifyError("Buy Concrete Foundation Error");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    }
  };

  const buyHarvester = async () => {
    setIsLoading({ type: 6, loading: true });
    const cost = harvesterCost.cost;

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
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/buyHarvester`, {
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

        const { resource } = res.data;
        setUserResource((prevState) => ({
          ...prevState,
          resource,
        }));

        setHouse((prevState) => ({
          ...prevState,
          hasHarvester: true,
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess("Harvester purchased successfully!");
      }).catch((err) => {
        console.log("Buy Harvester Error: ", err);
        setIsLoading({ type: -1, loading: false });
        notifyError("Buy Harvester Error");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    }
  };

  const burnLumber = async (lumber) => {
    setIsLoading({ type: 4, loading: true });
    const cost = [0, lumber, 0, 0, 0];

    if (!jwtToken) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Please login!");
    }

    if (!activated) {
      setIsLoading({ type: -1, loading: true });
      return notifyError("Please Activate First");
    }

    if (deadTime != "0") {
      setIsLoading({ type: -1, loading: false });
      return notifyError("This house has been expired");
    }

    if (await validateResource(state, cost, setUserResource, tokenId)) {
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/burnLumberToMakePower`, {
        "tokenId": tokenId,
        "lumber": toWei(lumber)
      }, {
        headers: {
          'Authorization': jwtToken
        }
      }).then(async (res) => {
        if (res.data.status != 'success') {
          setIsLoading({ type: -1, loading: false });
          return notifyError(res.reason);
        }

        const { resource } = res.data;
        setUserResource((prevState) => ({
          ...prevState,
          resource,
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess(`${lumber} Lumber burned successfully!`);
      }).catch((err) => {
        console.log("Burn Lumber Error: ", err);
        setIsLoading({ type: -1, loading: false });
        notifyError("Burn Lumber Error");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough lumber");
    }
  };

  const countOfFort = lastFortTime.filter(
    (ft) => Number(ft) * 1000 > Date.now()
  ).length;

  return (
    <div className="container px-0 my-5">
      <div className="upgrade-section upgrade-section-row">
        <div className="position-relative d-flex justify-content-center toolshed-carousel product-upgrade-mobile">
          <span
            onClick={() =>
              handleToolshedSelect(toolshedIndex > 0 ? toolshedIndex - 1 : 0)
            }
            className="d-flex carousel-control-icon control-icon-prev position-absolute justify-content-center align-items-center"
          >
            <img src={carouselIcon} alt="Carousel prev icon" />
          </span>
          <Carousel
            width={257}
            showStatus={false}
            showThumbs={false}
            showArrows={false}
            selectedItem={toolshedIndex}
          >
            {toolshed.map((cost, index) => {
              const item = {
                id: 2,
                title: prefixTitle[index] + "Toolshed",
                imgUrl: toolshedImages[index],
                type: "toolshed",
              };
              const toolshedType = index + 1;
              let btnTitle = hasToolshed[toolshedType] ? "OWNED" : "BUY";
              let colorType = hasToolshed[toolshedType] ? 3 : 1;
              if (
                hasToolshed[toolshedType] &&
                activeToolshedType !== toolshedType.toString()
              ) {
                btnTitle = "SWITCH";
                colorType = 2;
                cost.cost = toolshedSwitchCost;
              }

              if (!activated || !isOwn)
                colorType = 0;

              return (
                <YieldUpgrade
                  key={`yield-upgrade-${index}`}
                  cost={cost}
                  item={item}
                  colorType={colorType}
                  btnTitle={btnTitle}
                  onPurcharse={() =>
                    btnTitle === "BUY"
                      ? buyToolshed(toolshedType)
                      : switchToolshed(toolshedType)
                  }
                  disabled={(btnTitle === "OWNED") || !activated || !isOwn}
                  type="production"
                  className="none-animate"
                  isLoading={isLoading}
                />
              );
            })}
          </Carousel>
          <span
            onClick={() =>
              handleToolshedSelect(toolshedIndex < 3 ? toolshedIndex + 1 : 3)
            }
            className="d-flex carousel-control-icon control-icon-next position-absolute justify-content-center align-items-center"
          >
            <img src={carouselIcon} alt="Carousel next icon" />
          </span>
        </div>
        <div className="product-upgrade-mobile">
          <FireplaceUpgrade
            cost={fireplaceCost}
            item={fireplaceItem}
            colorType={(activated && isOwn) ? (hasFireplace ? 2 : 1) : 0}
            btnTitle={hasFireplace ? "BURN" : "BUY"}
            onPurcharse={(lumber) =>
              hasFireplace ? burnLumber(lumber) : buyFireplace()
            }
            disabled={!activated || !isOwn}
            type="production"
            isLoading={isLoading}
          />
        </div>
        <div className="product-upgrade-mobile">
          <YieldUpgrade
            cost={concreteFundationCost}
            item={concreteFoundation}
            colorType={(activated && isOwn) ? (hasConcreteFoundation ? 3 : 1) : 0}
            btnTitle={hasConcreteFoundation ? "OWNED" : "BUY"}
            onPurcharse={() => buyConcreteFoundation()}
            disabled={hasConcreteFoundation || !activated || !isOwn}
            type="production"
            isLoading={isLoading}
          />
        </div>
        <div className="product-upgrade-mobile">
          <YieldUpgrade
            cost={harvesterCost}
            item={harvesterItem}
            colorType={(activated && isOwn) ? (hasHarvester ? 3 : 1) : 0}
            btnTitle={hasHarvester ? "OWNED" : "BUY"}
            onPurcharse={buyHarvester}
            disabled={hasHarvester || !activated || !isOwn}
            type="production"
            isLoading={isLoading}
          />
        </div>
        {fortifications.map((fort, index) => {
          const item = {
            id: fort.id,
            type: "fatification",
            title: `Fortification ${fort.name}`,
            imgUrl: fort.imgUrl,
          };
          const cost = {
            durability: "+10",
            maxDurability: 100 + 10 * (countOfFort + 1),
            cost: fort.cost,
          };

          let btnTitle = "BUY";
          let durationDate = 7;
          let colorType = 1;
          if (Number(lastFortTime[index]) * 1000 > Date.now()) {
            btnTitle = "OWNED";
            durationDate = Math.floor(
              (Number(lastFortTime[index]) * 1000 - Date.now()) /
                gameSetting.SECONDS_IN_A_DAY /
                1000
            );
            if (durationDate === 0) durationDate = 0.5;
            colorType = 3;
            cost.maxDurability = "";
          }

          if (!activated || !isOwn)
            colorType = 0;

          return (
            <div
              key={`production-upgrade-${index}`}
              className="product-upgrade-mobile"
            >
              <YieldUpgrade
                cost={cost}
                item={item}
                colorType={colorType}
                btnTitle={btnTitle}
                onPurcharse={() => fortify(index)}
                disabled={(btnTitle === "OWNED") || !activated || !isOwn}
                durationDate={durationDate}
                type="production"
                isLoading={isLoading}
              />
            </div>
          );
        })}
        <div className="product-upgrade-mobile">
          <HireHandymanUpgrade
            cost={hireHandymanCost}
            item={hireHandyman}
            colorType={
              (activated && isOwn) ? (Number(lastHandymanHiredTime) * 1000 > Date.now() ? 3 : 1) : 0
            }
            
            btnTitle={
              Number(lastHandymanHiredTime) * 1000 > Date.now()
                ? "OWNED"
                : "BUY"
            }
            onPurcharse={() => hireHandymanAction()}
            disabled={(!activated || isOwn) ||
              ((Number(lastHandymanHiredTime) * 1000 > Date.now()
                ? true
                : false) || house.currentDurability == 100)
            }
            type="production"
            houseMaxDurability={house.maxDurability}
            houseDurability={house.currentDurability}
            duration={Math.floor(
              (Number(lastHandymanHiredTime) * 1000 - Date.now()) /
                gameSetting.SECONDS_IN_A_DAY /
                1000
            )}
            isLoading={isLoading}
          />
        </div>
      </div>
      
    </div>
  );
};
