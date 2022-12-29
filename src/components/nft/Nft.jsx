import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import NftDetails from "./NftDetails";
import Topbar from "./topbar/Topbar";
import YouOwn from "./YouOwn";
import MainTabs from "../common/tab/Tab";
import { EstimateView } from "./EstimateView/EstimateView";
import { ProductionFacilities } from "./productionFacilities/ProductionFacilities";
import { ProductionUpgrade } from "./productionUpgrade/ProductionUpgrade";
import { UpgradeSection } from "./upgradeSection/UpgradeSection";
import { useScreenFixedProvider } from "../../contexts/ScreenFixedProvider";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import HeaderModal from "../HeaderModal";

const Nft = () => {
  const { setNftRoute } = useScreenFixedProvider();
  const { state } = useLandshareFunctions();
  const { tokenId } = useParams();
  const [userResource, setUserResource] = useState({
    resource: ["0", "0", "0", "0", "0"],
    maxPowerLimit: "0",
    landTokenBalance: "0",
  });
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isOwn, setIsOwn] = useState(false);
  const [house, setHouse] = useState({
    name: "",
    series: "",
    depositedBalance: "0",
    multiplier: "0",
    currentDurability: "0",
    maxDurability: "0",
    repairCost: ["0", "0", "0", "0", "0"],
    facilityLevel: ["1", "0", "0", "0", "0"],
    tokenReward: "0",
    resourceReward: ["0", "0", "0", "0", "0"],
    hasAddon: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    hasToolshed: [false, false, false, false, false],
    activeToolshedType: "0",
    hasFireplace: false,
    hasConcreteFoundation: false,
    gardenFertilize: false,
    hasHarvester: false,
    lastFortTime: ["0", "0", "0"],
    lastHandymanHiredTime: "0",
    activated: false,
    expireGardenTime: ["0"],
    hasBoost: [false, false, false, false, false],
    totalHarvestedToken: "0",
    tokenHarvestLimit: "0",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setNftRoute(true);
    return () => {
      setNftRoute(false);
    };
  }, []);

  const getHouse = async () => {
    if (state.houseNFT) {
      const houseTokenId = await state.houseNFT.methods
        .getActiveHouseByOwner(state.account)
        .call();
      const houseNft = await state.houseNFT.methods.getHouse(tokenId).call();
      const houseDetails = await state.helper.methods
        .getHouseDetails(tokenId)
        .call();
      const resource = await state.game.methods
        .getResource(state.account, tokenId)
        .call();
      const maxPowerLimit = await state.houseNFT.methods
        .calculateMaxPowerLimitByUser(tokenId)
        .call();
      const landTokenBalance = await state.landTokenContract.methods
        .balanceOf(state.account)
        .call();
      const firepitDays = await state.houseNFT.methods
        .getFirepitRemainDays(tokenId)
        .call();
      if (houseTokenId == tokenId) {
        setIsOwn(true);
      }
      setUserResource({
        resource,
        maxPowerLimit,
        landTokenBalance,
      });
      setHouse((prevState) => ({
        ...prevState,
        isRare: houseNft.isRare,
        rareId: houseNft.rareId,
        name: houseNft.name,
        series: houseNft.series,
        depositedBalance: houseNft.depositedBalance,
        deadTime: houseNft.deadTime,
        hasAddon: houseNft.hasAddon,
        hasFireplace: houseNft.hasFireplace,
        hasHarvester: houseNft.hasHarvester,
        hasToolshed: houseNft.hasToolshed,
        hasConcreteFoundation: houseNft.hasConcreteFoundation,
        facilityLevel: houseNft.facilityLevel,
        activeToolshedType: houseNft.activeToolshedType,
        lastFortTime: houseNft.lastFortificationTime,
        activated: houseNft.activated,
        expireGardenTime: houseNft.expireGardenTime,
        lastFertilizedGardenTime: houseNft.lastFertilizedGardenTime,
        lastHandymanHiredTime: houseNft.lastHandymanHiredTime,
        hasBoost: houseNft.hasBoost,
        totalHarvestedToken: houseNft.totalHarvestedToken,
        firepitRemainDays: firepitDays,

        currentDurability: houseDetails[0],
        maxDurability: houseDetails[1],
        multiplier: houseDetails[2],
        resourceReward: houseDetails[3],
        tokenReward: houseDetails[4],
        tokenHarvestLimit: houseDetails[5],
      }));
    }
  };
  const tabItems = [
    {
      id: "Property Overview",
      children: (
        <EstimateView
          levels={house.facilityLevel}
          hasAddon={house.hasAddon}
          hasToolshed={house.hasToolshed}
          hasHarvester={house.hasHarvester}
          hasFireplace={house.hasFireplace}
          activeToolshedType={house.activeToolshedType}
          lastFortTime={house.lastFortTime}
          activated={house.activated}
          lastHandymanHiredTime={house.lastHandymanHiredTime}
          hasConcreteFoundation={house.hasConcreteFoundation}
          setHouse={setHouse}
          setUserResource={setUserResource}
        />
      ),
    },
    {
      id: "Production Facilities",
      children: (
        <ProductionFacilities
          isOwn={isOwn}
          levels={house.facilityLevel}
          activated={house.activated}
          setHouse={setHouse}
          setUserResource={setUserResource}
          hasBoost={house.hasBoost}
          deadTime={house.deadTime}
        />
      ),
    },
    {
      id: "Yield Upgrades",
      children: (
        <UpgradeSection
          isOwn={isOwn}
          hasAddon={house.hasAddon}
          lastFortTime={house.lastFortTime}
          activated={house.activated}
          expireGardenTime={house.expireGardenTime}
          lastFertilizedGardenTime={house.lastFertilizedGardenTime}
          setHouse={setHouse}
          setUserResource={setUserResource}
          deadTime={house.deadTime}
        />
      ),
    },
    {
      id: "Production Upgrades",
      children: (
        <ProductionUpgrade
          isOwn={isOwn}
          hasToolshed={house.hasToolshed}
          hasHarvester={house.hasHarvester}
          hasFireplace={house.hasFireplace}
          hasConcreteFoundation={house.hasConcreteFoundation}
          lastHandymanHiredTime={house.lastHandymanHiredTime}
          activeToolshedType={house.activeToolshedType}
          lastFortTime={house.lastFortTime}
          activated={house.activated}
          house={house}
          userResource={userResource}
          setHouse={setHouse}
          setUserResource={setUserResource}
          deadTime={house.deadTime}
        />
      ),
    },
  ];

  useEffect(() => {
    if (state.web3) {
      getHouse();
      setTimeout(() => {
        setIsLoading(false);
      }, 1500)
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500)
    }
    
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      getHouse();
    }, 300000);

    return () => clearInterval(interval);
  }, [house.activated]);
  
  return (
    <>
      <div className="container d-flex flex-column">
        {isLoading ? (
          <div className="d-flex w-100 min-h-60vh h-100 align-items-center justify-content-center">
            <ReactLoading type="bars" color="#0ed145" />
          </div>
        ) : state.web3 === "undefined" || !state.isConnected ? (
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
            <Topbar isNftList={false} />
            <NftDetails
              isOwn={isOwn}
              isRare={house.isRare}
              depositedBalance={house.depositedBalance}
              currentDurability={house.currentDurability}
              maxDurability={house.maxDurability}
              multiplier={house.multiplier}
              repairCost={house.repairCost}
              tokenReward={house.tokenReward}
              resourceReward={house.resourceReward}
              facilityLevel={house.facilityLevel}
              hasHarvester={house.hasHarvester}
              hasAddon={house.hasAddon}
              activated={house.activated}
              deadTime={house.deadTime}
              house={house}
              getHouse={getHouse}
              setHouse={setHouse}
              setUserResource={setUserResource}
              resource={userResource.resource}
              totalHarvestedToken={house.totalHarvestedToken}
              tokenHarvestLimit={house.tokenHarvestLimit}
              lastFortTime={house.lastFortTime}
              firepitRemainDays={house.firepitRemainDays}
            />
            {house.name && (
              <div className="mainTabs-styles">
                <MainTabs tabItems={tabItems} />
              </div>
            )}
          </>
        )}
      </div>
      {state.web3 !== "undefined" && state.isConnected && (
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

export default Nft;
