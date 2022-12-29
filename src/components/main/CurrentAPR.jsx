import { useEffect, useState } from "react";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import Web3 from "web3";
import aprInfo from "../../assets/img/icons/i-icon-apr.png";
import CurrenAprModal from "../CurrenAprModal";
import abbreviateNumber from "./numberAbbreviator.js";
import useDepositPV from "../../hooks/useDepositPV";

export default function CurrentAPR({ inputValue, inputValueHandler }) {
  const [isActive, setIsActive] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  } = useLandshareFunctions();
  const { depositPV } = useDepositPV({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  });
  const prize = state.price.toString();
  const depositHandler = () => {
    let amount = inputValue;
    if (!amount) {
      window.alert("Please enter an amount");
      return;
    }
    // SETTING INPUT VALUE EMPTY
    inputValueHandler("");
    amount = Web3.utils.toWei(amount, "ether").toString(); //convert to wei
    depositPV(amount);
  };
  const vaultCapacity = Web3.utils.fromWei(
    state.currentVaultCapacity.toString(),
    "ether"
  );
  const currentDepo = Web3.utils.fromWei(
    state.propertyVaultCurrentDepositTotal.toString(),
    "ether"
  );

  const price = prize.substr(0, 4);
  const busd = 13;
  const landAPR = price * 12;

  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [modalIsOpen]);
  return (
    <div className="d-flex flex-column  border-bottom  justify-content-center py-4">
      <div className="d-flex  flex-row flex-row  flex-lg-row justify-content-between justify-content-md-center justify-content-lg-center justify-content-xl-between  align-items-center">
        <div>
          <button
            className="btn-withdraw text-capitalize "
            onClick={(e) => depositHandler(e)}
            disabled={state.isAlert ? true : false || state.isApprovedPropertyVault === false}
          >
            Deposit
          </button>
     
        </div>
        <div className="w-100 d-sm-none" style={{"maxWidth": "30px"}}></div>
        <div style={{ height : "auto"}} className="d-flex   align-items-center justify-content-around w-100  w-xl-60 text-start text-lg-center text-xl-start " >
          <div  className="text-4d4d4d font-medium fs-16 d-flex align-items-center flex-column  me-sm-0">
            <span className="white-space-nowrap  text-4d4d4d fs-12 fs-xxxl-14 font-medium">Capacity</span>
            <span className="fs-12 fs-xxxl-14 text-black fw-500">
              {abbreviateNumber(currentDepo) +
                "/" +
                abbreviateNumber(vaultCapacity)}
            </span>
          </div>
          <div className="text-4d4d4d font-medium fs-16 d-flex align-items-center flex-column  me-sm-0" >
            <button style={{ height : "18px"}}
              className={`btn d-flex flex-column align-items-center currentAprBtn py-0 px-0  ${
                isActive ? "active" : ""
              }`}
          
              onClick={openModal}
            >
       
                <span className="white-space-nowrap  text-4d4d4d fs-12 fs-xxxl-14 font-medium ">
                  APR
             
              
                 <span> <img src={aprInfo} alt="aprInfo" /> </span>
                
              </span>
              </button>
              <span className="d-flex fs-12 fs-xxxl-14 text-black fw-500 mt-0">
                {(busd + landAPR).toString().substr(0, 5)}%
              </span>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-caret-down text-656565"
                viewBox="0 0 16 16"
              >
                <path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z" />
              </svg> */}
           
          </div>
        </div>
      </div>

      <CurrenAprModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        busd={busd}
        landAPR={landAPR}
        price={price}
      />
      {/* <div
        className={`d-flex mt-2 mr-lg-2 mr-xl-3 currentApr flex-column ${
          isActive ? "active" : ""
        }`}
      >
        <p className="d-flex mb-2 text-white w-100 justify-content-center w-xl-50 justify-content-lg-between">
          <span className="fw-bold">Rental value</span>
          <span>
            &nbsp;:&nbsp;
            <span>{rent}%</span>
          </span>
        </p>
        <p className="d-flex mb-2 text-white w-100 justify-content-center  w-xl-50 justify-content-lg-between">
          <span className="fw-bold">Est. Apprecation</span>
          <span>
            &nbsp;:&nbsp;
            <span>{apr}%</span>
          </span>
        </p>
        <p className="d-flex mb-2 text-white w-100 justify-content-center w-xl-50 justify-content-lg-between">
          <span className="fw-bold">Yield Farming Bonus</span>
          <span>
            {" "}
            &nbsp;:&nbsp;
            <span>{farm}%</span>
          </span>
        </p>
        <p className="d-flex mb-2 text-white w-100 justify-content-center w-xl-50 justify-content-lg-between">
          <span className="fw-bold">LAND Token @ ${price}</span>
          <span>
            &nbsp;:&nbsp;
            <span>{landAPR}%</span>
          </span>
        </p>
        <p className="d-flex mb-2 text-white w-100 justify-content-center w-xl-50 justify-content-lg-between">
          <span className="fw-bold">Total APR</span>
          <span>
            &nbsp;:&nbsp;
            <span>{rent + apr + farm + landAPR}%</span>
          </span>
        </p>
      </div> */}
    </div>
  );
}