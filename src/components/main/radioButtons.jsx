import React from "react";
import { useLandshareFunctions } from "../../contexts/LandshareFunctionsProvider";
import  LPVault  from "../../contexts/LPVault.js";

function VaultRadio() {
  const { state, setState } = useLandshareFunctions();

  function handleRadioButton(type) {
    setState((preState) => {
      return { ...preState, whichVault: type };
    });
  }

  const updateLPFarm = LPVault

  return (
    <div className="d-flex flex-row justify-content-around mx-0 ">
      <div
        className={`${
          state.whichVault === "v1" ? "after-underline-green-active " : ""
        } position-relative underline-green overflow-hidden col-4`}
      >
        <button
          className={`${
            state.whichVault === "v1" ? "vault-active-underline" : ""
          } vault-v-btn`}
          onClick={() => handleRadioButton("v1")}
        >
          Staking V1
        </button>
        {/* <input
          type="radio"
          checked={state.whichVault === "v1"}
          onChange={() => handleRadioButton("v1")}
        />
        V1 */}
      </div>
      <div
        className={`${
          state.whichVault === "v2" ? "after-underline-green-active " : ""
        } position-relative underline-green  overflow-hidden col-4`}
      >
        {/* <input
          type="radio"
          checked={state.whichVault === "v2"}
          onChange={() => handleRadioButton("v2")}
        />
        V2 */}
        <button
          className={`${
            state.whichVault === "v2" ? "vault-active-underline" : ""
          } vault-v-btn`}
          onClick={() => handleRadioButton("v2")}
        >
       Staking V2
        </button>
      </div>
      <div
        className={`${
          state.whichVault === "LP" ? "after-underline-green-active " : ""
        } position-relative underline-green  overflow-hidden col-4`}
      >
        {/* <input
          type="radio"
          checked={state.whichVault === "v2"}
          onChange={() => handleRadioButton("v2")}
        />
        V2 */}
        <button
          className={`${
            state.whichVault === "LP" ? "vault-active-underline" : ""
          } vault-v-btn`}
          onClick={() => <LPVault /> + handleRadioButton("LP")}
        >
         <span>Liquidity Farm</span>
        </button>
      </div>
    </div>
  );
}

export default VaultRadio;
