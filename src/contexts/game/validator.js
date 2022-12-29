import Web3 from "web3";
import gameSetting from "./setting.json";
const { fromWei, toBN, toWei } = Web3.utils;

export const validateLandtokenBalance = async (state, tokenReward) => {
  const { landTokenContract, gameAddress } = state;
  const landtokenBalanceInGameContract = await landTokenContract.methods.balanceOf(gameAddress).call();
  return toBN(tokenReward).lte(toBN(landtokenBalanceInGameContract));
}

export const validateMaxPower = async(state, power, setUserResource, houseTokenId) => {
  const resource = await state.game.methods.getResource(state.account, houseTokenId).call();
  setUserResource(prevState => ({
    ...prevState,
    resource
  }))
  const maxPowerLimit = await state.houseNFT.methods.calculateMaxPowerLimitByUser(houseTokenId).call();
  if (toBN(maxPowerLimit).gt(toBN(resource[0]).add(toBN(toWei(power))))) {
    return true;
  } else {
    return false;
  }
}

export const validateResource = async(state, cost, setUserResource, houseTokenId) => {
  const resource = await state.game.methods.getResource(state.account, houseTokenId).call();
  setUserResource((prevState) => ({
    ...prevState,
    resource: resource
  }));
  
  let isValidated = true;
  for (let i = 0; i < 5; i++) {
    let resouceAmount = parseFloat(fromWei(resource[i]));
    if (resouceAmount < cost[i]) {
      isValidated = false;
      break;
    }
  }

  return isValidated;
}

export const validateDependency = (hasAddon, addonId) => {
  const dependency = gameSetting.addon[addonId].dependency;
  var isValidated = true;

  for(var i = 0; i < dependency.length; i++) {
    if (!hasAddon[dependency[i]]) {
      isValidated = false;
      break;
    }
  }

  return isValidated;
}

export const validateFortDependency = (lastFortTime, addonId) => {
  const idx = gameSetting.addon[addonId].fortDependency;

  if (idx == undefined) {
    return true;
  } else if(lastFortTime != undefined){
      if(Number(lastFortTime[idx]) * 1000 > Date.now()){
        return true;
      }
  }

  return false;
}

export const getMinimumValue = (arrayData) => {
  var minValue = arrayData[0];
  for (var i = 1; i < 5; i++) {
    if (minValue > arrayData[i]) {
      minValue = arrayData[i];
    }
  }
  
  return minValue;
}