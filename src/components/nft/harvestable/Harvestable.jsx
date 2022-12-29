import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Web3 from "web3";
import axios from "axios";
import numeral from "numeral";
import { useParams } from "react-router-dom";
import { useLandshareFunctions } from "../../../contexts/LandshareFunctionsProvider";
import { validateResource } from "../../../contexts/game/validator";
import gameSetting from '../../../contexts/game/setting.json';
import { HarvestableCards } from './HarvestableCards';
import landTokenStakingImg from '../../../assets/img/icons/land-token-staking-img.png';
import { HarvestCostUpgrade } from "../buyOrUpgrade/HarvestCostUpgrade";
import { HarvestCostContent } from "../buyOrUpgrade/HarvestCostContent";
import { CustomModal } from "../../common/modal/Modal";
import { Modal } from 'react-bootstrap';

import Timer from "../../../assets/img/icons/timer.png";
import './Harvestable.css'
import './HarvestableCard.css'

export const Harvestable = ({
  tokenReward,
  resourceReward,
  facilityLevel,
  selectedToken,
  selectedResource,
  setSelectedToken,
  setSelectedResource,
  activated,
  hasBoost,
  setHouse,
  setUserResource,
  house
}) => {
  const [overdriveActivatedType, setOverdriveActivatedType] = useState('-1');
  const [isLoading, setIsLoading] = useState({ type: -1, loading: false })
  const { state, notifySuccess, notifyError } = useLandshareFunctions();
  const [openModal, setOpenModal] = useState(false);

  const {
    account,
    game,
    setting,
    web3,
    landTokenContract,
    gameAddress
  } = state;
  const { tokenId } = useParams();
  const [overdrive, setOverdrive] = useState(gameSetting.overdrive);
  const [overdriveDays, setOverdriveDays] = useState(gameSetting.overdriveDays);
  const [selectoverdrive, setSelectOverDrive] = useState(0)
  const [overdriveToken, setOverdirveToken] = useState({
    id: 4,
    title: "Token Overdrive",
    type: "overdrive",
    img: "",
    cost: [25, 0, 0, 0, 0],
    reductionPercent: [0, 0, 0, 0, 0, 0]
  });
  const prefixTitle = ["Lumber ", "Brick ", "Concrete ", "Steel "];
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    loadSetting();
  }, [state]);

  const loadSetting = async() => {
    if (setting) {
      const specialAddonSetting = await state.setting.methods.getSpecialAddonSetting().call();
      setOverdrive(prevState => ([
        {...prevState[0], cost: [specialAddonSetting[6], 0, 0, 0, 0], reductionPercent: [0, Number(specialAddonSetting[7]) - 100, 0, 0, 0, 0]},
        {...prevState[1], cost: [specialAddonSetting[6], 0, 0, 0, 0], reductionPercent: [0, 0, Number(specialAddonSetting[7]) - 100, 0, 0, 0]},
        {...prevState[2], cost: [specialAddonSetting[6], 0, 0, 0, 0], reductionPercent: [0, 0, 0, Number(specialAddonSetting[7]) - 100, 0, 0]},
        {...prevState[3], cost: [specialAddonSetting[6], 0, 0, 0, 0], reductionPercent: [0, 0, 0, 0, Number(specialAddonSetting[7]) - 100, 0]}
      ]));
      setOverdriveDays(specialAddonSetting[9]);
      setOverdirveToken(prevState => ({...prevState, cost: [specialAddonSetting[6], 0, 0, 0, 0], reductionPercent: [0, 0, 0, 0, 0, Number(specialAddonSetting[8]) - 100]}));
    }
  }
  const buyOverdriveToken = async () => {
    setOpenModal(false);
    setIsLoading({ type: 4, loading: true });
    const cost = overdriveToken.cost;

    if (!jwtToken) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Please login!");
    }

    if (house.deadTime != "0") {
      setIsLoading({ type: -1, loading: false });
      return notifyError("This house has been expired");
    }
    
    if (!activated) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Please Activate First");
    }
    
    if (await validateResource(state, cost, setUserResource, tokenId)) {
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/buyTokenOverdrive`, {
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
          hasBoost: res.data.hasBoost
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess(
          `Token Overdrive purchased successfully!`
        );
      }).catch((err) => {
        console.log("Buy Token Overdrive Error: ", err);
        setIsLoading({ type: -1, loading: false });
        notifyError("Buy Token Overdrive error");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    }
  }

  const buyOverdrive = async (overdriveType) => {
    setOpenModal(false);
    setIsLoading({ type: overdriveType, loading: true });

    if (!activated) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Please Activate First");
    }

    if (house.deadTime != "0") {
      setIsLoading({ type: -1, loading: false });
      return notifyError("This house has been expired");
    }

    if ((overdriveType < 0) && (overdriveType > 3)) {
      return notifyError("Invalid facility type");
    }
    
    activeOverdrive(overdriveType);
  };

  const buyOverdriveSelect = async (overdriveType) => {   
    if (!jwtToken) {
      setIsLoading({ type: -1, loading: false });
      return notifyError("Please login!");
    }

    if (hasBoost.filter(boost => boost).length > 0) {
      setIsLoading({ type: -1, loading: false });
      setOpenModal(true);
      setSelectOverDrive(overdriveType);
    } else {
      if (overdriveType == 4)
        buyOverdriveToken();
      else
        activeOverdrive(overdriveType);
    }
  };

  const activeOverdrive = async (overdriveType) => {
    setIsLoading({ type: overdriveType, loading: true });
    const cost = overdrive[overdriveType].cost;

    if (await validateResource(state, cost, setUserResource, tokenId)) {
      await axios.post(`${process.env.REACT_APP_BACKEND_BASE_URL}/api/buyResourceOverdrive`, {
        "tokenId": tokenId,
        "facilityType": overdriveType + 1
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
          hasBoost: res.data.hasBoost
        }));

        setIsLoading({ type: -1, loading: false });
        notifySuccess(
          `${prefixTitle[overdriveType]} Overdrive purchased successfully!`
        );
      }).catch((err) => {
        console.log("Buy Overdrive Error: ", err);
        setIsLoading({ type: -1, loading: false });
        notifyError("Buy Overdrive error");
      });
    } else {
      setIsLoading({ type: -1, loading: false });
      notifyError("Not enough resource");
    } 
    setOpenModal(false)
  };

  

  return (
    <div className='d-flx flex-column'>
      <h4 className="harvestable-resources m-0 fs-16 fw-600 text-black-700 mt-2">Harvestable Resources:</h4>
      <div className='harvestable-section mt-3'>
        {resourceReward.map((reward, type) => {
          if (type > 0){
            const item = {
              id: type-1,
              title: prefixTitle[type-1] + "Overdrive",
              type: "overdrive",
            };
            
            let colorType = 2
            let btnTitle = "BOOST";
            
            if (facilityLevel[type] < 1) colorType = 0;
            if (!activated) colorType = 0;
            if (hasBoost[type]) {
              btnTitle = "ACTIVE";
              colorType = 3;
            }
            let cost = overdrive[type-1]
    
            return <HarvestableCards
              key={`harvestable-card-${type}`}
              type={type}
              reward={reward}
              facilityLevel={facilityLevel}
              selectedResource={selectedResource}
              setSelectedResource={setSelectedResource}
              cost={cost}
              item={item}
              colorType={colorType}
              btnTitle={btnTitle}
              onPurcharse={() =>
                btnTitle === "BOOST" ? buyOverdriveSelect(type-1) : {}
              }
              disabled={!activated}
              typeproduct="production"
              className="none-animate"
              isLoading={isLoading}
            />
          }
            
        })}
        <div
          // className= {Web3.utils.fromWei(tokenReward).toString() === "0" ? "harvestable-card cards-hover-animation" : (selectedToken ? "harvestable-card-selected cards-hover-animation" : "harvestable-card-enable cards-hover-animation")}
          className = "harvestable-card cards-hover-animation"
        >
          <div className="harvestable-card-header mb-4 cursor-pointer">
            <Form.Check 
              type='checkbox'
              id='checkbox-token'
              label={<span className="fs-16 fw-600 text-black-700 cursor-pointer">Tokens</span>}
              className="custom-checkbox"
              checked={selectedToken}
              disabled={Web3.utils.fromWei(tokenReward).toString() === "0"}
              onChange={(e) => setSelectedToken(prevState => !prevState)}
            />
          </div>
          <div 
            className="harvestable-card-body d-flex justify-content-center position-relative cursor-pointer"
            onClick={() => {
              if (Web3.utils.fromWei(tokenReward).toString() === "0") return;
              setSelectedToken(prevState => !prevState);
            }}
          >
            <img 
              style={{ 
                height: '84px',
                opacity: Web3.utils.fromWei(tokenReward).toString() === "0" ? '0.1' : (selectedToken ? '1' : '0.6')
              }}
              className="harvestable-card-image"
              src={landTokenStakingImg} 
            />
            <div className="position-absolute reward-value fs-16 fw-600">
              {numeral(Number(Web3.utils.fromWei(tokenReward))).format('0.[00]').toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </div>
          </div>
          <div className="harvestable-upgrade-cost position-relative">
            <HarvestCostUpgrade
              color={activated ? 
                (house.depositedBalance > 0 ? (hasBoost[0] ? "blue" : "yellow") : "disable") 
                : "disable"} // && Web3.utils.fromWei(tokenReward).toString() !== "0" 
              btnLabel={(hasBoost[0]) ? "ACTIVE" : "BOOST"}
              onPurcharse={() => ((hasBoost[0])) ? {} : buyOverdriveSelect(4)
              }
              disabled={!activated || (house.depositedBalance < 1)}
              isLoading={isLoading}
              type={overdriveToken.id}
            >
              <HarvestCostContent
                costs={overdriveToken}
                colorType={activated ? 
                  (house.depositedBalance > 0 ? 2 : 0) 
                  : 0}
                color={activated ? 
                  (house.depositedBalance > 0 ? (hasBoost[0] ? "blue" : "yellow") : "grey")
                  : "grey"}
                type={overdriveToken.type}
              />
            </HarvestCostUpgrade>
          </div>
        </div>
      </div>
      <Modal
        show={openModal}
        onHide={() => setOpenModal(false)}
        className="modal_content">
        <div className="modal_body">
          <div className="modal_header">Boosting this resource will cancel your existing boost. Continue?</div>
          <div className="modal_buttons">
            <div className="modal_buttons_yes cursor-pointer" onClick={()=> {
              if (selectoverdrive == 4)
                buyOverdriveToken();
              else
                buyOverdrive(selectoverdrive);
            }}>  
              Yes          
            </div>
            <div className="modal_buttons_no cursor-pointer" onClick={() => {
              setIsLoading({ type: -1, loading: false });
              setOpenModal(false);
            }}>
              No
            </div>
          </div>
          
        </div>        
      </Modal>
    </div>
  );
}
