import ApePair from "../contexts/ApePair.json";


 export default async function getPriceData(state) {
      try {
        const coinPair = new state.web3.eth.Contract(
            ApePair.abi,
            "0xB15f34082Baa4E3515A49E05D4d1D40cE933da0b"
          );

          const bnbPair = new state.web3.eth.Contract(
            ApePair.abi,
            "0x51e6D27FA57373d8d4C256231241053a70Cb1d93"
          );
          window.alert("apes loaded loaded")

         // price calculation

          const reservesBNB = await bnbPair.methods.getReserves().call();
            window.alert("get BNB reserves")
          const bnbPrice = reservesBNB[1] / reservesBNB[0];
            window.alert("clalc BNB price done")
          const reservesToken = await coinPair.methods.getReserves().call();
            window.alert("calc token reserve done")
          const coinPrice = reservesToken[1] / reservesToken[0];
            window.alert("calc coin price done")
          const usdPrice = 1
            console.log("coin price loaded: " + usdPrice)
        return usdPrice
      } catch (e) {
        console.log(e)
      }
      //await loadBlockchainData();
    }

  