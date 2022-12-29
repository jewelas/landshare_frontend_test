import { useState } from "react";
import ReactLoading from "react-loading";
import Web3 from "web3";
import ListItem from "./ListItem";
import CurrentAPR from "./CurrentAPR";
import WithdrawInfoModal from "./WithdrawInfoModal";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import abbreviateNumber from "./numberAbbreviator.js";
import useHarvestPV from "../../hooks/useHarvestPV";
import useWithDrawPV from "../../hooks/useWithDrawPV";
import busd from "../../assets/img/icons/busd.png";
import useApprovePV from "../../hooks/useApprovePV";
import { VoultDetailsIcon } from "../common/Icons";
export default function PropertyVaultContent() {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [isPropertyVault, setPropertyVault] = useState(true);
  const {
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
    state: { isAlert },
    state,
  } = useLandshareFunctions();

  const { withdrawPV } = useWithDrawPV({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });
  const { harvestPV } = useHarvestPV({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });

  const { approvePV } = useApprovePV({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });

  const withdrawHandler = () => {
    let amount = inputValue;
    if (!amount) {
      window.alert("Please enter an amount");
      return;
    }
    // SETTING INPUT VALUE EMPTY
    setInputValue("");
    amount = Web3.utils.toWei(amount, "ether").toString(); //convert to wei
    withdrawPV(amount);
  };

  const harvestAmountBUSD = Web3.utils.fromWei(
    state.harvestAmountBUSD.toString(),
    "ether"
  );
  const harvestAmountLAND = Web3.utils.fromWei(
    state.harvestAmountLAND.toString(),
    "ether"
  );

  const data = [
    {
      name: "withdraw",
      keys: [
        {
          name: "Deposited",
          value: abbreviateNumber(
            Web3.utils.fromWei(
              state.propertyVaultDepositBalance.toString(),
              "ether"
            )
          ),
        },
      ],
      handler: withdrawHandler,
    },
    {
      name: "harvest",
      keys: [
        {
          name: "LAND Yield",
          value: harvestAmountLAND.toString().substr(0, 10),
        },
        {
          name: "BUSD Yield",
          value: harvestAmountBUSD.toString().substr(0, 10),
        },
      ],
      handler: (e) => harvestPV(e),
    },
  ];

  // MAX BTN CODE HERE

  const maxBtnHandler = async () => {
    let landBalance = await state.landTokenContract.methods
      .balanceOf(state.account)
      .call();
    let maxDepoColateral =
      Web3.utils.fromWei(landBalance.toString(), "ether") * 8;
    let balance = await state.busd.methods.balanceOf(state.account).call();

    let value =
      Number(Web3.utils.fromWei(balance, "ether")) +
      Number(Web3.utils.fromWei(state.propertyVaultDepositBalance, "ether"));

    let x;
    if (maxDepoColateral > value) {
      x = balance;
      x = Web3.utils.fromWei(x, "ether");
    } else {
      x =
        maxDepoColateral -
        Web3.utils.fromWei(state.propertyVaultDepositBalance, "ether");
      if (x < 0) {
        x = 0;
      }
    }

    x = x.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];
    setInputValue(x);
  };

  function returnLoadedData() {
    return (
      <>
        <CurrentAPR inputValue={inputValue} inputValueHandler={setInputValue} />
        {data.map((obj, i) => (
          <ListItem
            key={i}
            isPropertyVault={isPropertyVault}
            data={obj}
            last={obj.name}
          />
        ))}

        {state.isApprovedPropertyVault ? (
          <div className="row mt-2 mb-2 justify-content-around flex-grow-1 mt-3">
            <div className="col-auto">
              <button
                className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
                style={{ width: "120px" }}
                onClick={() => withdrawPV(state.propertyVaultDepositBalance)}
                disabled={isAlert ? true : false}
              >
                Withdraw all
              </button>
            </div>
          </div>
        ) : (
          <div className="row mt-2 mb-2 justify-content-around flex-grow-1 mt-3">
            <div className="col-auto">
              <button
                className="btn withdraw-all-btn align-items-center d-flex flex-column justify-content-center"
                style={{ width: "120px" }}
                onClick={() => approvePV()}
                disabled={isAlert ? true : false}
              >
                Approve
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  function returnSpinner() {
    return (
      <div className="col-12 d-flex justify-content-center my-auto">
        <ReactLoading type="cylon" color="#0ed145" />
      </div>
    );
  }

  return (
    <>
      <WithdrawInfoModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      <h5 className="py-3 text-center fw-700 fs-16 fs-xxxl-20">
        Landshare BUSD Vault
      </h5>
      <div className="d-flex flex-column h-sm-195 h-207 w-500">
        <div className="text-center ">
          {<img src={busd} className="busd-img" alt="" />}
        </div>
        <p
          onClick={() => setIsOpen(true)}
          className="pt-3 pointer max-w-170 max-w-xxxl-200 mx-auto mb-0"
        >
          <span className="text-black fs-14 fs-xxxl-16 fw-500 ">
            Vault Details
          </span>
          <span className="ms-2">
            <VoultDetailsIcon />
            {/* <img width="22" src={questionMark} alt="help" /> */}
          </span>
        </p>
      </div>
      <div className="d-flex max-input outline-none input-foucs-visible-outline    align-items-center">
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
          className="outline-none text-dark rounded-10 w-100 bg-transparent border-0 h-43 px-3"
        />
        <span
          onClick={maxBtnHandler}
          className="px-2 fw-500 fs-13_47 pointer color-6FCF97"
        >
          Max
        </span>
      </div>

      {state.isLoadingPV ? returnSpinner() : returnLoadedData()}

      <span className="color-6FCF97 font-medium" style={{ fontSize: "10px" }}>
        Note: The Property Vault has been renamed to the Landshare BUSD Vault.
        Vault contracts, rewards, and functionality remain unchanged.
      </span>
    </>
  );
}
