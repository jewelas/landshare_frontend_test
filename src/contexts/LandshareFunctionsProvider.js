import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import claim from "./abis/claim.json";
import LandStake from "./abis/LandTokenStake.json";
import LandStake2 from "./abis/LandTokenStake2.json";
import Token from "./abis/LandToken.json";
//import Busd from "./abis/BUSD.json";
import BEP20 from "./abis/BEP20.json";
import Setting from "./abis/Setting.json";
import HouseNFT from "./abis/HouseNFT.json";
import Helper from "./abis/Helper.json";
import NFTStake from "./abis/NFTStake.json";
import Game from "./abis/Game.json";
import AssetToken from "./abis/FakeAssetToken.json";
import Web3, { utils } from "web3";
import useWalletConnector from "../hooks/useWalletConnector";

import PropertyVault from "./abis/PV.json";
import WalletConnectProvider from "@walletconnect/web3-provider";
import ApePair from "./ApePair.json";
import {
  doc,
  updateDoc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";

import { db } from "../lib/firebase";

const LandshareFunctionsContext = React.createContext();
export function useLandshareFunctions() {
  return useContext(LandshareFunctionsContext);
}

export const useIsMount = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};

export default function LandshareFunctionsProvider({ children }) {
  const [autoCompounding, setAutoCompounding] = useState(false);
  const [isWalletAvailable, setIsWalletAvailable] = useState(null);
  const [alertModal, setAlertModal] = useState({
    show: false,
    type: 'success',
    message: ''
  });
  const [state, setState] = useState({
    web3: "undefined",
    transactionStatus: "",
    isAlert: false,
    netID: "undefined",
    account: "Not Connected",
    walletType: JSON.parse(localStorage.getItem("wallettype")),
    balanceBNB: 0,
    provider: "undefined",
    isConnected: false,
    isBlockchainDataLoading: false,
    unlockTime: 0,

    //token stuff
    landTokenAddress: null,
    landTokenContract: null,
    busd: null,

    //staking stuff
    landStakeContract: null,
    landStakeAddress: null,
    landStakeDepositBalance: 0,
    isApprovedLandStake: false,
    rewardPool: 0,
    landTokenStakeCurrentDepositTotal: 0,

    landStakeContract2: null,
    landStakeDepositBalance2: 0,
    isApprovedLandStake2: false,
    landTokenStakeCurrentDepositTotal2: 0,
    rewardPool2: 0,

    //property vault stuff
    propertyVaultContract: null,
    propertyVaultDepositBalance: 0,
    harvestAmountBUSD: 0,
    harvestAmountLAND: 0,
    propertyVaultAddress: null,
    time: 0,
    isApprovedPropertyVault: false,
    propertyVaultCurrentDepositTotal: 0,
    currentVaultCapacity: 0,
    isLoadingPV: true,

    coinPair: 0,
    bnbPair: 0,
    price: 0,
    bnbPrice: 0,

    claimableContract: null,
    claimableAmt: 0,
    unclaimedTokens: 0,

    whichVault: "v2",

    setting: null,
    houseNFT: null,
    helper: null,
    nftStake: null,
    game: null,
    assetToken: null,
    nftStakeAddress: null,
    gameAddress: null,
  });

  const { disconnectWallet, walletConnector, metaMask, ONTOWallet } =
    useWalletConnector({
      state,
      setState,
    });

  useEffect(() => {
    async function checkWalletType() {
      // There should be === instead of ==
      if (state.walletType === "mm") {
        await metaMask();
      } else if (state.walletType === "wc") {
        await walletConnector();
      } else if (state.walletType === "on") {
        await ONTOWallet();
      } else {
        //await loadBlockchainData();
      }
    }
    if (isMount) {
      checkWalletType();
    }
  }, []);

  const { isConnected, walletType } = state;
  const isMount = useIsMount();

  useEffect(() => {
    async function loadBlockchainData() {
      //loads contracts and blockchain data

      if (state.web3 !== "undefined" && state.isConnected == false) {
        setState((preState) => {
          return { ...preState, isBlockchainDataLoading: true };
        });
        //const web3 = new Web3(state.web3);
        // const tokenContractAddress              // '0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee' add this and remove below if using testnet
        const netId = await state.web3.eth.net.getId();

        setState((preState) => {
          return { ...preState, netID: netId };
        });

        if (netId !== Number(process.env.REACT_APP_NET_ID)) {
          window.alert("Please Connect to the Binance Smart Chain.");

          disconnectWallet();

          setState((preState) => {
            return { ...preState, isBlockchainDataLoading: false };
          });
          return;
        }

        try {
          //load contracts
          const token = new state.web3.eth.Contract( // Landtoken.sol
            Token.abi,
            process.env.REACT_APP_LAND_TOKEN_ADDR
          );

          const landStake = new state.web3.eth.Contract( // LandTokenStake.sol
            LandStake.abi,
            process.env.REACT_APP_LAND_TOKEN_STAKE_ADDR
          );

          const landStake2 = new state.web3.eth.Contract( // LandTokenStake2.sol
            LandStake2.abi,
            process.env.REACT_APP_LAND_TOKEN_STAKE_2_ADDR
          );
          
          const propertyVault = new state.web3.eth.Contract( // stake.sol
            PropertyVault.abi,
            process.env.REACT_APP_PROPERTY_VAULT_ADDR
          );

          const busd = new state.web3.eth.Contract( // BEP20Token.sol
            BEP20.abi,
            process.env.REACT_APP_BUSD_ADDR
          );

          const coinPair = new state.web3.eth.Contract( // ApePair.sol
            ApePair.abi,
            process.env.REACT_APP_APE_PAIR_ADDR
          );

          const bnbPair = new state.web3.eth.Contract( // ApePair.sol
            ApePair.abi,
            process.env.REACT_APP_BNB_PAIR_ADDR
          );

          const claimableContract = new state.web3.eth.Contract( // claim.sol
            claim.abi,
            process.env.REACT_APP_CLAIM_ADDR
          );

          const setting = new state.web3.eth.Contract( // Setting.sol
            Setting.abi,
            process.env.REACT_APP_SETTING_ADDR
          );
          
          const houseNFT = new state.web3.eth.Contract( // HouseNFT.sol
            HouseNFT.abi,
            process.env.REACT_APP_HOUSE_NFT_ADDR
          );
          
          const helper = new state.web3.eth.Contract( // Helper.sol
            Helper.abi,
            process.env.REACT_APP_HELPER_ADDR
          );

          const nftStake = new state.web3.eth.Contract( // Skake.sol
            NFTStake.abi,
            process.env.REACT_APP_NFT_STAKE_ADDR
          );

          const game = new state.web3.eth.Contract( // Game.sol
            Game.abi,
            process.env.REACT_APP_GAME_ADDR
          );

          const assetToken = new state.web3.eth.Contract( // AssetToken.sol
            AssetToken.abi,
            process.env.REACT_APP_ASSET_TOKEN_ADDR
          );

          //price calculation

          const reservesBNB = await bnbPair.methods.getReserves().call();

          const bnbPrice = reservesBNB[1] / reservesBNB[0];

          const reservesToken = await coinPair.methods.getReserves().call();

          const coinPrice = reservesToken[1] / reservesToken[0];

          const usdPrice = coinPrice * bnbPrice;

          setState((preState) => {
            return {
              ...preState,
              landTokenContract: token,
              propertyVaultContract: propertyVault,
              landStakeContract: landStake,
              landStakeContract2: landStake2,
              busd: busd,
              price: usdPrice,
              bnbPrice: bnbPrice,
              claimableContract: claimableContract,
              setting,
              houseNFT,
              helper,
              nftStake,
              game,
              assetToken
            };
          });

          // const landStakeAddress = LandStake.networks[netId].address;
          // const propertyVaultAddress = PropertyVault.networks[netId].address;
          // const landTokenAddress = "0x9D986A3f147212327Dd658F712d5264a73a1fdB0";
          const landStakeAddress = process.env.REACT_APP_LAND_TOKEN_STAKE_ADDR; // LandTokenStake.sol
          const propertyVaultAddress = process.env.REACT_APP_PROPERTY_VAULT_ADDR; // stake.sol
          const landTokenAddress = process.env.REACT_APP_LAND_TOKEN_ADDR; // LandToken.sol
          const nftStakeAddress = process.env.REACT_APP_NFT_STAKE_ADDR // Stake.sol
          const gameAddress = process.env.REACT_APP_GAME_ADDR // Game.sol
          setState((preState) => {
            return {
              ...preState,
              landStakeAddress: landStakeAddress,
              propertyVaultAddress: propertyVaultAddress,
              landTokenAddress: landTokenAddress,
              nftStakeAddress,
              gameAddress
            };
          });
          approveChecker();
          setState((preState) => {
            return { ...preState, isConnected: true };
          });
        } catch (e) {
          console.log('error', e);
          window.alert("Please connect to Binance Smart Chain.");

          disconnectWallet();
        }
      } else {
        setState((preState) => {
          return { ...preState, isBlockchainDataLoading: false };
        });
      }
    }

    if (isMount) {
      //nothing
    } else {
      loadBlockchainData();
    }
  }, [state.web3]);

  async function approveChecker() {
    //approved checker
    try {
      const isApproved = await state.busd.methods
        .allowance(state.account, state.propertyVaultAddress)
        .call();

      if (isApproved > 0) {
        setState((preState) => {
          return { ...preState, isApprovedPropertyVault: true };
        });
      } else {
        setState((preState) => {
          return { ...preState, isApprovedPropertyVault: false };
        });
      }
    } catch (e) {
      setState((preState) => {
        return { ...preState, isBlockchainDataLoading: false };
      });
    }

    try {
      const isApprovedLS = await state.landTokenContract.methods
        .allowance(state.account, state.landStakeAddress)
        .call();
      if (isApprovedLS > 0) {
        setState((preState) => {
          return { ...preState, isApprovedLandStake: true };
        });
      } else {
        setState((preState) => {
          return { ...preState, isApprovedLandStake: false };
        });
      }
    } catch (e) {
      setState((preState) => {
        return { ...preState, isBlockchainDataLoading: false };
      });
    }

    try {
      const isApprovedLS2 = await state.landTokenContract.methods
        .allowance(state.account, "0x165448D15C5C4a3629dDf83AF6dfD0A10ecd435a")
        .call();

      if (Number(isApprovedLS2) > 0) {
        setState((preState) => {
          return { ...preState, isApprovedLandStake2: true };
        });
      } else {
        setState((preState) => {
          return { ...preState, isApprovedLandStake2: false };
        });
      }
    } catch (e) {
      setState((preState) => {
        return { ...preState, isBlockchainDataLoading: false };
      });
    }
  }

  async function functionName() {
    //loading data from user

    if (state.web3 !== "undefined") {
      //land token staking stuff
      try {
        //get users balance
        const depositBalance = await state.landStakeContract.methods
          .amountStaked(state.account)
          .call();
        setState((preState) => {
          return { ...preState, landStakeDepositBalance: depositBalance };
        });

        const depositBalance2 = await state.landStakeContract2.methods
          ._userInfo(state.account)
          .call()
          .then((data) => {
            return data[0];
          });

        setState((preState) => {
          return { ...preState, landStakeDepositBalance2: depositBalance2 };
        });

        //get total pool balance
        const total = await state.landStakeContract.methods
          .tokensStaked()
          .call();
        setState((preState) => {
          return { ...preState, landTokenStakeCurrentDepositTotal: total };
        });

        //get total pool balance
        const total2 = await state.landTokenContract.methods
          .balanceOf("0x165448D15C5C4a3629dDf83AF6dfD0A10ecd435a")
          .call();
        setState((preState) => {
          return { ...preState, landTokenStakeCurrentDepositTotal2: total2 };
        });

        //get reward pool
        const rewards = await state.landStakeContract.methods
          .computeReward(state.account)
          .call();
        setState((preState) => {
          return { ...preState, rewardPool: rewards };
        });

        const rewards2 = await state.landStakeContract2.methods
          .pendingReward(state.account)
          .call();
        setState((preState) => {
          return { ...preState, rewardPool2: rewards2 };
        });

        //bug fix
        if (state.landStakeDepositBalance > 0) {
          const poolPercentage =
            (state.landStakeDepositBalance /
              state.landTokenStakeCurrentDepositTotal) *
            100;
          setState((preState) => {
            return { ...preState, poolPercentage: poolPercentage };
          });
        } else {
          setState((preState) => {
            return { ...preState, poolPercentage: 0 };
          });
        }
      } catch (e) {}
      // property Vault stuff
      try {
        const vaultTotal = await state.propertyVaultContract.methods
          .totalVaultAmount()
          .call();
        setState((preState) => {
          return { ...preState, propertyVaultCurrentDepositTotal: vaultTotal };
        });

        const capacity = await state.propertyVaultContract.methods
          .totalVaultCapacity()
          .call();
        setState((preState) => {
          return { ...preState, currentVaultCapacity: capacity };
        });

        const yourDeposit = await state.propertyVaultContract.methods
          .balanceOf(state.account)
          .call();
        setState((preState) => {
          return { ...preState, propertyVaultDepositBalance: yourDeposit };
        });

        const harvestAmountBUSD = await state.propertyVaultContract.methods
          .getHarvestAmountBUSD()
          .call({ from: state.account });

        setState((preState) => {
          return { ...preState, harvestAmountBUSD: harvestAmountBUSD };
        });

        const harvestAmountLAND = await state.propertyVaultContract.methods
          .getHarvestAmountLand()
          .call({ from: state.account });
        setState((preState) => {
          return { ...preState, harvestAmountLAND: harvestAmountLAND };
        });
        setState((preState) => {
          return { ...preState, isLoadingPV: false };
        });
      } catch (e) {
        console.log(e + "contract data load error");
      }
      //claimable amount check

      try {
        const isParticipant = await state.claimableContract.methods
          .isParticipant(state.account)
          .call();
        if (isParticipant === false) {
        } else {
          const claimableAmt = await state.claimableContract.methods
            .getWithdrawAmount(state.account)
            .call();

          const claimedBlocks = await state.claimableContract.methods
            .blocksClaimed(state.account)
            .call();

          const blockAmount = Web3.utils.fromWei(
            await state.claimableContract.methods
              .blockAmount(state.account)
              .call(),
            "ether"
          );

          const blocksRemaining = 95 - claimedBlocks;

          const tokensRemaining = blocksRemaining * blockAmount;

          setState((preState) => {
            return {
              ...preState,
              claimableAmt: claimableAmt,
              unclaimedTokens: tokensRemaining,
            };
          });
        }
      } catch (e) {
        console.log(e + "claim error");
        setState((preState) => {
          return { ...preState, isBlockchainDataLoading: false };
        });
      }

      setState((preState) => {
        return { ...preState, isBlockchainDataLoading: false };
      });
    }
  }

  useEffect(() => {
    if (isMount) {
      //nothing
    } else {
      approveChecker();
      functionName();
    }
  }, [isConnected]);

  // SET TRANSACTION STATUS
  function startTransaction() {
    setState((pre) => {
      return {
        ...pre,
        transactionStatus: "Transaction Pending...",
        isAlert: true,
      };
    });
  }

  // SET TRANSACTION STATUS
  function endTransaction() {
    setState((pre) => {
      return {
        ...pre,
        transactionStatus: "",
        isAlert: false,
      };
    });
  }

  // GIVE TRANSACTION RESULT
  function transactionResult(status, IsSucceed) {
    setState((pre) => {
      return {
        ...pre,
        transactionStatus: status,
      };
    });
    setTimeout(() => {
      setState((pre) => {
        return {
          ...pre,
          isAlert: false,
          transactionStatus: "",
        };
      });
    }, 2000);
    return IsSucceed;
  }

  //================  AUTO COMPOUNDING LOGICS =====================//

  useEffect(async () => {
    // GET THE LIST OF WALLETS IN FIRESTORE

    if (state.account !== "Not Connected") {
      const noteSnapshot = await getDoc(doc(db, "wallet", state.account));
      if (noteSnapshot.exists()) {
        setIsWalletAvailable(true);
        setAutoCompounding(true);
        console.log("exists");
      } else {
        console.log("Not exists");
        setIsWalletAvailable(false);
      }
    }
  }, [state.account]);

  // ADD WALLET ADDRESS IN FIRESTORE FUNCTION
  const createWallet = async (data) => {
    await setDoc(doc(db, "wallet", data.walletAddress), data);
  };
  // ONBOARDING TOGGLER HANDLER
  const autoCompoundingHandler = async (e) => {
    setAutoCompounding(e.target.checked);
    let data = {
      connected: true,
      walletAddress: state.account,
    };
    if (isWalletAvailable) {
      const walletRef = doc(db, "wallet", state.account);
      await deleteDoc(walletRef);
      setIsWalletAvailable(false);
    } else {
      createWallet(data);
      setIsWalletAvailable(true);
    }
  };

  const notifySuccess = (message) => setAlertModal({ show: true, type: 'success', message })
  const notifyError = (message) => setAlertModal({ show: true, type: 'error', message })

  const value = {
    state,
    //loadBlockchainData,
    setState,

    startTransaction,
    endTransaction,
    transactionResult,
    functionName,

    autoCompounding,
    isWalletAvailable,
    autoCompoundingHandler,

    alertModal,
    setAlertModal,
    notifySuccess,
    notifyError
  };

  return (
    <LandshareFunctionsContext.Provider value={value}>
      {" "}
      {children}{" "}
    </LandshareFunctionsContext.Provider>
  );
}
