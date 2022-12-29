import React from "react";
import Modal from "react-modal";
import MetaMask from "../assets/img/icons/metamask.svg";
import TrustWallet from "../assets/img/icons/trust-wallet.svg";
import WalletConnect from "../assets/img/icons/wallet-connect.svg";
import Disconnect from "../assets/img/icons/disconnect.svg";
import C98 from "../assets/img/icons/10903.svg"
import ONTO from "../assets/img/icons/ONTO LOGO_40x40-01.svg"
import { useLandshareFunctions } from "../contexts/LandshareFunctionsProvider";
import useWalletConnector from "../hooks/useWalletConnector";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "350px"
  },
};

export default function HeaderModal({ isOpen, closeModal }) {
  const { state, setState} = useLandshareFunctions();
  const { walletConnector, metaMask, ONTOWallet, disconnectWallet } = useWalletConnector({
    state,
    setState,
  });

  const address = state.account;

  if (state.account !== undefined) {
    var addy =
      state.account.toString().substr(0, 6) +
      "..." +
      state.account.toString().substr(38, 40);

    function addressTrunc() {
      if (address != "Not Connected") {
        return;
      } else {
        addy = state.account;
      }
    }
    addressTrunc();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <div>
        <h2 className="fs-27 p-4 text-center fw-600 text-39A849 text-overflow-ellipsis">
          {addy}
        </h2>
        <div className="container my-15px w-90 mx-auto">
          <div className="row  flex-md-row flex-column  align-items-center justify-content-around">

            <div className="col-12 col-md-6 col-xl  min-w-200">
              <button
                onClick={() => {
                  metaMask()
                  closeModal()
                }}
                disabled={state.isAlert ? true : false}
                className="d-flex hover-green w-100 mb-13 bg-white border-0 focus py-30 box-shadow-modal br-6 flex-column align-items-center justify-content-center"
              >
                <img src={MetaMask} className="h-45" alt="" />

                <span className="mt-35 fs-lg-24 fs-16 fw-500 text-center">
                  Metamask <br /> Wallet
                </span>
              </button>
            </div>

            <div className="col-12 col-md-6 col-xl  min-w-200">
              <button
                onClick={() => {
                  metaMask()
                  closeModal()
                }}
                disabled={state.isAlert ? true : false}
                className="d-flex hover-green w-100 mb-13 bg-white border-0 focus py-30 box-shadow-modal br-6 flex-column align-items-center justify-content-center"
              >
                <img src={TrustWallet} className="h-45" alt="" />

                <span className="mt-35 fs-lg-24 fs-16 fw-500 text-center">
                  Trust <br /> Wallet
                </span>
              </button>
            </div>

            <div className="col-12 col-md-6 col-xl  min-w-200">
              <button
                onClick={() => {
                  walletConnector()
                  closeModal()
                }}
                disabled={state.isAlert ? true : false}
                className="d-flex hover-green w-100 mb-13 bg-white border-0 focus py-30 box-shadow-modal br-6 flex-column align-items-center justify-content-center"
              >
                <img src={WalletConnect} className="h-45" alt="" />
                <span className="mt-35 fs-lg-24 fs-16 fw-500 text-center">
                  Wallet <br /> Connect
                </span>
              </button>
            </div>

            <div className="col-12 col-md-6 col-xl  min-w-200">
              <button
                onClick={() => {
                  metaMask()
                  closeModal()
                }}
                disabled={state.isAlert ? true : false}
                className="d-flex hover-green w-100 mb-13 bg-white border-0 focus py-30 box-shadow-modal br-6 flex-column align-items-center justify-content-center"
              >
                <img src={C98} className="h-45" alt="" />

                <span className="mt-35 fs-lg-24 fs-16 fw-500 text-center">
                  C98 <br /> Wallet
                </span>
              </button>
            </div>
            <div className="col-12 col-md-6 col-xl  min-w-200">
              <button
                onClick={() => {
                  ONTOWallet()
                  closeModal()
                }}
                disabled={state.isAlert ? true : false}
                className="d-flex hover-green w-100 mb-13 bg-white border-0 focus py-30 box-shadow-modal br-6 flex-column align-items-center justify-content-center"
              >
                <img src={ONTO} className="h-45" alt="" />

                <span className="mt-35 fs-lg-24 fs-16 fw-500 text-center">
                  ONTO <br /> Wallet
                </span>
              </button>
            </div>
            
            <div className="col-12 col-md-6 col-xl min-w-200">
              <button
                onClick={() => {
                  disconnectWallet()
                  closeModal()
                }}
                disabled={state.isAlert ? true : false}
                className="d-flex hover-green w-100 mb-13 bg-white border-0 focus py-30 box-shadow-modal br-6 flex-column align-items-center justify-content-center"
              >
                <img src={Disconnect} className="h-45" alt="" />

                <span className="mt-35 fs-lg-24 fs-16 fw-500 text-center">
                  Disconnect <br /> Wallet
                </span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </Modal>
  );
}
