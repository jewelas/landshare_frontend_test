import { useEffect, useState } from "react";
import Web3 from "web3";
import LandLPFarm from "./abis/LandLPFarm.json";
import BEP20 from "./abis/BEP20.json";
import { useLandshareFunctions } from "./LandshareFunctionsProvider";
import ListItem from "../components/main/ListItem";
import abbreviateNumber from "../components/main/numberAbbreviator";
import LandTokenStackingContent from "../components/main/LandTokenStackingContent";
import LPInfoModal from "../components/main/LPInfoModal";
import ReactLoading from "react-loading";
import pancakeswap from "../assets/img/icons/pancakeswap-cake-logo.svg";
import { GuidebtnIcon } from "../components/common/Icons";

export default function LPVault({
  inputValue,
  setInputValue,
  LPTokenContract,
}) {
  const { state, startTransaction, endTransaction, transactionResult } =
    useLandshareFunctions();
  const [depositBalanceLP, setDepositBalanceLP] = useState(0);
  const [isApprovedLP, setIsApproved] = useState(false);
  const [totalLP, setTotal] = useState(0);
  const [rewardLP, setReward] = useState(0);
  const [apr, setAPR] = useState(0);
  const [TVL, setTVL] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const landStakeContractLP = new state.web3.eth.Contract(
    LandLPFarm.abi,
    "0xDa4ec02C0e8089c9E1A341BB09bafc77F51622C8"
  );

  const WBNBContract = new state.web3.eth.Contract(
    BEP20.abi,
    "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  );

  useEffect(() => {
    updateLPFarm();
  }, []);

  async function withdrawLP(amount) {
    if (state.isConnected == true) {
      if (Number(depositBalanceLP) === 0) {
        return;
      }
      if (Number(depositBalanceLP) < amount) {
        window.alert("Insufficient deposit amount");
        return;
      }

      if (Number(depositBalanceLP) === 0) {
        window.alert("No deposit found");
        return;
      }

      startTransaction();
      try {
        await landStakeContractLP.methods
          .withdraw(amount)
          .send({ from: state.account })
          .on("receipt", async function () {
            transactionResult("Transaction Completed.", true);
            updateLPFarm();
          });
      } catch (e) {
        transactionResult("Transaction Failed.", false);
        console.log("Error, withdraw: ", e);
      }
      updateLPFarm();
    }
  }

  async function depositLP(amount) {
    startTransaction();

    const balance = await LPTokenContract.methods
      .balanceOf(state.account)
      .call();
    if (state.isConnected == true) {
      if (Number(amount) > Number(balance)) {
        endTransaction();
        window.alert("Insufficient Balance");

        return;
      }

      try {
        await landStakeContractLP.methods
          .deposit(amount.toString())
          .send({ from: state.account })
          .on("receipt", async function () {
            transactionResult("Transaction Completed.");
            updateLPFarm();
          });
      } catch (e) {
        transactionResult("Transaction Failed.");
        console.log(e);
      }
    } else {
      endTransaction();
      window.alert("Please connect your wallet to BSC");
    }
  }

  async function approveLP() {
    var amount = 100000000000;
    startTransaction();
    if (state.isConnected === true) {
      try {
        await LPTokenContract.methods
          .approve(
            "0xDa4ec02C0e8089c9E1A341BB09bafc77F51622C8",
            Web3.utils.toWei(amount.toString(), "ether")
          )
          .send({ from: state.account })
          .on("receipt", async function () {
            transactionResult("Transaction Completed.");
            updateLPFarm();
          });
      } catch (e) {
        endTransaction();
        console.log(e);
      }
    } else {
      endTransaction();
      window.alert("Please connect your wallet to BSC");
    }
  }

  async function updateLPFarm() {
    setIsLoading(true);

    try {
      const isApproved = await LPTokenContract.methods
        .allowance(state.account, "0xDa4ec02C0e8089c9E1A341BB09bafc77F51622C8")
        .call();

      if (isApproved > 0) {
        setIsApproved(true);
      } else {
        setIsApproved(false);
      }
    } catch (e) {
      console.log(e);
    }

    const totalLPSupply = await LPTokenContract.methods.totalSupply().call();
    const totalBNBinLPContract = await WBNBContract.methods
      .balanceOf("0x468CDe4aD48cbAfA3cDfb68Fd9f2c114DDfE6c08")
      .call();
    const totalBNBValueinLPContract =
      Number(Web3.utils.fromWei(totalBNBinLPContract, "ether")) *
      Number(state.bnbPrice);
    const totalLANDinLPContract = await state.landTokenContract.methods
      .balanceOf("0x468CDe4aD48cbAfA3cDfb68Fd9f2c114DDfE6c08")
      .call();
    const totalLANDValueinLPContract =
      Number(Web3.utils.fromWei(totalLANDinLPContract, "ether")) *
      Number(state.price);
    const totalUSDValue =
      Number(totalLANDValueinLPContract) + Number(totalBNBValueinLPContract);

    const totalLPInVault = await LPTokenContract.methods
      .balanceOf("0xDa4ec02C0e8089c9E1A341BB09bafc77F51622C8")
      .call();

    const percentageOfLPInVault = totalLPInVault / totalLPSupply;

    const USDValueinVault = percentageOfLPInVault * totalUSDValue;

    await setTVL(USDValueinVault);

    const totalMoneyAnnual = 365000 * Number(state.price);

    const farmAPR = (totalMoneyAnnual / USDValueinVault) * 100;

    setAPR(farmAPR);

    const depositBalance = await landStakeContractLP.methods
      ._userInfo(state.account)
      .call()
      .then((data) => {
        return data[0];
      });

    setDepositBalanceLP(depositBalance);

    const rewardsLP = await landStakeContractLP.methods
      .pendingReward(state.account)
      .call();

    setReward(rewardsLP);

    setIsLoading(false);
  }

  const depositHandler = () => {
    let amountLS = inputValue;
    if (!amountLS) {
      window.alert("Please enter an amount");
      return;
    }
    // SETTING INPUT VALUE EMPTY
    setInputValue("");
    amountLS = Web3.utils.toWei(amountLS, "ether").toString(); //convert to wei

    if (state.whichVault === "LP") {
      depositLP(amountLS);
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

    if (state.whichVault === "LP") {
      withdrawLP(amountLS);
    }
  };

  const data = [
    {
      name: "deposit",
      keys: [
        {
          name: "APR",

          value: abbreviateNumber(apr.toString().substr(0, 6)) + "%",
        },

        {
          name: <span className="font-medium">TVL</span>,
          value: "$" + abbreviateNumber(TVL.toString().substr(0, 8)),
        },
      ],
      handler: depositHandler,
    },
    {
      name: "withdraw",
      keys: [
        {
          name: "Deposited",
          value: Web3.utils.fromWei(depositBalanceLP.toString(), "ether"),
        },

        {
          name: <span className="font-medium">Rewards</span>,
          value: Web3.utils.fromWei(rewardLP.toString(), "ether").substr(0, 5),
        },
      ],
      handler: withdrawHandler,
    },
  ];

  return isLoading ? (
    <div className="col-12 d-flex justify-content-center my-auto">
      <ReactLoading type="cylon" color="#0ed145" />
    </div>
  ) : (
    <>
      <LPInfoModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />

      {data.map((obj, i) => (
        <ListItem
          key={i}
          isPropertyVault={false}
          data={obj}
          last={data.length === i + 1}
          isApprovedLP={isApprovedLP}
        />
      ))}
      <div className="my-3 d-flex flex-row justify-content-around">
        <button
          className="guideBtn  mx-0 px-0 "
          onClick={() => setIsOpen(true)}
        >
          <div>
            <GuidebtnIcon />
          </div>

          <div>Vault Guide </div>
        </button>

        <button
          className=" PCSBtn mx-0 px-0"
          onClick={(e) => {
            window.open(
              "https://pancakeswap.finance/add/0x9D986A3f147212327Dd658F712d5264a73a1fdB0/BNB"
            );
          }}
        >
          <div>
            <img src={pancakeswap} className="PCSBunny" />
          </div>
          <div>Get LAND-BNB LP</div>
        </button>
      </div>

      {isApprovedLP ? (
        <>
          <div className="row  align-items-center mt-2 justify-content-between mx-1">
            <button
              className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
              onClick={() => withdrawLP(depositBalanceLP)}
              //disabled={isAlert ? true : false}
            >
              Withdraw all
            </button>

            <button
              className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center mt-2 mt-sm-0"
              onClick={() => withdrawLP(0)}
              // disabled={isAlert ? true : false}
            >
              Harvest
            </button>
          </div>
        </>
      ) : (
        <div className="row  align-items-center justify-content-center">
          <button
            className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center mt-2 mt-sm-0"
            onClick={() => approveLP().then(() => window.location.reload)}
            disabled={state.isAlert ? true : false}
          >
            Approve
          </button>
        </div>
      )}
    </>
  );
}
