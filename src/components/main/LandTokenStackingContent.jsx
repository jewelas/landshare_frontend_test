import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import LandsharLogo from "../../assets/img/icons/landshare-logo.svg";
import Web3 from "web3";
import LandshareFunctionsProvider, { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import LandInfoModal from "./LandInfoModal";
import abbreviateNumber from "./numberAbbreviator.js";
import useWithDrawLS from "../../hooks/useWithDrawLS";
import useWithDrawLS2 from "../../hooks/useWithDrawLS2";
import useWithRewardLs from "../../hooks/useWithRewardLs";
import useWithRewardLs2 from "../../hooks/useWithRewardLs2";
import useDepositLS from "../../hooks/useDepositLS";
import useDepositLS2 from "../../hooks/useDepositLS2";
import useCompoundLS from "../../hooks/useCompoundLS";
import VaultRadio from "./radioButtons";
import useApproveLS2 from "../../hooks/useApproveLS2";
import useApproveLS from "../../hooks/useApproveLS";
import aprInfo from "../../assets/img/icons/i-icon-apr.png";
import LPVault from "../../contexts/LPVault";
import BEP20 from "../../contexts/abis/BEP20.json"
import Widget from "./Widget.js";


export default function LandTokenStackingContent() {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isPropertyVault, setPropertyVault] = useState(false);

 

  const {
    state: {
      landStakeDepositBalance,
      landStakeDepositBalance2,
      rewardPool,
      rewardPool2,
      landTokenStakeCurrentDepositTotal,
      landTokenStakeCurrentDepositTotal2,
      landTokenContract,
      landTokenContract2,
      isApprovedLandStake2,
      whichVault,
      isApprovedLandStake,

      account,
      isAlert,
    },
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
    state,
  } = useLandshareFunctions();




    
   



    // function load_js() {
    //   var head = document.getElementsByTagName("head")[0];
    //   var script = document.createElement("script");
    //   script.src = "https://www.livecoinwatch.com/static/lcw-widget.js";
    //   head.appendChild(script);
    // }
    // load_js();
 
   
  


  
  
 
  const { depositLS, depositLS2 } = useDepositLS({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });

  // const { } = useDepositLS2({
  //   state,
  //   startTransaction,
  //   endTransaction,
  //   transactionResult,
  //   functionName,
  // });
  // WITH DRAW REWARD HOOKS
  const { withdrawRewardLS } = useWithRewardLs({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });

  
  const { withdrawRewardLS2 } = useWithRewardLs2({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });


  // WITH DRAW  HOOKS
  const { withdrawLS } = useWithDrawLS({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });

  const { withdrawLS2 } = useWithDrawLS2({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });

  const { approveLS } = useApproveLS({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  })

  const { approveLS2 } = useApproveLS2({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  })

  const { compoundLS } = useCompoundLS({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  })

  const tokenLPAddress = "0x468CDe4aD48cbAfA3cDfb68Fd9f2c114DDfE6c08"
  const LPTokenContract = new state.web3.eth.Contract(
    BEP20.abi,
    tokenLPAddress
);
 
  const depositHandler = () => {
    let amountLS = inputValue;
    if (!amountLS) {
      window.alert("Please enter an amount");
      return;
    }
    // SETTING INPUT VALUE EMPTY
    setInputValue("");
    amountLS = Web3.utils.toWei(amountLS, "ether").toString(); //convert to wei

    if (state.whichVault==='v1') {
      depositLS(amountLS)
    } 
    if (state.whichVault==='v2') {
      depositLS2(amountLS)
    } 
  
  };

  const withdrawHandler = () => {
    let amountLS = inputValue;
    if (!amountLS) {
      window.alert("Please enter an amount");
      return;
    }
    // SETTING INPUT VALUE EMPTY
    setInputValue("");

    amountLS = Web3.utils.toWei(amountLS, "ether").toString(); //convert to wei

    state.whichVault === "v1" ? withdrawLS(amountLS) : withdrawLS2(amountLS)
  };
  const apr = 10513333.333333333333333 * 52083333333333333 / landTokenStakeCurrentDepositTotal2 * 100 // blocks per year * wei per block / total wei deposited
  const apy = (((1 + ((apr/100)/365))**365)-1) * 100




 
  const data = [
    {
      name: "deposit",
      keys: [
        { name: whichVault === "v1" ? "APR" : <span style={{cursor: 'pointer'}} onClick={() => setIsOpen(true)}>APY<span className="ms-1">
        <img src={aprInfo} alt="aprInfo" />
      </span></span>, 
        
        value: state.whichVault=== "v1" ? " N/A" : 
        
       
     abbreviateNumber(apy.toString().substr(0,6)) + "%"
      },

        {
          name: <span className="font-medium">TVL</span>,
          value: state.whichVault === "v1" ? abbreviateNumber(
            Web3.utils.fromWei(
              landTokenStakeCurrentDepositTotal.toString(),
              "ether"
            )
          ) : abbreviateNumber(
            Web3.utils.fromWei(
              landTokenStakeCurrentDepositTotal2.toString(),
              "ether"
            ).substr(0,8)
          ),
        },
      ],
      handler: depositHandler,
    },
    {
      name: "withdraw",
      keys: [
        {
          name: "Deposited",
          value: state.whichVault === "v1" ? Web3.utils
            .fromWei(landStakeDepositBalance.toString(), "ether")
            .substr(0, 10) : Web3.utils
              .fromWei(landStakeDepositBalance2.toString(), "ether")
              .substr(0, 10),
        },

        {
          name: <span className="font-medium">Rewards</span>,
          value: state.whichVault === "v1" ? Web3.utils
            .fromWei(rewardPool.toString(), "ether")
            .substr(0, 10) : Web3.utils
              .fromWei(rewardPool2.toString(), "ether")
              .substr(0, 10),
        },
      ],
      handler: withdrawHandler,
    },
  ];


  

  // MAX BTN CODE HERE
  const maxBtnHandler = async () => {
    let value =  await landTokenContract.methods.balanceOf(account).call();
    if (whichVault === "LP") {
      value = await LPTokenContract.methods.balanceOf(account).call()
    }
    value = Web3.utils.fromWei(value.toString(), "ether");
    value = value.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];
    setInputValue(value);
  };

  const approveBtnHandler = async () => {
    await approveLS2().then( (e) => {

      window.location.reload()

    } 
    )
  }

  return (
  
    <>
    
      <LandInfoModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
  
    <div className="py-3 text-center fw-700 fs-16 fs-xxxl-20">
       {whichVault==="LP" ? "LAND-BNB LP Staking" : "LAND Token Staking"  }  
      </div> 
      <div className="d-flex flex-column h-207 justify-content-around">
        <div className="text-center">
          <img src={LandsharLogo} className="w-123" alt="Logo" />
        </div>
        <div className="justify-content-between"> <VaultRadio />
        </div>

      </div>
      <div className="d-flex  max-input  rounded-10  align-items-center">
        <input
          type="text"
          value={inputValue}
          onChange={(e) =>
            setInputValue(
              e.target.value
                .replace(/[^.\d]/g, "")
                .replace(/^(\d*\.?)|(\d*)\.?/g, "$1$2")
                .replace(/[^\d.]/g, "")
                .replace(/(\..*)\./g, "$1")
                .replace(/^(\d+\.\d{4})\d+$/g, "$1")
            )
          }
          className="text-dark rounded-10  outline-none w-100 bg-transparent border-0 h-43 px-3"
        />
        <span
          className="px-2 fw-500 fs-13_47 pointer color-6FCF97"
          onClick={maxBtnHandler}
        >
          Max
        </span>
      </div>



  { whichVault === "LP" ? "" :  data.map((obj, i) => (
      <ListItem
        key={i}
        isPropertyVault={isPropertyVault}
        data={obj}
        last={data.length === i + 1}
      />
    ))
  }
         


  {whichVault === "LP" ? Widget(false):Widget(true)}


       {whichVault === "v1" ? (

        isApprovedLandStake ? (
          <div className="row mt-2   align-items-center justify-content-around">
            <button
              className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
              onClick={() => withdrawLS(landStakeDepositBalance)}
              disabled={isAlert ? true : false}
            >
              Withdraw all
            </button>
            <button
              className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center mt-2 mt-sm-0"
              onClick={() => withdrawRewardLS(rewardPool)}
              disabled={isAlert ? true : false}
            >
              Harvest
            </button>
          </div>
        ) :
          <div className="row mt-2 align-items-center justify-content-around">
            <button
              className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
              onClick={() => approveLS()}
              disabled={isAlert ? true : false}
            >
              Approve
            </button>

          </div>
      ) :
          whichVault === "v2" ? (
        isApprovedLandStake2 ? (
          <div className="row mt-2   align-items-center justify-content-around">
            <button
              className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
              onClick={() => withdrawLS2(landStakeDepositBalance2)}
              disabled={isAlert ? true : false}
            >
              Withdraw all
            </button>
            <button
              className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center mt-2 mt-sm-0"
              onClick={() => withdrawRewardLS2(rewardPool)}
              disabled={isAlert ? true : false}
            >
              Harvest
            </button>
            <button
              className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center mt-2 mt-sm-0"
              onClick={() => compoundLS()}
              disabled={isAlert ? true : false}
            >
              Compound
            </button>
          </div>
        ) : 
          <div className="row mt-2   align-items-center justify-content-around">
            <button
              className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
              onClick={() => approveBtnHandler()}
              disabled={isAlert ? true : false}
            >
              Approve
            </button>
          
            
          </div>
          ) : <LPVault inputValue={inputValue} setInputValue={setInputValue} LPTokenContract={LPTokenContract}/>
}



      



      {/* <div className="row mt-4 justify-content-around flex-column flex-grow-1 mt-auto">
        <div className="col-auto d-flex justify-content-center">
          <button
            className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
            onClick={() => withdrawLS(landStakeDepositBalance)}
            disabled={isAlert ? true : false}
          >
            Withdraw all
          </button>
        </div>
        <div className="col-auto d-flex justify-content-center mt-3 mt-md-0">
          <button
            className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
            onClick={() => withdrawRewardLS(rewardPool)}
            disabled={isAlert ? true : false}
          >
            Withdraw Reward
          </button>
        </div>
      </div> */}
    </>
  );
}