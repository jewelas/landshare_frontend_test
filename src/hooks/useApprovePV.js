import Web3 from "web3";

export default function useApprovePV({
    state,
    startTransaction,
    endTransaction,
    transactionResult,
    functionName,
  }) {
    async function approvePV() {
      var amount = 1000000000;
      startTransaction();
      if (state.isConnected == true) {
  
        try {
            await state.busd.methods
              .approve(
                "0x0dF6378Df2a43f8490C85dc69C2786E06Ed6bE76",
                Web3.utils.toWei(amount.toString(), "ether")
              )
              .send({ from: state.account }).on("receipt", async function () {
                transactionResult("Transaction Completed.");
                functionName();
              });
          } catch (e) {
         
            endTransaction();
            console.log(e)
          }
      } else {
        endTransaction();
        window.alert("Please connect your wallet to BSC");
      }
    }
    return {
      approvePV,
    };
  }
  