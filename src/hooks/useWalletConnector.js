import { useEffect } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { isMobile } from 'mobile-device-detect';

export default function useWalletConnector({
    state,
    setState,
   
}) {


    //metamask connector

    async function metaMask(e) {
        if (typeof window.ethereum !== "undefined" ) {



            const web3 = new Web3(window.ethereum);

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];



            setState((preState) => {
                return { ...preState, account: account };

            });



            setState((preState) => {
                return { ...preState, walletType: "mm" };
            });


            setState((preState) => {
                return { ...preState, web3: web3 };
            });



            localStorage.setItem("wallettype", JSON.stringify("mm"));

            window.ethereum.on("chainChanged", async function () {
                if (window.ethereum.isCoin98) {
                    //do nothing
                } else {
                    window.location.reload();
                }
            });
            window.ethereum.on("accountsChanged", async function () {
                if (window.ethereum.isCoin98) {
                    //do nothing
                } else {

                    window.location.reload();
                }
            });

        } else { }
    }

    async function ONTOWallet() {



        try {



            const web3 = isMobile ? new Web3(window.ethereum) : new Web3(window.onto);


            const account = await web3.eth.requestAccounts().then((acc) => {
                return acc[0]
            })

            setState((preState) => {
                return { ...preState, account: account };

            });




            setState((preState) => {
                return { ...preState, walletType: "on" };
            });


            setState((preState) => {
                return { ...preState, web3: web3 };
            });




            localStorage.setItem("wallettype", JSON.stringify("on"));

            // window.ethereum.on("chainChanged", async function() {
            //     if (window.ethereum.isCoin98) {
            //         //do nothing
            //     } else {
            //         window.location.reload();
            //     }
            // });
            // window.onto.on("accountsChanged", (e) => {
            //     console.log(e.accounts[0]);

            //   });

        }
        catch {

        }



    }

    
    async function dc(e) {
        //disconnect wallet connect provider

        try {
            await state.provider.disconnect();
        } catch(e) {
            console.log(e)
        }
        setState((preState) => {
            return {
                ...preState,
                provider: "undefined",
            };
        });
    }

    async function disconnectWallet(e) {
        //used for disconnect wallet button

       

        setState((preState) => {
            return { ...preState, web3: "undefined" };
        });
        setState((preState) => {
            return { ...preState, account: "Not Connected" };
        });
        setState((preState) => {
            return { ...preState, balanceBNB: 0 };
        });

        setState((preState) => {
            return { ...preState, walletType: "undefined" };
        });


        await dc();

        localStorage.setItem("wallettype", JSON.stringify("undefined"));
        localStorage.removeItem("jwtToken")

        // setState((preState) => {
        //   return { ...preState, walletType: "undefined" };
        // });
        setState((preState) => {
            return {
                ...preState,
                isConnected: false,
                isBlockchainDataLoading: false,
            };
        });
    }



    async function walletConnector(e) {
        //used to connect for wallet connect
       
    
        const provider = new WalletConnectProvider({
       
            rpc: {
                56: "https://bsc-dataseed1.defibit.io/",
            }
        });
    
        try {
            await provider.enable();
          
            setState((preState) => {
                return { ...preState, provider: new WalletConnectProvider(provider) };
            });
            const web3 = new Web3(provider);
            setState((preState) => {
                return { ...preState, web3: new Web3(provider) };
            });
            const accounts = await web3.eth.getAccounts();

            setState((preState) => {
                return { ...preState, account: accounts[0] };
            });
            await setState((preState) => {
                return { ...preState, walletType: "wc" };
            });

            localStorage.setItem("wallettype", JSON.stringify("wc"));

           

            //await loadBlockchainData();
        } catch (e) {   disconnectWallet(); }
        // provider.on("disconnect", () => {

        //  disconnectWallet(); 
        // });
        // provider.on("accountsChanged", () => {
        //     window.location.reload();
        // });

        // provider.on("chainChanged", () => {
        //     //this doesn't appear to work on mobile with metamask
        //     disconnectWallet();
        //     window.location.reload();
        // });
    }


    return {
        walletConnector,
        metaMask,
        ONTOWallet,
        disconnectWallet,
        
    };
}

//  const { walletConnector } = useWalletConnector({
//    state,
//    metaMask,
//    setState,
//    disconnectWallet,
//  });